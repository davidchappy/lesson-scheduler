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

  handleSubmit(e) {
    e.preventDefault();  
    var id = this.props.id;
    $("#"+id)[0].reset();  
    this.setState({ submitDisabled: true });
    this.props.handleSubmit(this.state.currentValue);
  },

  render() {
    return(
      <form onSubmit={this.handleSubmit} id={this.props.id}>
        <input  type="text" 
                className={this.props.inputClass}
                onChange={this.handleChangeInput} 
                placeholder={this.props.placeholderText} />
        <button className={"btn btn-primary " + this.props.btnClass} 
                disabled={this.state.submitDisabled}>{this.props.btnText}</button>
      </form>
    )
  }

});