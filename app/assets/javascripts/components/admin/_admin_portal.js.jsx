var AdminPortal = React.createClass({
	getInitialState() {
		return {
			appSettings: undefined,
			updatedSettings: undefined,
      families: undefined,
      students: undefined,
      instruments: undefined,
      teachers: undefined
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
                        instruments: response.instruments, teachers: response.teachers });
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
										saveAppSetting={this.saveAppSetting} />
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