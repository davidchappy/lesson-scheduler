var Confirmation = React.createClass({
  getInitialState() {
    return { totalDiscount: 0, totalOwed: 0, possibleDiscount: 0 }
  },
  componentDidMount() {
    this.updatePricing(this.props.lessonCount, this.props.lessonPeriods);
  },
  updatePricing(count, lessonPeriods) {
    var pricing = calculatePricing(count, lessonPeriods);
    this.setState({
      totalDiscount: pricing.discount,
      totalOwed: pricing.totalOwed,
      possibleDiscount: pricing.possibleDiscount
    })  
  },
  render() {
    return ( 
      <div className={"confirmation-page"}> 
        <button className="btn btn-default" onClick={this.props.handleToggleConfirming}>Back</button>
        <div className="confirmation-text">
          <p>Here's a quick breakdown of your payments for this summer.</p>
          <p>Total Cost: {monetize(this.state.totalOwed)}</p> 
          <p>If everything looks good, just click the green button!</p>
        </div>
        <div>
          <button className="btn btn-success confirmation-button" 
                  onClick={this.props.handleSubmitForm}>Submit Form!</button>
        </div>
      </div>
    )
  }
});