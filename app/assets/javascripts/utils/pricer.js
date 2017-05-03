var Pricer = {
  getPricingData: function(lessonPeriods, allWeeks, baseLessonLength, thirtyMinRate) {
    var currentPricing    = this.getPricing(lessonPeriods, allWeeks, baseLessonLength, thirtyMinRate);
    var possibleDiscounts = this.getPossibleDiscounts(lessonPeriods, allWeeks, baseLessonLength);
    var currentDiscounts  = this.getCurrentDiscounts(lessonPeriods, allWeeks, baseLessonLength);
    var payments          = this.getPayments(currentPricing.totalOwed);

    return {
      currentPricing: currentPricing,
      possibleDiscounts: possibleDiscounts,
      currentDiscounts: currentDiscounts,
      payments: payments
    }
  },
  getPayments: function(totalOwed) {
    var paymentOne = Math.ceil((totalOwed / 3).toFixed(2));
    var paymentTwo = Math.round((totalOwed / 3).toFixed(2));
    var paymentThree = Math.round((totalOwed / 3).toFixed(2));
    return [paymentOne, paymentTwo, paymentThree];
  },
  getPricing: function(lessonPeriods, allWeeks, baseLessonLength, thirtyMinRate) {
  // calculate form cost and discounts from lesson and lesson period counts

    // get lesson count adjusted for lessons longer than base lesson length (30 mins)
    var adjustedLessonCount = Helper.getTotalLessonMinutes(allWeeks) / baseLessonLength;

    // total cost without discounts                        
    var rawTotalOwed = adjustedLessonCount * thirtyMinRate;

    // get possible discount
    var lessonPeriodCount = lessonPeriods.length;
    var possibleDiscount =  lessonPeriodCount > 0 ? 
                            Pricer.calculatePossibleDiscount(lessonPeriods, allWeeks, baseLessonLength) : 0;
    
    // get discount
    var discountObject = Pricer.getCurrentDiscounts(lessonPeriods, allWeeks, baseLessonLength);
    var discount = Helper.sumObject(discountObject);
    if(discount > possibleDiscount) {
      discount = possibleDiscount;
    }

    // total cost is raw total minus discounts
    var totalOwed = rawTotalOwed - discount;
  
    return { discount: discount, totalOwed: totalOwed, possibleDiscount: possibleDiscount}
  },
  calculatePossibleDiscount: function(lessonPeriods, allWeeks, baseLessonLength) {
    // utility to calculate possible discount from the number of lesson periods
    var allDiscounts = Pricer.getPossibleDiscounts(lessonPeriods, allWeeks, baseLessonLength);

    var total = allDiscounts.multipleStudentDiscount 
              + allDiscounts.manyLessonsDiscount 
              + allDiscounts.multipleStudentBonus;

    return total;

  },
  getPossibleDiscounts: function(lessonPeriods, allWeeks, baseLessonLength) {
    var possibleDiscounts = {
      manyLessonsDiscount: 0,
      multipleStudentDiscount: 0,
      multipleStudentBonus: 0
    };
    var lessonPeriodCount = lessonPeriods.length;

    // possible many lessons discount
    possibleDiscounts.manyLessonsDiscount = (3000 * lessonPeriodCount);

    // possible bonus quantity discount
    if(lessonPeriodCount > 0) {
      for(var i=0; i<lessonPeriods.length; i++) {
        if(i > 0 && lessonPeriods[i].lesson_count > 9) {
          possibleDiscounts.multipleStudentBonus += 500;
        }
      }
    }

    // possible multiple student rate discount
    for(var i=0; i<lessonPeriods.length; i++) {
      var lessonPeriod = lessonPeriods[i];
      var weeks = allWeeks[lessonPeriod.id];
      var adjustedLessonCount = (13 * lessonPeriod.default_lesson_length) / baseLessonLength;
      if(i === 1) { 
        possibleDiscounts.multipleStudentDiscount += (200 * adjustedLessonCount); 
      } 
      if(i >= 2) { 
        possibleDiscounts.multipleStudentDiscount += (400 * adjustedLessonCount); 
      } 
    }

    return possibleDiscounts;

  },
  getCurrentDiscounts: function(lessonPeriods, allWeeks, baseLessonLength) {
    var discounts = {
      rate: 0,
      quantity: 0,
      lessons: 0
    };
    for(var i=0; i<lessonPeriods.length; i++) {
      var lessonPeriod = lessonPeriods[i];
      var weeks = allWeeks[lessonPeriod.id];
      var adjustedLessonCount = Helper.getLessonMinutesFromWeeks(weeks) / baseLessonLength;

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