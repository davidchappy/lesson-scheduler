var AdminSettings = React.createClass({
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
				<AdminSetting key={settingName}
											settingName={settingName}
											name={name}
											rawValue={value}
											valueString={valueString}
											description={description}
											handleChangeSetting={this.props.handleUpdateSetting}
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