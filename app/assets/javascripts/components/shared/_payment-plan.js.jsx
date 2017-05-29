var PaymentPlan = React.createClass({

  render() {
    var payments        = this.props.pricingData.payments;
    var total           = this.props.pricingData.currentPricing.totalOwed;
    var start_date      = this.props.appSettings.summerStartDate.value;
    var paymentDates    = Helper.getPaymentStrings(start_date);

    return (
      <div className='full-payment-info'>
        <h3 dangerouslySetInnerHTML={{__html: this.props.contentEntries["paymentPlanTitle"].value}}></h3>
        <ul>
          <li>Due {paymentDates[0]}: <span>{Pricer.monetize(payments[0])}</span></li>
          <li>Due {paymentDates[1]}: <span>{Pricer.monetize(payments[1])}</span></li>
          <li>Due {paymentDates[2]}: <span>{Pricer.monetize(payments[2])}</span></li>
        </ul>
        <h4>Total: <span>{Pricer.monetize(total)}</span></h4>
      </div>
    )
  } 
  
});