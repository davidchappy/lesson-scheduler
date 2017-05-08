var ActiveCodes = React.createClass({
  
  render() {
    var activeCodes = this.props.family.setting_profiles.map((profile) => {
      var expiration = Helper.formatDate(new Date(profile.expiration));

      return (<li key={profile.id}>
                <p>{profile.name} (Expires: {expiration})</p>
              </li>)
    });

    return (
      <div className="family-settings-list row">        
        {
          this.props.family.setting_profiles.length
            ? <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h5>Active Codes</h5>
                <ul>
                  {activeCodes}
                </ul>
              </div>
            : null
        }
      </div>    
    )
  }
  
});