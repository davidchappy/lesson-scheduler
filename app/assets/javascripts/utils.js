var utils = {
  getTotalLessonCount: function(lessonPeriods) {
    var lessonCount = 0;
    lessonPeriods.forEach(function(lessonPeriod) {
      lessonCount += lessonPeriod.lesson_count;
    });
    return lessonCount;
  },
  getLessonCountFromWeeks: function(weeks) {
    var lessonCount = 0;
    weeks.forEach(function(week) {
      lessonCount += week.lesson ? 1 : 0;
    });
    return lessonCount; 
  },
  getTotalLessonMinutes: function(allWeeks) {
    var duration = 0;
    var weekKeys = Object.keys(allWeeks);
    for(weekKey in weekKeys) {
      var i = Number(weekKeys[weekKey]);
      duration += this.getLessonMinutesFromWeeks(allWeeks[i]);
    }

    return duration;
  },
  getLessonMinutesFromWeeks: function(weeks) {
    var duration = 0;
    for(week in weeks) {
      var week = weeks[week];
      duration += week.lesson ? Number(week.lesson_length) : 0;    
    }
    return duration;
  },
  updateLessonLengthInWeeks: function(weeks, newLength) {
    var result;
    for(var i=0; i<weeks.length; i++) {
      weeks[i].lesson_length = newLength;
    }

    return weeks;
  },
  monetize: function(amount) {
    var roundedAmount = this.round(amount, 0);
  // currency formatting 
    return ("$" + (roundedAmount/100));
  },
  round: function(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  },
  calculatePricing: function(lessonPeriods, allWeeks) {
  // calculate form cost and discounts from lesson and lesson period counts

    // get total lesson count and minutes from lesson periods
    // var lessonCount = getTotalLessonCount(lessonPeriods);
    var lessonCount = this.getTotalLessonMinutes(allWeeks) / appSettings.baseLessonLength;

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
      totalOwed += utils.calculateLessonPeriodCost(lessonPeriod, lessonPeriods, weeks);
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
    var adjustedLessonCount = this.getLessonMinutesFromWeeks(weeks) / appSettings.baseLessonLength;
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
  convertMinutesToHours: function(timeInMinutes) {      
    var hours = Math.floor(Math.abs(timeInMinutes) / 60);  
    var minutes = Math.abs(timeInMinutes) % 60; 

    var string = "";
    string += hours > 0 ? hours + 'h ' : ''
    string += minutes + 'm' 
      
    return string;  
  },
  findElementInArrayById: function(id, targetArray) {
    for (var i=0; i < targetArray.length; i++) {
      var elem = targetArray[i];
      if (elem.id === Number(id)) {
        return elem;
      }
    }
  },
  contains: function(needle) {
    // http://stackoverflow.com/questions/1181575/determine-whether-an-array-contains-a-value
    // more compatible "find in array" method
      // Per spec, the way to identify NaN is that it is not equal to itself
      var findNaN = needle !== needle;
      var indexOf;

      if(!findNaN && typeof Array.prototype.indexOf === 'function') {
          indexOf = Array.prototype.indexOf;
      } else {
          indexOf = function(needle) {
              var i = -1, index = -1;

              for(i = 0; i < this.length; i++) {
                  var item = this[i];

                  if((findNaN && item !== item) || item === needle) {
                      index = i;
                      break;
                  }
              }

              return index;
          };
      }
      return indexOf.call(this, needle) > -1;
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