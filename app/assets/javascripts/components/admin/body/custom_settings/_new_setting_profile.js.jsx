var NewSettingProfile = React.createClass({

  getInitialState() {
    return ({ name: undefined, code: undefined, expiration: undefined })
  },

  handleSubmitProfile(e) {
    e.preventDefault();
    this.props.toggleCreating();
    this.props.createCustomProfile( this.state.name, 
                                    this.state.code, 
                                    this.state.expiration);
  },

  handleUpdateName(e) {
    e.preventDefault();
    this.setState({ name: e.target.value });
  },

  handleUpdateCode(e) {
    e.preventDefault();
    this.setState({ code: e.target.value });
  },

  handleUpdateExpiration(e) {
    e.preventDefault();
    this.setState({ expiration: e.target.value });
  },

  render() {
    return (
      <form onSubmit={this.handleSubmitProfile} className="settings-profile-create-setting"> 
        <div className="form-group">
          <input  type="text" className="form-control" 
                  id="new-profile-name" placeholder="Name (ex: Missionary Discount)"
                  onChange={this.handleUpdateName}></input>
        </div>
        <div className="form-group">
          <input  type="text" className="form-control" 
                  id="new-profile-code" placeholder="Code (ex: missionariesdms)"
                  onChange={this.handleUpdateCode}></input>
        </div>
        <div className="form-group">
          <input  type="text" className="form-control" 
                  id="new-profile-expiration" placeholder="Expiration (ex: 2017-12-31)"
                  onChange={this.handleUpdateExpiration}></input>
        </div>
        <button type="submit" className="btn btn-large btn-primary">Create</button>
        <button type="button" onClick={this.props.toggleCreating}
                className="btn btn-large btn-default setting-profile-cancel">Cancel</button>
      </form>
    )
  }

})