var CustomSetting = React.createClass({
  getInitialState() {
    return { submitDisabled: true, currentValue: this.props.rawValue };
  },

  handleChangeSetting(e) {
    var submitDisabled;
    if(e.target.value && e.target.value !== "") {
      submitDisabled = false;
    }
    this.setState({ submitDisabled: false, currentValue: e.target.value });
  },

  handleSaveSetting(e) {
    e.preventDefault();
    this.setState({ submitDisabled: true });
    this.props.editCustomSetting(this.props.setting.id, this.state.currentValue);
  },

  handleRemoveSetting(e) {
    e.preventDefault();
    this.props.removeSettingFromProfile(this.props.setting.id);
  },

  render() {
    return (
      <form data-save-for={this.props.settingName} className="admin-form-item" 
            id={this.props.settingName + "custom"} 
            onSubmit={this.handleSaveSetting} >
        <div className="setting">
          <label className="setting-name" htmlFor={this.props.settingName}>
            {this.props.htmlName}:&nbsp; 
              <span className="setting-value">
                {Helper.prettifySettingValue(this.props.rawValue, this.props.settingName)}
              </span>
          </label>
          <p className="setting-description">
            {this.props.description}
          </p>  
          <div>
            <input  type="text" defaultValue={this.props.rawValue} 
                    className="setting-input col-xs-7" 
                    onChange={this.handleChangeSetting}
                    name={this.props.settingName} id={this.props.settingName}/>
            <button className="btn btn-primary submit-admin-form col-xs-3"
                    disabled={this.state.submitDisabled} type="submit">
              Save
            </button>
            <button className="btn btn-danger submit-admin-form col-xs-2"
                    onClick={this.handleRemoveSetting} type="button">
              &times;
            </button>
          </div>  
        </div>    
    
      </form>
    )
  }
})