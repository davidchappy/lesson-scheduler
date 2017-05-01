var SelectForm = React.createClass({
  // getInitialState() { 
  //   return {
  //     submitDisabled: true, currentValue: undefined
  //   }
  // },

  componentDidMount() {
    $("." + this.props.selectClass).focus();
  },

  // handleChangeSelect(e) {
  //   var submitDisabled;
  //   if(e.target.value && e.target.value !== "") {
  //     submitDisabled = false;
  //   }
  //   this.setState({ submitDisabled: false, currentValue: e.target.value });
  // },

  handleSubmit(e) {
    e.preventDefault();
    // this.setState({ submitDisabled: true });
    // this.setState({ submitDisabled: false, currentValue: e.target.value });
    this.props.submitAction(e.target.value);
  },

  render() {
    var options = this.props.selectOptions.map((option) => {
      return (
        <option key={option.id} value={option.id}>{option[this.props.displayValue]}</option>
      );
    })

    // <button className={"btn btn-primary " + this.props.btnClass} 
    //         disabled={this.state.submitDisabled}>{this.props.btnText}</button>

    return(
      <form onSubmit={this.handleSubmit} id={this.props.id} >
        <select className={this.props.selectClass} 
                id={this.props.selectId}                
                onChange={this.handleSubmit}
                tabIndex="0" onBlur={this.props.toggleEdit} >
          <option value='' className="placeholder">{this.props.placeholderText}</option>
          {options}      
        </select>
      </form>   
    )
  }

});