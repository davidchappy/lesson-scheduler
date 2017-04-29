var AdminPortal = React.createClass({
	getInitialState() {
		return {
			appSettings: undefined,
			updatedSettings: undefined,
      families: undefined,
      students: undefined,
      instruments: undefined,
      teachers: undefined,
      summer_weeks: undefined
		}
	},

	componentDidMount() {
		$.ajax({
      url: '/api/v1/admin_portal.json', 
      type: 'GET',
      success: (response) => {
        console.log("Admin Portal data: ", response);
      	var settings = response.app_settings;
      	var updatedSettings = Helper.clone(settings);
        this.setState({ appSettings: settings, updatedSettings: updatedSettings,
                        families: response.families, students: response.students,
                        instruments: response.instruments, teachers: response.teachers,
                        summer_weeks: response.summer_weeks });
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
        var instrument = Helper.findElementInArrayById(instrumentId, instruments);
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

  updateTeacher(teacherId, firstName, lastName, addedInstrumentId, weekToAddIndex, weekToRemoveId) {
    $.ajax({
      url: `/api/v1/teachers/${teacherId}.json`, 
      type: 'PUT',
      data: { teacher: 
              { 
                first_name: firstName, 
                last_name: lastName,
                instrument_id: addedInstrumentId,
                new_week_index: weekToAddIndex,
                week_to_remove_id: weekToRemoveId } 
              },
      success: (response) => {
        var teachers = response;
        this.setState({ teachers: teachers });
      }
    });
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

  addInstrumentToTeacher(instrumentId, teacher) {
    this.updateTeacher(teacher.id, teacher.first_name, teacher.last_name, instrumentId);
  },

  removeInstrumentFromTeacher(instrumentId, teacher) {
    this.updateTeacher(teacher.id, teacher.first_name, teacher.last_name, instrumentId);
  },
  
  addUnavailableToTeacher(weeksIndex, teacher) {
    this.updateTeacher(teacher.id, teacher.first_name, teacher.last_name, null, weeksIndex);
  },

  removeUnavailableFromTeacher(weekId, teacher) {
    // find date by index, remove and update teacher
    this.updateTeacher(teacher.id, teacher.first_name, teacher.last_name, null, null, weekId);
  },

	render() {
		if ( !this.state.appSettings || !this.state.families) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }

		return (
			<div>
				<AdminHeader />
				<AdminBody 	{...this.state}
										saveAppSetting={this.saveAppSetting}
                    createNewInstrument={this.createNewInstrument}
                    updateInstrument={this.updateInstrument}
                    deleteInstrument={this.deleteInstrument}
                    createTeacher={this.createTeacher}
                    updateTeacher={this.updateTeacher}
                    deleteTeacher={this.deleteTeacher}
                    addInstrumentToTeacher={this.addInstrumentToTeacher}
                    removeInstrumentFromTeacher={this.removeInstrumentFromTeacher}
                    addUnavailableToTeacher={this.addUnavailableToTeacher}
                    removeUnavailableFromTeacher={this.removeUnavailableFromTeacher} />
			</div>
		)
		// Admin header
			// Name of admin?
			// Navigation (tabs): Settings, Content, Families, Dashboard, Teachers, Instruments, Account? 
		// Admin body
			// AdminSettings 
			// AdminContent
			// AdminFamilies
			// AdminTeachers
			// AdminInstruments
			// Admin Dashboard?
				// Total number of family accounts
				// Total number of forms submitted
				// Total number of students taking lessons
				// Total dollar amount from forms submitted
	}

});