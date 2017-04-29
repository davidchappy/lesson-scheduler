var SelectForm = React.createClass({
  getInitialState() { 
    return {
      submitDisabled: true, currentValue: undefined
    }
  },

  handleChangeSelect(e) {
    var submitDisabled;
    if(e.target.value && e.target.value !== "") {
      submitDisabled = false;
    }
    this.setState({ submitDisabled: false, currentValue: e.target.value });
  },

  handleSubmit(e) {
    console.log("State value: ", this.state.currentValue);
    e.preventDefault();
    this.setState({ submitDisabled: true });
    this.props.submitAction(this.state.currentValue);
  },

  render() {
    var options = this.props.selectOptions.map((option) => {
      return (
        <option key={option.id} value={option.id}>{option[this.props.displayValue]}</option>
      );
    })

    return(
      <form onSubmit={this.handleSubmit} id={this.props.id}>
        <select className={this.props.selectClass} 
                id={this.props.selectId}                
                onChange={this.handleChangeSelect}>
          <option value='' className="placeholder">{this.props.placeholderText}</option>
          {options}      
        </select>
        <button className={"btn btn-primary " + this.props.btnClass} 
                disabled={this.state.submitDisabled}>{this.props.btnText}</button>
      </form>   
    )
  }

});