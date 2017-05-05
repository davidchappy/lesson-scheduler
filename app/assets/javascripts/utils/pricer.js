var Pricer = {
  getPricingData: function(lessonPeriods, allWeeks, appSettings) {
    var possibleDiscounts     = this.getPossibleDiscounts(lessonPeriods, allWeeks, appSettings);
    var currentDiscounts      = this.getCurrentDiscounts(lessonPeriods, allWeeks, appSettings);
    var currentPricing        = this.getPricing(allWeeks, appSettings, currentDiscounts, possibleDiscounts);
    var payments              = this.getPayments(currentPricing.totalOwed);

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
  getPricing: function(allWeeks, appSettings, discounts, possibleDiscounts) {
  // calculate form cost and discounts from lesson and lesson period counts
    var baseLessonLength  = appSettings.baseLessonLength.value;
    var thirtyMinRate     = appSettings.thirtyMinRate.value;

    // get lesson count adjusted for lessons longer than base lesson length (30 mins)
    var adjustedLessonCount = Helper.getTotalLessonMinutes(allWeeks) / baseLessonLength;

    // total cost without discounts                        
    var rawTotalOwed = adjustedLessonCount * thirtyMinRate;
    
    // get discount
    var discount = Helper.sumObject(discounts);

    // get total possible discount
    var possibleDiscount = this.calculatePossibleDiscount(possibleDiscounts);

    // total cost is raw total minus discounts
    var totalOwed = rawTotalOwed - discount;
 
    // sanity check to ensure actual discount is never higher than possible discount 
    if(discount > possibleDiscount) {
      discount = possibleDiscount;
    }

    return { discount: discount, totalOwed: totalOwed, possibleDiscount: possibleDiscount }
  },
  calculatePossibleDiscount: function(possibleDiscounts) {
    var total = 0;
    total +=  possibleDiscounts.rate 
          +   possibleDiscounts.lessons 
          +   possibleDiscounts.quantity;

    return total;
  },
  getPossibleDiscounts: function(lessonPeriods, allWeeks, appSettings) {
    var baseLessonLength      = Number(appSettings.baseLessonLength.value);
    var multipleStudentBonus  = Number(appSettings.multipleStudentBonus.value);
    var lessonsDiscountTwo    = Number(appSettings.lessonsDiscountTwo.value);
    var thirtyMinRate         = Number(appSettings.thirtyMinRate.value);
    var thirtyMinRateTwo      = Number(appSettings.thirtyMinRateTwo.value);
    var thirtyMinRateThree    = Number(appSettings.thirtyMinRateThreePlus.value);

    var possibleDiscounts = {
      lessons: 0,
      rate: 0,
      quantity: 0
    };
    var lessonPeriodCount = lessonPeriods.length;

    // possible many lessons discount
    possibleDiscounts.lessons = lessonsDiscountTwo * lessonPeriodCount;

    // possible bonus quantity discount
    if(lessonPeriodCount > 0) {
      for(var i=0; i<lessonPeriods.length; i++) {
        if(i > 0 && lessonPeriods[i].lesson_count > 9) {
          possibleDiscounts.quantity += multipleStudentBonus;
        }
      }
    }

    // possible multiple student rate discount
    var twoStudentDiscount    = thirtyMinRate - thirtyMinRateTwo;
    var threeStudentDiscount  = thirtyMinRate - thirtyMinRateThree;
     
    for(var i=0; i<lessonPeriods.length; i++) {
      var lessonPeriod = lessonPeriods[i];
      var weeks = allWeeks[lessonPeriod.id];
      var adjustedLessonCount = (weeks.length * lessonPeriod.default_lesson_length) / baseLessonLength;
      if(i === 1) { 
        possibleDiscounts.rate += (twoStudentDiscount * adjustedLessonCount); 
      } 
      if(i >= 2) { 
        possibleDiscounts.rate += (threeStudentDiscount * adjustedLessonCount); 
      } 
    }

    return possibleDiscounts;

  },
  getCurrentDiscounts: function(lessonPeriods, allWeeks, appSettings) {
    var baseLessonLength      = Number(appSettings.baseLessonLength.value);
    var lessonsDiscountOne    = Number(appSettings.lessonsDiscountOne.value); 
    var lessonsDiscountTwo    = Number(appSettings.lessonsDiscountTwo.value);  
    var quantityBonus         = Number(appSettings.multipleStudentBonus.value);
    var thirtyMinRate         = Number(appSettings.thirtyMinRate.value);
    var thirtyMinRateTwo      = Number(appSettings.thirtyMinRateTwo.value);
    var thirtyMinRateThree    = Number(appSettings.thirtyMinRateThreePlus.value);
    var twoStudentDiscount    = thirtyMinRate - thirtyMinRateTwo;
    var threeStudentDiscount  = thirtyMinRate - thirtyMinRateThree;

    var discounts = {
      rate: 0,
      quantity: 0,
      lessons: 0
    };
    for(var i=0; i<lessonPeriods.length; i++) {
      var lessonPeriod        = lessonPeriods[i];
      var weeks               = allWeeks[lessonPeriod.id];
      var adjustedLessonCount = Helper.getLessonMinutesFromWeeks(weeks) / baseLessonLength;

      discounts.lessons   += Pricer._lessonsDiscount(adjustedLessonCount, lessonsDiscountOne, lessonsDiscountTwo);
      discounts.rate      += Pricer._rateDiscount(adjustedLessonCount, i, twoStudentDiscount, threeStudentDiscount);
      discounts.quantity  += Pricer._quantityDiscount(adjustedLessonCount, i, quantityBonus);
    }
    return discounts;
  },
  _lessonsDiscount: function(lessonCount, lessonsDiscountOne, lessonsDiscountTwo) {
    if(lessonCount >= 9 && lessonCount <= 10) {
      return lessonsDiscountOne;
    } else if(lessonCount >= 11) {
      return lessonsDiscountTwo;
    } else {
      return 0;
    }
  },
  _rateDiscount: function(lessonCount, i, twoStudentDiscount, threeStudentDiscount) {
    if(i === 1) {
      return twoStudentDiscount * lessonCount;
    } else if (i >= 2) {
     return threeStudentDiscount * lessonCount;
    } else {
      return 0;
    }
  },  
  _quantityDiscount: function(lessonCount, i, quantityBonus) {
    if(i > 0 && lessonCount > 9) {
      return quantityBonus;
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