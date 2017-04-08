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
    var settings = this.props.appSettings;
    var pricing = Pricer.calculatePricing(lessonPeriods, this.props.allWeeks,
                                          settings.baseLessonLength.value,
                                          settings.thirtyMinRate.value);
    this.setState({
      totalDiscount: pricing.discount,
      totalOwed: pricing.totalOwed,
      possibleDiscount: pricing.possibleDiscount
    })  
  },
  render() {
    if ( !this.props.family || !this.props.appSettings) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }

    var family = this.props.family;
    var lessonCount = Helper.getTotalLessonCount(this.props.lessonPeriods);
    var total = Pricer.monetize(this.state.totalOwed);
    var payment = Pricer.monetize(this.state.totalOwed / 3);
    var totalDiscount = Pricer.monetize(this.state.totalDiscount);
    var possibleDiscount = Pricer.monetize(this.state.possibleDiscount);
    var maxDiscountClass = totalDiscount == possibleDiscount ? "max-discount" : "";
    console.log("App settings in Header", this.props.appSettings);
    var discountObject = Pricer.calculateCurrentDiscounts(this.props.lessonPeriods, this.props.allWeeks,
                                                          this.props.appSettings.baseLessonLength.value);
    var possibleDiscountObject = Pricer.calculatePossibleDiscount(this.props.lessonPeriods, this.props.allWeeks,
                                                                  this.props.appSettings.baseLessonLength.value);

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
                        appSettings={this.props.appSettings}
                        lessonCount={lessonCount}
                        total={this.state.totalOwed}
                        payment={payment}
                        lessonPeriods={this.props.lessonPeriods}
                        totalDiscount={totalDiscount}
                        possibleDiscount={possibleDiscount}
                        maxDiscountClass={maxDiscountClass}  
                        currentDiscounts={discountObject}
                        possibleDiscounts={possibleDiscountObject} />
          }
        </div>
      </div>
    )
  }
});