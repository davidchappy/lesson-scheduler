var PaymentPlan = React.createClass({

  render() {
    var payments  = this.props.pricingData.payments;
    var total     = this.props.pricingData.currentPricing.totalOwed;

    return (
      <div className='full-payment-info'>
        <h3>Payment Plan</h3>
        <ul>
          <li>Due June 1st: <span>{Pricer.monetize(payments[0])}</span></li>
          <li>Due July 1st: <span>{Pricer.monetize(payments[1])}</span></li>
          <li>Due August 1st: <span>{Pricer.monetize(payments[2])}</span></li>
        </ul>
        <h4>Total: <span>{Pricer.monetize(total)}</span></h4>
      </div>
    )
  } 
  
});