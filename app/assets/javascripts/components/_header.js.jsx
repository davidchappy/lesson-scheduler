var Header = React.createClass({
  getInitialState() {
    return { totalDiscount: 0, totalOwed: 0, possibleDiscount: 0 }
  },
  componentWillReceiveProps(nextProps) {
    this.updatePricing(nextProps.lessonPeriods);
  },
  componentDidMount() {
    this.updatePricing(this.props.lessonPeriods);
  },
  updatePricing(lessonPeriods) {
    var pricing = utils.calculatePricing(lessonPeriods, this.props.allWeeks);
    this.setState({
      totalDiscount: pricing.discount,
      totalOwed: pricing.totalOwed,
      possibleDiscount: pricing.possibleDiscount
    })  
  },
  render() {
    if ( !this.props.family ) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }

    var family = this.props.family;
    var lessonCount = utils.getTotalLessonCount(this.props.lessonPeriods);
    var total = utils.monetize(this.state.totalOwed);
    var payment = utils.monetize(this.state.totalOwed / 3);
    var totalDiscount = utils.monetize(this.state.totalDiscount);
    var possibleDiscount = utils.monetize(this.state.possibleDiscount);
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
            {this.props.hasSubmitted ? null :
              <button className="btn add-lesson-period" onClick={this.props.handleClickAddStudent}>
                <span className="glyphicon glyphicon-plus"></span>
              </button>
            }
          </div>
          {this.props.hasSubmitted ? 
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
                  <span className="header-small">Due June 1st:</span>
                  <span className="header-large">{payment}</span>
                </a></li>
              </ul>
            </div>
          }
        </div>
      </div>
    )
  }
});