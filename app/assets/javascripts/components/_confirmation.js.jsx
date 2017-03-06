var Confirmation = React.createClass({
  render() {
    return ( 
      <div className={"confirmation-page"}> 
        <button className="btn btn-default" onClick={this.props.toggleConfirmationPage}>Back</button>
        <div className="confirmation-text">
          <p>Here's a quick breakdown of your payments for this summer.</p>
          <p>Total Cost: {monetize(this.props.totalOwed)}</p> 
          <p>If everything looks good, just click the green button!</p>
        </div>
        <div>
          <button className="btn btn-success confirmation-button" 
                  onClick={this.props.submitForm}>Submit Form!</button>
        </div>
      </div>
    )
  }
});