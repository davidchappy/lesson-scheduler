var Pricer = {
  calculatePricing: function(lessonPeriods, allWeeks) {
  // calculate form cost and discounts from lesson and lesson period counts

    // get lesson count adjusted for lessons longer than base lesson length (30 mins)
    var adjustedLessonCount = Helper.getTotalLessonMinutes(allWeeks) / appSettings.baseLessonLength;

    // total cost without discounts                        
    var rawTotalOwed = adjustedLessonCount * appSettings.thirtyMinRate;

    // get possible discount
    var lessonPeriodCount = lessonPeriods.length;
    var possibleDiscount =  lessonPeriodCount > 0 ? 
                            this.calculatePossibleDiscount(lessonPeriods, allWeeks) : 0;
    
    // get discount
    var discountObject = this.calculateCurrentDiscounts(lessonPeriods, allWeeks);
    var discount = Helper.sumObject(discountObject);
    if(discount > possibleDiscount) {
      discount = possibleDiscount;
    }

    // total cost is raw total minus discounts
    var totalOwed = rawTotalOwed - discount;
  
    return { discount: discount, totalOwed: totalOwed, possibleDiscount: possibleDiscount}
  },
  calculatePossibleDiscount: function(lessonPeriods, allWeeks) {
  // utility to calculate possible discount from the number of lesson periods
    var lessonPeriodCount = lessonPeriods.length;

    // possible lessons discount
    var possibleDiscount = (3000 * lessonPeriodCount);

    // possible bonus quantity discount
    if(lessonPeriodCount > 0) {
      for(var i=0; i<lessonPeriods.length; i++) {
        if(i > 0 && lessonPeriods[i].lesson_count > 9) {
          possibleDiscount += 500;
        }
      }
    }

    // possible rate discount
    for(var i=0; i<lessonPeriods.length; i++) {
      var lessonPeriod = lessonPeriods[i];
      var weeks = allWeeks[lessonPeriod.id];
      var adjustedLessonCount = (13 * lessonPeriod.default_lesson_length) / appSettings.baseLessonLength;
      if(i === 1) { 
        possibleDiscount += 200 * adjustedLessonCount; 
      } 
      if(i >= 2) { 
        possibleDiscount += 400 * adjustedLessonCount; 
      } 
    }
    return possibleDiscount;
  },
  calculateCurrentDiscounts: function(lessonPeriods, allWeeks) {
    var discounts = {
      rate: 0,
      quantity: 0,
      lessons: 0
    };
    for(var i=0; i<lessonPeriods.length; i++) {
      var lessonPeriod = lessonPeriods[i];
      var weeks = allWeeks[lessonPeriod.id];
      var adjustedLessonCount = Helper.getLessonMinutesFromWeeks(weeks) / appSettings.baseLessonLength;

      discounts.lessons += Pricer._lessonsDiscount(adjustedLessonCount);
      discounts.rate += Pricer._rateDiscount(adjustedLessonCount, i);
      discounts.quantity += Pricer._quantityDiscount(adjustedLessonCount, i);
    }
    return discounts;
  },
  _lessonsDiscount: function(lessonCount) {
    if(lessonCount >= 9 && lessonCount <= 10) {
      return 2000;
    } else if(lessonCount >= 11) {
      return 3000;
    } else {
      return 0;
    }
  },
  _rateDiscount: function(lessonCount, i) {
    if(i === 1) {
      return 200 * lessonCount;
    } else if (i >= 2) {
     return 400 * lessonCount;
    } else {
      return 0;
    }
  },
  _quantityDiscount: function(lessonCount, i) {
    if(i > 0 && lessonCount > 9) {
      return 500;
    } else {
      return 0;
    }
  },
  monetize: function(amount) {
    var roundedAmount = this.round(amount, 0);
  // currency formatting 
    return ("$" + (roundedAmount/100));
  },
  deMonetize: function(amountString) {
    return Number(amountString.replace('$', '')) * 100;
  },
  round: function(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  },
}