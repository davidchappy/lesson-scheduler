var SimpleForm = React.createClass({
  getInitialState() { 
    return {
      submitDisabled: true, currentValue: undefined
    }
  },

  componentDidMount() {
    $("." + this.props.inputClass).focus();
  },

  handleChangeInput(e) {
    console.log(e.target.value);
    // var submitDisabled;
    // if(e.target.value && e.target.value !== "") {
    //   submitDisabled = false;
    // }
    this.setState({ submitDisabled: false, currentValue: e.target.value });
  },

  handleSubmit(e) {
    e.preventDefault();  
    var id = this.props.id;
    $("#"+id)[0].reset();  
    // this.setState({ submitDisabled: true });
    this.props.handleSubmit(this.state.currentValue);
  },

  render() {
    return(
      <form onSubmit={this.handleSubmit} id={this.props.id}>
        <input  tabIndex="0" onBlur={this.props.toggleEdit}
                type="text" 
                onChange={this.handleChangeInput}
                className={this.props.inputClass}
                placeholder={this.props.placeholderText} />
      </form>
    )
  }

});