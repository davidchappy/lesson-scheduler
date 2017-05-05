var DiscountDetails = React.createClass({

  render() {
    var pricingData       = this.props.pricingData;
    var studentDiscount   = pricingData.possibleDiscounts.rate;
    var lessonsDiscount   = pricingData.possibleDiscounts.lessons;
    var studentBonus      = pricingData.possibleDiscounts.quantity;

    var maxDiscountClass  = " discount-possible-max";
    var discounts         = pricingData.currentDiscounts;
    var studentClasses    = discounts.rate === studentDiscount ? maxDiscountClass : "";
    var lessonClasses     = discounts.lessons === lessonsDiscount ? maxDiscountClass : "";
    var bonusClasses      = discounts.quantity === studentBonus ? maxDiscountClass : "";

    var thirtyMinRate       = Pricer.monetize(this.props.appSettings.thirtyMinRate.value);
    var thirtyMinRateTwo    = Pricer.monetize(this.props.appSettings.thirtyMinRateTwo.value);
    var thirtyMinRateThree  = Pricer.monetize(this.props.appSettings.thirtyMinRateThreePlus.value);

    var lessonsDiscountOne  = Pricer.monetize(this.props.appSettings.lessonsDiscountOne.value);
    var lessonsDiscountTwo  = Pricer.monetize(this.props.appSettings.lessonsDiscountTwo.value);

    var multipleStudentBonus = Pricer.monetize(this.props.appSettings.multipleStudentBonus.value);

    return(
      <div className='discount-details'>
        <div className='discount-header'>
          <h4>Here is a breakdown of your savings:</h4>
        </div>
        <div className={'discount-lesson-rate' + studentClasses}>
          <h5>Multiple Student Discount:&nbsp; 
              <span className="discount-current">{Pricer.monetize(discounts.rate)}</span>&nbsp;
              <span className="discount-possible">({Pricer.monetize(studentDiscount)}</span> possible)
          </h5>
          <p><em>Rate is {thirtyMinRate} for 1st student, {thirtyMinRateTwo} for 2nd, {thirtyMinRateThree} for 3 or more</em></p>
        </div>
        <div className={'discount-student-lessons' + lessonClasses}>
          <h5>Rate discount from number of lessons:&nbsp;
            <span className="discount-current">{Pricer.monetize(discounts.lessons)}</span>&nbsp;
          <span className="discount-possible">({Pricer.monetize(lessonsDiscount)}</span> possible)
        </h5>
          <p><em>{lessonsDiscountOne} off for 9-10 lessons; {lessonsDiscountTwo} off for 11 or more</em></p>
        </div>
        <div className={'discount-quantity' + bonusClasses}>
          <h5>Multiple Student Bonus:&nbsp;
            <span className="discount-current">{Pricer.monetize(discounts.quantity)}</span>&nbsp; 
            <span className="discount-possible">({Pricer.monetize(studentBonus)}</span> possible)
          </h5>
          <p><em>Additional {multipleStudentBonus} off for each student (if more than one) with at least 9 lessons</em></p>
        </div>
      </div>
    )
  }
  
})