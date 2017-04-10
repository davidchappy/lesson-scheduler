var AdminSettings = React.createClass({
	getInitialState() {
		return {
			submitDisabled: true
		}
	},

	enableSubmit() {
		this.setState( {submitDisabled: false} );
	},

	render() {
		var settingsObject = this.props.appSettings;
		var settingNames = Object.keys(settingsObject);
		var settings = settingNames.map((settingName) => {
			var name = settingsObject[settingName].name;
			var value = settingsObject[settingName].value;
			var valueString = value;
			var description = settingsObject[settingName].description;

			if (settingName === 'thirtyMinRate') {
				valueString = Pricer.monetize(Number(value));
				value = Number(value) / 100;
			}

			if (settingName === 'baseLessonLength') {
				valueString = valueString + " minutes";
			}

			return (
				<AdminSetting settingName={settingName}
											name={name}
											value={value}
											valueString={valueString}
											description={description}
											enableSubmit={this.enableSubmit} />
			)
		});

		return(
			<div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
				<h1>Edit App Settings</h1>
				<form ref="settings_form" className="admin-form" id="adminSettingsForm" onSubmit={this.props.handleSaveSettings} >
					{settings}
					<div className="actions col-xs-4 col-xs-offset-4">
						<button className="btn btn-primary submit-admin-form" id="submitAdminSettingsForm"
		        				disabled={ this.state.submitDisabled }>Save Settings</button>
					</div>				
        </form>
			</div>
		)
	}

});