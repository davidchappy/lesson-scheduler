var Header = React.createClass({
  render() {
    if ( !this.props.family || !this.props.appSettings || !this.props.lessonPeriods || !this.props.allWeeks) {
      return (<Loading message="Header"/>)
    }

    var pricing = Pricer.calculatePricing(this.props.lessonPeriods, 
                                          this.props.allWeeks,
                                          this.props.appSettings.baseLessonLength.value,
                                          this.props.appSettings.thirtyMinRate.value);
    var family = this.props.family;
    var lessonCount = Helper.getTotalLessonCount(this.props.lessonPeriods);
    var total = Pricer.monetize(pricing.totalOwed);
    var payment = Pricer.monetize(pricing.totalOwed / 3);
    var totalDiscount = Pricer.monetize(pricing.discount);
    var possibleDiscount = Pricer.monetize(pricing.possibleDiscount);
    var maxDiscountClass = totalDiscount == possibleDiscount ? "max-discount" : "";
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
            { this.props.admin 
                ? <ReturnToAdmin /> 
                : this.props.hasSubmitted ? null :
                    <button className="btn add-lesson-period" onClick={this.props.toggleCreating}>
                      <span className="glyphicon glyphicon-plus"></span>
                    </button>
            }
          </div>
          {
            this.props.form.submitted && new Date() > new Date(this.props.appSettings["submissionDeadline"].value)
            ? <div id="navbar" className="navbar-collapse collapse"></div> 
            : <Dashboard  {...this.props}
                          lessonCount={lessonCount}
                          total={total}
                          payment={payment}
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