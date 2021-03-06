var CodeForm = React.createClass({

  getInitialState() {
    return({ code: undefined, invalidCode: false })
  },

  handleUpdateCode(e) {
    e.preventDefault();
    this.setState({ code: e.target.value, invalidCode: false });
  },

  handleSubmitCode(e) {
    e.preventDefault();
    if(!Helper.isValidCode(this.state.code, this.props.settingProfiles)) {
      this.setState({ invalidCode: true });
    } else {
      this.props.addSettingsCode(this.state.code);
      this.setState({ code: undefined });
    }
  },

  render() {

    var invalidCodeClasses = this.state.invalidCode 
      ? "invalid-code"
      : "invalid-code hidden";

    return (
      <div className="insert-settings-code row">
        <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h4 dangerouslySetInnerHTML={{__html: this.props.contentEntries["codesTitle"].value}}></h4>
          <p dangerouslySetInnerHTML={{__html: this.props.contentEntries["codesBody"].value}}></p>
          <InvalidCode classes={invalidCodeClasses}/>
          <form onSubmit={this.handleSubmitCode} id="addSettingsCode">
            <input  type="text" 
                    onChange={this.handleUpdateCode}
                    placeholder="Insert Special Code" />
          </form>
        </div>
      </div>
    )
  }

});