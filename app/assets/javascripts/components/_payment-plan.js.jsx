var PaymentPlan = React.createClass({
  render() {
    var payment = Helper.monetize(this.props.total / 3);
    return (
      <div className='full-payment-info'>
        <h3>Payment Plan</h3>
        <ul>
          <li>Due June 1st: <span>{payment}</span></li>
          <li>Due July 1st: <span>{payment}</span></li>
          <li>Due August 1st: <span>{payment}</span></li>
        </ul>
        <h4>Total: <span>{Helper.monetize(this.props.total)}</span></h4>
      </div>
    )
  } 
});