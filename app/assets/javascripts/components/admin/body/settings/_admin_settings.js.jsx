var AdminSettings = React.createClass({
	render() {
		var settingsObject = this.props.appSettings;
		var settingNames = Object.keys(settingsObject);
		var settings = settingNames.map((settingName) => {
			var name = settingsObject[settingName].name;
			var value = settingsObject[settingName].value;
			var description = settingsObject[settingName].description;

			return (
				<AdminSetting key={settingName}
											settingName={settingName}
											htmlName={name}
											rawValue={value}
											description={description}
											handleSaveSetting={this.props.handleSaveSetting} />
			)
		});

		return(
			<div role="tabpanel" className="tab-pane active" id="settings">
				<div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
					<h1>Edit App Settings</h1>
					{settings}
				</div>
			</div>
		)
	}

});