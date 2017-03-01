var Header = React.createClass({
  // getInitialState() {
  //   return { totalDiscount: 0, totalOwed: 0, possibleDiscount: 0 }
  // },
  // componentWillReceiveProps(nextProps) {
  //   console.log("Header mounted");
  //   this.calculateTotalCost(this.props); 
  // },
  render() {
    if ( !this.props.family ) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }

    var family = this.props.family;
    var lessonCount = this.props.lessonCount;
    var total = this.props.monetize(this.props.totalOwed);
    var totalDiscount = this.props.monetize(this.props.totalDiscount);
    var possibleDiscount = this.props.monetize(this.props.possibleDiscount);
    var maxDiscountClass = totalDiscount == possibleDiscount ? "max-discount" : "";

    return (
      <div className="navbar navbar-inverse navbar-fixed-top header">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">The {family.last_name} Family</a>
            {this.props.alreadySubmitted ? null :
              <button className="btn add-lesson-period" onClick={this.props.toggleNewLessonPeriod}>
                <span className="glyphicon glyphicon-plus"></span>
              </button>
            }
          </div>
          {this.props.alreadySubmitted ? 
            <div id="navbar" className="navbar-collapse collapse"></div> :
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li role="separator" className="divider"></li>
                <li className="total-lessons"><a>
                  <span className="header-small">Lessons:</span> 
                  <span className="header-large">{lessonCount}</span>
                </a></li>
                <li role="separator" className="divider"></li>
                <li id="possibleDiscount" className={"possible-discount"}><a>
                  <span className="header-small">Possible Discount:</span> 
                  <span className={"header-large " + maxDiscountClass}>{possibleDiscount}</span>
                </a></li>                
                <li role="separator" className="divider"></li>
                <li id="currentDiscount" className="current-discount"><a>
                  <span className="header-small">Current Discount:</span> 
                  <span className="header-large">{totalDiscount}</span>
                </a></li>              
                <li role="separator" className="divider"></li>
                <li id="totalOwed" className="total-owed"><a>
                  <span className="header-small">Total:</span>
                  <span className="header-large">{total}</span>
                </a></li>
              </ul>
            </div>
          }
        </div>
      </div>
    )
  }
});