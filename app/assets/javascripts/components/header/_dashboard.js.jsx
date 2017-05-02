var Dashboard = React.createClass({

  render() {
    return (
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li role="separator" className="divider"></li>
          <li className="total-lessons"><a>
            <span className="header-small">Lessons:</span> 
            <span className="header-large">{this.props.lessonCount}</span>
          </a></li>
          <li role="separator" className="divider"></li>
          <li id="possibleDiscount" className={"possible-discount"}>
            <a>
              <span className="header-small">Possible Discount:</span> 
              <span className={"header-large " + this.props.maxDiscountClass}>
                {this.props.possibleDiscount}
              </span>
            </a>
          </li>                
          <li role="separator" className="divider"></li>
          <li id="currentDiscount" className="current-discount">
            <a data-tip data-for='ttDiscountDetails'>
              <span className="header-small">Current Discount:</span> 
              <span className="header-large">{this.props.totalDiscount}</span>
            </a>
            <ReactTooltip id='ttDiscountDetails' type='dark' effect='solid'  
                          place='bottom' className="tt-discount-details">
              <DiscountDetails  {...this.props} />
            </ReactTooltip>           
          </li>   
          <li role="separator" className="divider"></li>
          <li id="totalOwed" className="total-owed">
            <a data-tip data-for='ttPaymentInfo'>
              <span className="header-small">Due June 1st:</span>
              <span className="header-large">{this.props.payment}</span>
            </a>
            <ReactTooltip id='ttPaymentInfo' type='dark' effect='solid' place='bottom'>
              <PaymentPlan {...this.props} />
            </ReactTooltip>
          </li>
          <li className="nav-help-icon">
            <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#welcomeMessage">
              ?
            </button>
          </li>
        </ul>
      </div>
    )
  }
  
});