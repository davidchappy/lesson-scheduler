var AdminSettings = React.createClass({

	render() {
		var settingsObject = this.props.appSettings;
		var settingNames = Object.keys(settingsObject);
		var settings = settingNames.map((settingName) => {
			var name = settingsObject[settingName].name;
			var value = settingsObject[settingName].value;
			var valueString = value;
			// console.log("Value from adminSettings: ", value);
			// console.log("Value String from adminSettings: ", valueString);
			var description = settingsObject[settingName].description;

			if (settingName === 'thirtyMinRate') {
				valueString = Pricer.monetize(Number(value));
				value = Number(value) / 100;
			}

			return (
				<div className="row setting" key={name}>
					<span className="setting-name col-xs-3">{name}: </span>
					<span className="setting-value col-xs-4">{valueString}</span>
					<input type="text" defaultValue={value} className="setting-input col-xs-4"/>
				</div>
			)
		});

		return(
			<div>
				<div className="row admin-subheader">
					<span className="admin-subheader-name col-xs-3">Setting Name</span>
					<span className="admin-subheader-value col-xs-4">Current Value</span>
					<span className="admin-subheader-input col-xs-4">New Value</span>
				</div>
				{settings}

			</div>
		)
	}

});