var monetize = function(amount) {
// currency formatting 
  return ("$" + (amount/100));
}

var calculatePricing = function(lessonCount, lessonPeriods) {
// calculate form cost and discounts from lesson and lesson period counts

  // get possible discount based on number of lesson periods
  var lessonPeriodCount = lessonPeriods.length;
  var possibleDiscount = calculatePossibleDiscount(lessonPeriodCount);

  // get actual discounts and total owed from lesson and lesson period counts
  var discount = 0;
  var totalOwed = 0;
  var rawTotal = lessonCount * 2000;
  lessonPeriods.map((lessonPeriod) => {
    totalOwed += calculateLessonPeriodCost(lessonPeriod, lessonPeriodCount, lessonPeriods);
  })
  discount = rawTotal - totalOwed;

  return { discount: discount, totalOwed: totalOwed, possibleDiscount: possibleDiscount}
}

var calculatePossibleDiscount = function(lessonPeriodCount) {
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
}

var calculateLessonPeriodCost = function(lessonPeriod, lessonPeriodCount, lessonPeriods) {
  // utility to calculate the cost of an individual lesson period
  var lessonCount = lessonPeriod.lesson_count;
  var lessonPeriodDiscount = 0;
  var lessonRate = 2000;
  var cost = 0;

  // Apply discount for more than 1 lessonPeriod
  if(lessonPeriodCount >= 2) {
    if(lessonPeriods.indexOf(lessonPeriod) == 0) {
      lessonRate = 2000;
    } else if(lessonPeriods.indexOf(lessonPeriod) == 1) {
      lessonRate = 1800;
    } else {
      lessonRate = 1600;
    }
  }

  // Apply discount for more than 8 lessons per lessonPeriod
  if(lessonCount >= 9 && lessonCount <= 10) {
    lessonPeriodDiscount += 2000;
  } else if (lessonCount >= 11) {
    lessonPeriodDiscount += 3000;
  }

  // Apply discount for more than 9 lessons and more than 1 lessonPeriod
  if(lessonCount > 9 && lessonPeriodCount > 1) {
    if(lessonPeriods.indexOf(lessonPeriod) >= 1) {
      lessonPeriodDiscount += 500;
    }
  }

  cost = (lessonCount * lessonRate) - lessonPeriodDiscount;
  return cost;
}