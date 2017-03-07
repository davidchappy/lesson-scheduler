var getTotalLessonCount = function(lessonPeriods) {
  var lessonCount = 0;
  lessonPeriods.forEach(function(lessonPeriod) {
    lessonCount += lessonPeriod.lesson_count;
  });
  return lessonCount;
}

var getLessonCountFromWeeks = function(weeks) {
  var lessonCount = 0;
  weeks.forEach(function(week) {
    lessonCount += week.lesson ? 1 : 0;
  });
  return lessonCount; 
}

var getTotalLessonMinutes = function(allWeeks) {
  var duration = 0;
  var weekKeys = Object.keys(allWeeks);
  for(weekKey in weekKeys) {
    var i = Number(weekKeys[weekKey]);
    duration += getLessonMinutesFromWeeks(allWeeks[i]);
  }

  return duration;
}

var getLessonMinutesFromWeeks = function(weeks) {
  var duration = 0;
  for(week in weeks) {
    var week = weeks[week];
    duration += week.lesson ? Number(week.lesson_length) : 0;    
  }
  return duration;
}

var updateLessonLengthInWeeks = function(weeks, newLength) {
  var result;
  for(var i=0; i<weeks.length; i++) {
    weeks[i].lesson_length = newLength;
  }

  return weeks;
}

var monetize = function(amount) {
// currency formatting 
  return ("$" + (amount/100));
}

// var calculatePricing = function(lessonPeriods, allWeeks) {
// // calculate form cost and discounts from lesson and lesson period counts

//   // get total lesson count from lesson periods
//   var lessonCount = getTotalLessonCount(lessonPeriods);

//   // get possible discount based on number of lesson periods
//   var lessonPeriodCount = lessonPeriods.length;
//   var possibleDiscount = 0;
//   if(lessonPeriodCount > 0) {
//     possibleDiscount = calculatePossibleDiscount(lessonPeriodCount);
//   }

//   // get actual discounts and total owed from lesson and lesson period counts
//   var discount = 0;
//   var totalOwed = 0;
//   var rawTotal = lessonCount * 2000;
//   lessonPeriods.map(function(lessonPeriod) {
//     totalOwed += calculateLessonPeriodCost(lessonPeriod, lessonPeriods);
//   })
//   discount = rawTotal - totalOwed;

//   return { discount: discount, totalOwed: totalOwed, possibleDiscount: possibleDiscount}
// }

var calculatePricing = function(lessonPeriods, allWeeks) {
// calculate form cost and discounts from lesson and lesson period counts

  // get total lesson count and minutes from lesson periods
  // var lessonCount = getTotalLessonCount(lessonPeriods);
  var lessonCount = getTotalLessonMinutes(allWeeks) / appSettings.baseLessonLength;
  console.log("Total 30-min Lesson Count: ");
  console.log(lessonCount);

  // get possible discount based on number of lesson periods
  var lessonPeriodCount = lessonPeriods.length;
  var possibleDiscount = 0;
  if(lessonPeriodCount > 0) {
    possibleDiscount = calculatePossibleDiscount(lessonPeriodCount);
  }

  // get actual discounts and total owed from lesson and lesson period counts
  var discount = 0;
  var totalOwed = 0;
  var rawTotal = lessonCount * appSettings.thirtyMinRate;
  console.log("Raw Total: ");
  console.log(rawTotal);
  lessonPeriods.map(function(lessonPeriod) {
    var weeks = allWeeks[lessonPeriod.id];
    totalOwed += calculateLessonPeriodCost(lessonPeriod, lessonPeriods, weeks);
  })
  discount = rawTotal - totalOwed;
  if(discount > possibleDiscount) {
    discount = possibleDiscount;
  }

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

var calculateLessonPeriodCost = function(lessonPeriod, lessonPeriods, weeks) {
  // utility to calculate the cost of an individual lesson period
  var lessonCount = lessonPeriod.lesson_count;
  var adjustedLessonCount = getLessonMinutesFromWeeks(weeks) / appSettings.baseLessonLength;
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
  console.log(cost);
  return cost;
}

var convertMinutesToHours = function(timeInMinutes) {      
  var hours = Math.floor(Math.abs(timeInMinutes) / 60);  
  var minutes = Math.abs(timeInMinutes) % 60; 

  var string = "";
  string += hours > 0 ? hours + 'h ' : ''
  string += minutes + 'm' 
    
  return string;  
}

var findElementInArrayById = function(id, targetArray) {
  for (var i=0; i < targetArray.length; i++) {
    var elem = targetArray[i];
    if (elem.id === Number(id)) {
      return elem;
    }
  }
}

// Potentially useful function for later
// var getArgs = function(args) {
//   // First match everything inside the function argument parens.
//   var args = args.toString().match(/function\s.*?\(([^)]*)\)/)[1];
 
//   // Split the arguments string into an array comma delimited.
//   return args.split(',').map(function(arg) {
//     // Ensure no inline comments are parsed and trim the whitespace.
//     return arg.replace(/\/\*.*\*\//, '').trim();
//   }).filter(function(arg) {
//     // Ensure no undefined values are added.
//     return arg;
//   });
// }