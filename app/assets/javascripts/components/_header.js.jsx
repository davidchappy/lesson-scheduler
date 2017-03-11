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
    var pricing = Helper.calculatePricing(lessonPeriods, this.props.allWeeks);
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
    var lessonCount = Helper.getTotalLessonCount(this.props.lessonPeriods);
    var total = Helper.monetize(this.state.totalOwed);
    var payment = Helper.monetize(this.state.totalOwed / 3);
    var totalDiscount = Helper.monetize(this.state.totalDiscount);
    var possibleDiscount = Helper.monetize(this.state.possibleDiscount);
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
            <Dashboard  {...this.state} 
                        lessonCount={lessonCount}
                        total={this.state.totalOwed}
                        payment={payment}
                        totalDiscount={totalDiscount}
                        possibleDiscount={possibleDiscount}
                        maxDiscountClass={maxDiscountClass}  />
          }
        </div>
      </div>
    )
  }
});