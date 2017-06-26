var AdminPortal = React.createClass({
	
  getInitialState() {
		return {
			appSettings: undefined,
      families: undefined,
      students: undefined,
      instruments: undefined,
      teachers: undefined,
      summer_weeks: undefined
		}
	},

	componentDidMount() {
    $(document).ajaxStart(function() {
      $("#loading-overlay").show();
    });
    $(document).ajaxStop(function() {
      $("#loading-overlay").hide();
    });

		this.fetchAdminData();
	},

  fetchAdminData() {
    $.ajax({
      url: '/api/v1/admin_portal.json', 
      type: 'GET',
      success: (response) => {
        console.log("Admin Portal data: ", response);
        families = response.families;
        this.setState({ appSettings: response.app_settings, 
                        contentEntries: response.content_entries,
                        families: response.families, students: response.students, 
                        instruments: response.instruments, teachers: response.teachers, 
                        summer_weeks: response.summer_weeks,
                        customSettingProfiles: response.setting_profiles });
      }
    });
  },

	saveAppSetting(settingName, value) {
    var settings = this.state.appSettings;
    var id = settings[settingName].id;
    settings[settingName].value = value;
		this.setState({ appSettings: settings });

  	$.ajax({
      url: `/api/v1/app_settings/${id}.json`, 
      type: 'PUT',
      data: { app_settings: { value: value } },
      success: (response) => {
        console.log("App Settings in saveAppSettings", response);
      }
    });
	},

  saveContentEntry(entryName, value) {
    var entries = this.state.contentEntries;
    var id = entries[entryName].id;
    entries[entryName].value = value;
    this.setState({ contentEntries: entries });

    $.ajax({
      url: `/api/v1/content_entries/${id}.json`, 
      type: 'PUT',
      data: { content_entries: { value: value } },
      success: (response) => {
        console.log("Content Entries in saveContentEntry", response);
      }
    });
  },

  createNewInstrument(name) {
    $.ajax({
      url: '/api/v1/instruments.json', 
      type: 'POST',
      data: { instrument: { name: name } },
      success: (response) => {
        var instruments = this.state.instruments;
        instruments.push(response);
        this.setState({ instruments: instruments });
      }
    });
  },

  updateInstrument(instrumentId, name) {
    $.ajax({
      url: `/api/v1/instruments/${instrumentId}.json`, 
      type: 'PUT',
      data: { instrument: { name: name } },
      success: (response) => {
        var instruments = this.state.instruments;
        var instrument = Helper.findInArrayById(instrumentId, instruments);
        var index = instruments.indexOf(instrument);

        instrument.name = name;
        instruments[index] = instrument;
        this.setState({ instruments: instruments });
      }
    });
  },

  deleteInstrument(instrumentId) {
    $.ajax({
      url: `/api/v1/instruments/${instrumentId}.json`, 
      type: 'DELETE',
      success: (instruments) => {
        this.setState({ instruments: instruments })
      }
    });
  },

  createTeacher(submittedName) {
    var names = Helper.processTeacherName(submittedName);

    $.ajax({
      url: '/api/v1/teachers.json', 
      type: 'POST',
      data: { teacher: { first_name: names[0], last_name: names[1] } },
      success: (response) => {
        var teachers = this.state.teachers;
        teachers.push(response);
        this.setState({ teachers: teachers });
      }
    });
  },

  updateTeacher(teacherData) {
    console.log("Teacher data: ", teacherData);
    $.ajax({
      url: `/api/v1/teachers/${teacherData.id}.json`, 
      type: 'PUT',
      data: { teacher: 
              { 
                first_name: teacherData.first_name, 
                last_name: teacherData.last_name,
                instrument_id: teacherData.instrumentId || null,
                new_week_index: teacherData.weekToAddIndex || null,
                week_to_remove_id: teacherData.weekToRemoveId  || null} 
              },
      success: (response) => {
        var teachers = response;
        this.setState({ teachers: teachers });
      }
    });
  },

  addInstrumentToTeacher(instrumentId, teacher) {
    var teacherData = Helper.clone(teacher);
    teacherData.instrumentId = instrumentId;
    this.updateTeacher(teacherData);
  },

  removeInstrumentFromTeacher(instrumentId, teacher) {
    var teacherData = Helper.clone(teacher);
    teacherData.instrumentId = instrumentId;
    this.updateTeacher(teacherData);
  },
  
  addUnavailableToTeacher(weeksIndex, teacher) {
    var teacherData = Helper.clone(teacher);
    teacherData.weekToAddIndex = weeksIndex;
    this.updateTeacher(teacherData);
  },

  removeUnavailableFromTeacher(weekId, teacher) {
    var teacherData = Helper.clone(teacher);
    teacherData.weekToRemoveId = weekId;    
    this.updateTeacher(teacherData);
  },

  deleteTeacher(teacherId) {
    $.ajax({  
      url: `/api/v1/teachers/${teacherId}.json`, 
      type: 'DELETE',
      success: (teachers) => {
        this.setState({ teachers: teachers })
      }
    });
  },

  createCustomProfile(name, code, expiration) {
    $.ajax({  
      url: `/api/v1/setting_profiles`, 
      type: 'POST',
      data: { setting_profile: 
              {
                name: name,
                code: code,
                expiration: expiration,
              }
            },
      success: (profile) => {
        this.fetchAdminData();
      }
    });
  },

  updateCustomProfile(profile) {
    console.log("Settings Profile data: ", profile);
    $.ajax({
      url: `/api/v1/setting_profiles/${profile.id}.json`, 
      type: 'PUT',
      data: { setting_profile: 
              { 
                code: profile.code, 
                expiration: profile.expiration} 
              },
      success: (response) => {
        this.fetchAdminData();
      }
    });
  },

  saveProfileCode(profile, code) {
    var updatedProfile = Helper.clone(profile);
    updatedProfile.code = code;
    this.updateCustomProfile(updatedProfile);
  },

  saveProfileExpiration(profile, expiration) {
    var updatedProfile = Helper.clone(profile);
    updatedProfile.expiration = expiration;
    this.updateCustomProfile(updatedProfile);
  },

  deleteCustomProfile(profile) {
    $.ajax({  
      url: `/api/v1/setting_profiles/${profile.id}.json`, 
      type: 'DELETE',
      success: (response) => {
        this.fetchAdminData();
      }
    });
  },

  addSettingToProfile(settingId, profile) {
    console.log("Add setting with id: ", settingId);
    console.log("Add setting to profile: ", profile);
    $.ajax({
      url: `/api/v1/custom_settings.json`, 
      type: 'POST',
      data: { custom_setting: 
              { 
                setting_id: settingId, 
                profile_id: profile.id} 
              },
      success: (response) => {
        this.fetchAdminData();
      }
    });
  },

  removeSettingFromProfile(customSettingId) {
    $.ajax({
      url: `/api/v1/custom_settings/${customSettingId}.json`, 
      type: 'DELETE',
      success: (response) => {
        this.fetchAdminData();
      }
    });
  },

  editCustomSetting(customSettingId, value) {
    $.ajax({
      url: `/api/v1/custom_settings/${customSettingId}.json`, 
      type: 'PUT',
      data: { custom_setting: 
              { 
                value: value, 
              }
            },
      success: (response) => {
        this.fetchAdminData();
      }
    });
  },

  removeCodeFromFamily(id, family) {
    $.ajax({
      url: `/api/v1/families/${family.id}.json`, 
      type: 'PUT',
      data: { 
              family: {
                code_id: id
              } 
            },
      success: (response) => { 
        this.fetchAdminData();
      }
    });
  },

  deleteFamily(familyId) {
    $.ajax({
      url: `/api/v1/families/${familyId}.json`, 
      type: 'DELETE',
      success: (response) => { 
        this.fetchAdminData();
      }
    });
  },

  sortByAttribute(collection, attribute, direction, subset) {
    var unsorted = this.state[collection];
    var sorted = Helper.sortCollection(unsorted, attribute, direction, subset);
    this.setState( { collection: sorted } );
  },

	render() {
		if ( !this.state.appSettings || !this.state.families) {
      return ( <Loading message="Admin Portal.." /> )
    }

		return (
			<div>
				<AdminHeader />
				<AdminBody 	{...this.state}
										saveAppSetting={this.saveAppSetting}
                    saveContentEntry={this.saveContentEntry}
                    createNewInstrument={this.createNewInstrument}
                    updateInstrument={this.updateInstrument}
                    deleteInstrument={this.deleteInstrument}
                    createTeacher={this.createTeacher}
                    updateTeacher={this.updateTeacher}
                    deleteTeacher={this.deleteTeacher}
                    addInstrumentToTeacher={this.addInstrumentToTeacher}
                    removeInstrumentFromTeacher={this.removeInstrumentFromTeacher}
                    addUnavailableToTeacher={this.addUnavailableToTeacher}
                    removeUnavailableFromTeacher={this.removeUnavailableFromTeacher}
                    createCustomProfile={this.createCustomProfile}
                    saveProfileCode={this.saveProfileCode}
                    saveProfileExpiration={this.saveProfileExpiration}
                    deleteCustomProfile={this.deleteCustomProfile}
                    addSettingToProfile={this.addSettingToProfile}
                    removeSettingFromProfile={this.removeSettingFromProfile}
                    editCustomSetting={this.editCustomSetting}
                    removeCodeFromFamily={this.removeCodeFromFamily}
                    deleteFamily={this.deleteFamily}
                    sortByAttribute={this.sortByAttribute} />
        <Loading />
			</div>
		)
	}

});