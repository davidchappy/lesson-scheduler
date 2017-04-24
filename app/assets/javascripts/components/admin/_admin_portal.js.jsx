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
      	var settings = response.app_settings;
      	var updatedSettings = Helper.clone(settings);
        this.setState({ appSettings: settings, updatedSettings: updatedSettings,
                        families: response.families, students: response.students,
                        instruments: response.instruments, teachers: response.teachers });
      }
    });
	},

	handleUpdateSetting(e) {
		var name = e.target.name;
		var val = e.target.value;
		var updatedSettings = this.state.updatedSettings;
		updatedSettings[name] = val;
		this.setState({ updatedSettings: updatedSettings });
		console.log("Updated Settings", this.state.updatedSettings);
	},

	saveAppSettings(e) {
		e.preventDefault();
		console.log("Data for", e.target);
		// this.setState({ appSettings: this.state.updatedSettings });
		// $.ajax({
  //     url: '/api/v1/app_settings.json', 
  //     type: 'POST',
  //     data: { app_settings: this.state.appSettings },
  //     success: (response) => {
  //       console.log("App Settings in saveAppSettings", response);
  //     }
  //   });
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
										handleSaveSetting={this.saveAppSetting}
										handleUpdateSetting={this.handleUpdateSetting} />
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