var AdminPortal = React.createClass({
	getInitialState() {
		return {
			appSettings: undefined,
		}
	},

	componentDidMount() {
		$.ajax({
      url: '/api/v1/admin_portal.json', 
      type: 'GET',
      success: (response) => {
        // console.log("App Settings in app component", response.app_settings);
        this.setState({ appSettings: response.app_settings });
      }
    });
	},

	handleSaveSettings(e) {
		e.preventDefault();
		console.log("Event in handleSaveSettings", e);
		console.log("Settings form ref", this.refs);
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
				<AdminBody 	{...this.state}
										handleSaveSettings={this.handleSaveSettings} />
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