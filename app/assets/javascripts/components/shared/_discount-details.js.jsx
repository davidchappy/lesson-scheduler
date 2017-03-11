var DiscountDetails = React.createClass({
  render() {
    var discounts = this.props.currentDiscounts;
    var studentCount = this.props.lessonPeriods.length;
    var totalLessonCount = this.props.lessonCount;

    return(
      <div className='discount-details'>
        <div className='discount-header'>
          <h4>Here is a breakdown your savings:</h4>
        </div>
        <div className='discount-lesson-rate'>
          <h5>30min lesson rate discount: {Pricer.monetize(discounts.rate)}</h5>
          <p><em>Rate is $20 for 1st student, $18 for 2nd, $16 for 3 or more</em></p>
        </div>
        <div className='discount-student-lessons'>
          <h5>Rate discount from number of students: {Pricer.monetize(discounts.lessons)}</h5>
          <p><em>$20 off for 9-10 lessons; $30 off for 11 or more</em></p>
        </div>
        <div className='discount-quantity'>
          <h5>Bonus discount from number of students: {Pricer.monetize(discounts.quantity)}</h5>
          <p><em>Additional $5 off for each student (if more than one) with at least 9 lessons</em></p>
        </div>
      </div>
    )
  }

})