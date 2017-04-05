var AdminPortal = React.createClass({
	getInitialState() {
		return {
			appSettings: undefined,
		}
	},

	componentDidMount() {
		// defaultSettings = global var in app/assets/javascripts/admin
		var settings = defaultSettings;

		$.ajax({
      url: '/api/v1/admin_portal.json', 
      type: 'GET',
      success: (response) => {
      	var custom_settings = response.app_settings;
      	console.log("Response: ", response);
      	for(var key in settings) {
      		if(custom_settings[key]) {
      			console.log("Key found: ", key);
      			settings[key] = custom_settings[key];
      			console.log("Altered Settings: ", settings);
      		}
      	}

        this.setState({ 
                        appSettings: settings,
                      });
      }
    });
	},

	render() {
		if ( !this.state.appSettings ) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }

		return (
			<div>
				<AdminBody {...this.state}/>
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