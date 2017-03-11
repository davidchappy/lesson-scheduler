var Pricer = {
  calculatePricing: function(lessonPeriods, allWeeks) {
  // calculate form cost and discounts from lesson and lesson period counts

    // get total lesson count and minutes from lesson periods
    // var lessonCount = getTotalLessonCount(lessonPeriods);
    var lessonCount = Helper.getTotalLessonMinutes(allWeeks) / appSettings.baseLessonLength;

    // get possible discount based on number of lesson periods
    var lessonPeriodCount = lessonPeriods.length;
    var possibleDiscount = 0;
    if(lessonPeriodCount > 0) {
      possibleDiscount = this.calculatePossibleDiscount(lessonPeriodCount);
    }

    // get actual discounts and total owed from lesson and lesson period counts
    var discount = 0;
    var totalOwed = 0;
    var rawTotal = lessonCount * appSettings.thirtyMinRate;
    lessonPeriods.map(function(lessonPeriod) {
      var weeks = allWeeks[lessonPeriod.id];
      totalOwed += Pricer.calculateLessonPeriodCost(lessonPeriod, lessonPeriods, weeks);
    })
    discount = rawTotal - totalOwed;
    if(discount > possibleDiscount) {
      discount = possibleDiscount;
    }

    return { discount: discount, totalOwed: totalOwed, possibleDiscount: possibleDiscount}
  },
  calculatePossibleDiscount: function(lessonPeriodCount) {
  // utility to calculate possible discount from the number of lesson periods
    var possibleDiscount = 0;
    possibleDiscount = (3000 * lessonPeriodCount) + (500 * (lessonPeriodCount-1));
    if(lessonPeriodCount >= 2) { 
      possibleDiscount += (200 * 13); 
    } 
    if(lessonPeriodCount > 2) { 
      possibleDiscount += ((400*13) * (lessonPeriodCount-2)); 
    } 
    return possibleDiscount;
  },
  calculateLessonPeriodCost: function(lessonPeriod, lessonPeriods, weeks) {
    // utility to calculate the cost of an individual lesson period
    var lessonCount = lessonPeriod.lesson_count;
    var adjustedLessonCount = Helper.getLessonMinutesFromWeeks(weeks) / appSettings.baseLessonLength;
    var lessonPeriodCount = lessonPeriods.length;
    var lessonPeriodDiscount = 0;
    var lessonRate = appSettings.thirtyMinRate;
    var cost = 0;

    // Apply rate discount for more than 1 lessonPeriod
    if(lessonPeriodCount >= 2) {
      if(lessonPeriods.indexOf(lessonPeriod) == 0) {
        lessonRate = lessonRate;
      } else if(lessonPeriods.indexOf(lessonPeriod) == 1) {
        lessonRate = 1800;
      } else {
        lessonRate = 1600;
      }
    }

    // Apply per/student discount for more than 8 lessons per lessonPeriod
    if(adjustedLessonCount >= 9 && adjustedLessonCount <= 10) {
      lessonPeriodDiscount += 2000;
    } else if (adjustedLessonCount >= 11) {
      lessonPeriodDiscount += 3000;
    }

    // Apply per/student discount for more than 9 lessons and more than 1 lessonPeriod
    if(adjustedLessonCount > 9 && lessonPeriodCount > 1) {
      if(lessonPeriods.indexOf(lessonPeriod) >= 1) {
        lessonPeriodDiscount += 500;
      }
    }

    cost = (adjustedLessonCount * lessonRate) - lessonPeriodDiscount;
    return cost;
  },
  calculateLessonRateDiscount: function(lessonPeriods) {
    var discount = 0;
    for(var i=0; i<lessonPeriods.length; i++) {
      var lessonPeriod = lessonPeriods[i];
      if(i === 1) {
        discount = 200 * lessonPeriod.lesson_count;
      } else if (i >= 2) {
        discount = 400 * lessonPeriod.lesson_count;
      }
    }
    return discount;
  },
  calculateQuantityDiscount: function() {

  },
  calculatePerStudentDiscount: function() {

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