var PaymentPlan = React.createClass({
  render() {
    return (
      <div className='full-payment-info'>
        <h3>Payment Plan</h3>
        <ul>
          <li>Due June 1st: <span>{this.props.payment}</span></li>
          <li>Due July 1st: <span>{this.props.payment}</span></li>
          <li>Due August 1st: <span>{this.props.payment}</span></li>
        </ul>
        <h4>Total: <span>{this.props.total}</span></h4>
      </div>
    )
  } 
});