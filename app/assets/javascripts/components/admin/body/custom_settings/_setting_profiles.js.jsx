var SettingProfiles = React.createClass({

  getInitialState() {
    return ({ isCreating: false })
  },

  toggleCreating() {
    var creating = this.state.isCreating ? false : true;
    this.setState({ isCreating: creating });
  },

  render() {
    var settingProfiles = this.props.customSettingProfiles.map((profile) => {
      return (
        <SettingProfile key={profile.id}
                        profile={profile}
                        {...this.props} />
      );
    })

    return(
      <div role="tabpanel" className="tab-pane" id="customSettings">
        <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h1>Custom Setting Profiles</h1>
          {
            this.state.isCreating 
              ? <NewSettingProfile  {...this.props}
                                    toggleCreating={this.toggleCreating} />
              : <button className="btn btn-large btn-primary" 
                        onClick={this.toggleCreating} >Create a Profile</button>
          }
          {/* Add Custom Setting Profile button */}
          {settingProfiles}
        </div>
      </div>
    )
  }

});