var AdminContentEntry = React.createClass({
  getInitialState() {
    return { submitDisabled: true, currentValue: this.props.rawValue };
  },

  handleChangeEntry(e) {
    var submitDisabled;
    if(e.target.value && e.target.value !== "") {
      submitDisabled = false;
    }
    this.setState({ submitDisabled: false, currentValue: e.target.value });
  },

  handleSaveEntry(e) {
    e.preventDefault();
    this.setState({ submitDisabled: true });
    this.props.handleSaveEntry(this.props.entryName, this.state.currentValue);
  },

  render() {
    return (
      <form data-save-for={this.props.entryName} className="admin-form-item" 
            id={this.props.entryName + "Setting"} 
            onSubmit={this.handleSaveEntry} >
        <div className="row setting">
          <label className="setting-name" htmlFor={this.props.entryName}>
            {this.props.htmlName}
          </label>
          <p className="setting-description">
            {this.props.description}
          </p>  
          <div>
            <textarea type="text" 
                      className="setting-input col-xs-12" 
                      onChange={this.handleChangeEntry}
                      name={this.props.entryName} id={this.props.entryName}
                      rows="2" 
                      defaultValue={this.props.rawValue} />
            <button className="btn btn-primary submit-admin-form col-xs-6 col-xs-offset-3" id="submitAdminSettingsForm"
                    disabled={ this.state.submitDisabled } type="submit">
              Save
            </button>
          </div>  
        </div>    
      </form>
    )
  }
})