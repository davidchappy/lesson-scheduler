var SimpleForm = React.createClass({
  getInitialState() { 
    return {
      submitDisabled: true, currentValue: undefined
    }
  },

  handleChangeInput(e) {
    var submitDisabled;
    if(e.target.value && e.target.value !== "") {
      submitDisabled = false;
    }
    this.setState({ submitDisabled: false, currentValue: e.target.value });
  },

  handleNewInstrument(e) {
    e.preventDefault();
    this.props.handleNewInstrument(this.state.currentValue);
  },

  render() {
    return(
      <form onSubmit={this.handleNewInstrument}>
        <input  type="text" id="newInstrument"
                className="admin-new-item-input"
                onChange={this.handleChangeInput} 
                placeholder="New Instrument"/>
        <button className="btn btn-primary submit-form-button" 
                disabled={this.state.submitDisabled}>Add {this.props.formType}</button>
      </form>

   
    )
  }

});