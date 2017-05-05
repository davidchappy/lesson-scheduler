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
          <p><em>Rate is $20 for 1st student, $18 for 2nd, $16 for 3 or more</em></p>
        </div>
        <div className={'discount-student-lessons' + lessonClasses}>
          <h5>Rate discount from number of lessons:&nbsp;
            <span className="discount-current">{Pricer.monetize(discounts.lessons)}</span>&nbsp;
          <span className="discount-possible">({Pricer.monetize(lessonsDiscount)}</span> possible)
        </h5>
          <p><em>$20 off for 9-10 lessons; $30 off for 11 or more</em></p>
        </div>
        <div className={'discount-quantity' + bonusClasses}>
          <h5>Multiple Student Bonus:&nbsp;
            <span className="discount-current">{Pricer.monetize(discounts.quantity)}</span>&nbsp; 
            <span className="discount-possible">({Pricer.monetize(studentBonus)}</span> possible)
          </h5>
          <p><em>Additional $5 off for each student (if more than one) with at least 9 lessons</em></p>
        </div>
      </div>
    )
  }
  
})