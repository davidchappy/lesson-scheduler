var AdminSetting = React.createClass({
	getInitialState() {
		return { submitDisabled: true };
	},

	handleSaveSetting(e) {
		e.preventDefault();
		this.props.handleSaveSetting(e);
	},

	handleChangeSetting(e) {
		if(e.target.value && e.target.value !== "") {
			this.setState({ submitDisabled: false });
		}
		this.props.handleChangeSetting(e);
	},

	render() {
		return (
			<form data-save-for={this.props.settingName} className="admin-form-item" 
						id={this.props.settingName + "Setting"} 
						onSubmit={this.handleSaveSetting} >
				<div className="row setting">
					<label className="setting-name" htmlFor={this.props.settingName}>
						{this.props.name}: <span className="setting-value">{this.props.valueString}</span>
					</label>
					<p className="setting-description">
						{this.props.description}
					</p>	
					<div>
						<input type="text" defaultValue={this.props.rawValue} 
						className="setting-input col-xs-10" onChange={this.handleChangeSetting}
						name={this.props.settingName} id={this.props.settingName}/>
						<button className="btn btn-primary submit-admin-form col-xs-2" id="submitAdminSettingsForm"
		        				disabled={ this.state.submitDisabled } type="submit">
		        	Save
		        </button>
					</div>	
				</div>		
		
      </form>

		
		)
	}
})