var Dashboard = React.createClass({
  getInitialState() {
    return { pupHelp: false }
  },

  toggleHelpPup() {
    var helpActive = this.state.pupHelp ? false : true;
    this.setState({ pupHelp: helpActive });
  },

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
            <ReactTooltip id='ttDiscountDetails' type='dark' effect='solid' place='bottom'>
              <DiscountDetails  currentDiscounts={this.props.currentDiscounts} 
                                lessonPeriods={this.props.lessonPeriods}
                                lessonCount={this.props.lessonCount} />
            </ReactTooltip>           
          </li>   
          <li role="separator" className="divider"></li>
          <li id="totalOwed" className="total-owed">
            <a data-tip data-for='ttPaymentInfo'>
              <span className="header-small">Due June 1st:</span>
              <span className="header-large">{this.props.payment}</span>
            </a>
            <ReactTooltip id='ttPaymentInfo' type='dark' effect='solid' place='bottom'>
              <PaymentPlan total={this.props.total} />
            </ReactTooltip>
          </li>
          <li className="nav-help-icon">
            <a id="nav-help-icon" onClick={this.toggleHelpPup} >?</a>
          </li>
        </ul>
        {this.state.pupHelp ? (
          <HelpPopup />
          ) : (
          null 
          )
        }
      </div>
    )
  }
});