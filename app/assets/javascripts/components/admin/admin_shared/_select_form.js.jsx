var SelectForm = React.createClass({

  componentDidMount() {
    $("." + this.props.selectClass).focus();
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.submitAction(e.target.value);
  },

  render() {
    var options = this.props.selectOptions.map((option) => {
      return (
        <option key={option.id} value={option.id}>{option[this.props.displayValue]}</option>
      );
    })

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