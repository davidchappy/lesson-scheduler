var CustomSettingsSelect = React.createClass({

  componentDidMount() {
    $("." + this.props.selectClass).focus();
  },

  handleSubmit(e) {
    e.preventDefault();
    console.log("Adding ", e.target.value);
    this.props.submitAction(e.target.value, this.props.profile);
  },

  render() {
    var settingsObject = this.props.appSettings;
    var settingNames = Object.keys(settingsObject).filter((settingName) => {
      if(settingName === 'summerWeeks') {
        return false;
      }
      var customSettings = this.props.profile.custom_settings;
      if(customSettings.length) {
        for(setting of customSettings) {
          if(setting.key === settingsObject[settingName].key) {
            return false;
          }
        }
      }
      return true;
    });

    var settingOptions = settingNames.map((settingName) => {
      var id = settingsObject[settingName].id;
      var name = settingsObject[settingName].name;

      return (
        <option key={id} value={id}>{name}</option>
      );
    });
    
    return(
      <div className="settings-profile-select-container">
        <form onSubmit={this.handleSubmit} id={this.props.id} >
          <select className={this.props.selectClass} 
                  id={this.props.selectId}                
                  onChange={this.handleSubmit}
                  tabIndex="0" onBlur={this.props.toggleEdit} >
            <option value='' className="placeholder">{this.props.placeholderText}</option>
            {settingOptions}      
          </select>
        </form>   
      </div>
    )
  }

});