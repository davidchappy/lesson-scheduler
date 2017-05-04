var SettingProfile = React.createClass({

  getInitialState() {
    return ({ code: undefined, expiration: undefined, isAddingSetting: false })
  },

  handleSaveCode(e) {
    e.preventDefault();
    this.props.saveProfileCode(this.props.profile, this.state.code);
  },

  handleSaveExpiration(e) {
    e.preventDefault();
    this.props.saveProfileExpiration(this.props.profile, this.state.expiration);
  },

  handleUpdateCode(e) {
    this.setState({ code: e.target.value });
  },

  handleUpdateExpiration(e) {
    this.setState({ expiration: e.target.value });
  },

  handleDeleteProfile(e) {
    e.preventDefault();
    this.props.deleteCustomProfile(this.props.profile);
  },

  toggleAddingSetting(e) {
    e.preventDefault();
    var addingSetting = this.state.isAddingSetting ? false : true;
    this.setState({ isAddingSetting: addingSetting });
  },

  render() {
    var settings = this.props.profile.custom_settings.map((setting) => {
      return (
        <CustomSetting  key={String(setting.setting_profile_id) + "-" + String(setting.id)} 
                        setting={setting}
                        {...this.props}
                        settingName={setting.key}
                        htmlName={setting.name}
                        rawValue={setting.value}
                        description={setting.description} />
      );
    })

    return (
      <div className="row settings-profile">
        <h3>{this.props.profile.name} <a onClick={this.handleDeleteProfile}>(delete)</a></h3>
        <form   data-profile-id={this.props.profile.id} 
                className="admin-form-item settings-profile-form" 
                id={"profileCode" + "-" + this.props.profile.id} 
                onSubmit={this.handleSaveCode} >
          <label htmlFor={"code" + "-" + this.props.profile.id}>Code:&nbsp;</label>
          <input  type="text" id={"code" + "-" + this.props.profile.id}
                  defaultValue={this.props.profile.code} 
                  onChange={this.handleUpdateCode} />
        </form>
        <form   data-profile-id={this.props.profile.id} 
                className="admin-form-item settings-profile-form" 
                id={"profileExpiration" + "-" + this.props.profile.id} 
                onSubmit={this.handleSaveExpiration} >
          <label htmlFor={"expiration" + "-" + this.props.profile.id}>Expires:&nbsp;</label>
          <input  type="text" id={"expiration" + "-" + this.props.profile.id}
                  defaultValue={this.props.profile.expiration} 
                  onChange={this.handleUpdateExpiration} />
        </form>
        <CustomSettingsSelect {...this.props}
                              submitAction={this.props.addSettingToProfile}
                              toggleEdit={this.toggleAddingSetting}
                              selectOptions={this.props.appSettings}
                              displayValue="name"
                              selectClass="admin-select"
                              selectId="addCustomAppSetting"
                              id="selectAppSettings"
                              placeholderText="Add Settings" />
        {settings}
      </div>
    )
  }

});