var Helper = {
  isValidCode: function(code, settingProfiles) {
    var valid = false;
    for (var i = settingProfiles.length - 1; i >= 0; i--) {
      if(settingProfiles[i].code === code) {
        valid = true;
      }
    };
    return valid;
  },
  normalizeDate: function(dateString) {
    var parts = dateString.split("-");
    var y     = Number(parts[0]);
    // JS months use 0-index
    var m     = Number(parts[1]) - 1;
    var d     = Number(parts[2]);
    
    // Use middday as norm
    return new Date(Date.UTC(y, m, d, 12, 0, 0));
  },
  adjustPaymentDay: function(day, month) {
    // Compensate for shorter months if start date is late in the month
    var monthsWithThirtyOne = [0, 2, 4, 6, 7, 9, 11];
    if(day > 28) {
      if(month === 1) {
        return 28;
      } else if(day > 30 && !monthsWithThirtyOne.includes(month)) {
        return 30;
      }
    }
    return day;
  },
  generatePaymentDates: function(startDateString) {
    // Return array of 3 payment date objects
    // First payment is App Settings' summer start date 
    // Second and third are same date next two months, adjusted for invalid dates (ex: Feb 30)
    var date        = Helper.normalizeDate(startDateString);
    var y           = date.getFullYear();
    var m           = date.getMonth();
    var d           = date.getDate();
    var adjustedDay = d;

    var first_payment = date;

    m += 1;
    adjustedDay = Helper.adjustPaymentDay(d, m);
    var sec_payment   = new Date(y, m, adjustedDay);

    m += 1;
    adjustedDay = Helper.adjustPaymentDay(d, m);
    var third_payment = new Date(y, m, adjustedDay);

    return [first_payment, sec_payment, third_payment];
  },
  getPaymentStrings: function(startDateString) {
    var payments = Helper.generatePaymentDates(startDateString);

    var paymentOne    = Helper.ordinalizeMonthDay(payments[0]);
    var paymentTwo    = Helper.ordinalizeMonthDay(payments[1]);
    var paymentThree  = Helper.ordinalizeMonthDay(payments[2]);

    return [paymentOne, paymentTwo, paymentThree];
  },
  getMonthNames: function() {
    return [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  },
  formatDate: function(date) {
    var months = Helper.getMonthNames();

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return months[monthIndex] + ' ' + day + ', ' + year;
  },
  ordinalizeMonthDay: function(date) {
    var months = Helper.getMonthNames();

    var day = date.getDate().ordinalize();
    var monthIndex = date.getMonth();

    return months[monthIndex] + ' ' + day;
  },
  localizeDate: function(date)  {
    return date.toLocaleString("en-US", {timeZone: "America/New_York"});
  },
  applyCustomSettings: function(appSettings, customSettings) {
    return appSettings;
  },
  isUnavailable: function(week, unavailableWeeks) {
    var dates = unavailableWeeks;
    if(dates.length > 0) {
      for(i=0; i < dates.length; i++) {
        // http://stackoverflow.com/questions/15141762/how-to-initialize-javascript-date-to-a-particular-timezone
        // ensure dates for comparizon are same timezone
        var unav_start_date = Helper.localizeDate(new Date(dates[i].start_date));
        var week_date = Helper.localizeDate(week.start_date);
        if(unav_start_date === week_date) {
          return true;
        }
      };
    }
    return false;
  },
  convertWeeksDatesToJS: function(weeksArray) {
    weeksArray.forEach(function(week, index) {
      var start_date = new Date(week.start_date);
      var end_date = new Date(week.end_date);
      weeksArray[index].start_date = start_date;
      weeksArray[index].end_date = end_date;
    }); 
    return weeksArray;
  },
  checkLessonMinimum: function(lessonPeriod, weeks, minLessons, changedWeek) {
    if(changedWeek) {
      var oldWeek = this.findInArrayById(changedWeek.id, weeks);
      var index = weeks.indexOf(oldWeek);
      weeks[index] = changedWeek;
    }
    var requiredMinutes = lessonPeriod.default_lesson_length * minLessons; 
    var currentLessonMinutes = this.getLessonMinutesFromWeeks(weeks);
    return this.spaceship(currentLessonMinutes, requiredMinutes);
  },
  processTeacherName: function(submittedName) {
    var names = submittedName.split(" ");
    var lastName = names.splice(names.length-1, 1)[0];
    var firstName = names.join(" ");
    return [firstName, lastName];
  },
  prettifySettingValue: function(rawValue, settingName) {
    var valueString = rawValue;

    if (settingName === 'thirtyMinRate') {
      valueString = "$" + (Number(rawValue) / 100);
    }

    if (settingName === 'baseLessonLength') {
      valueString = valueString + " minutes";
    }

    return valueString;
  },
  clone: function(object) {
    return JSON.parse(JSON.stringify(object));
  },
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
  convertMinutesToHours: function(minutesString) {
    var totalMinutes = Number(minutesString.trim());      
    var hours = (Math.floor(Math.abs(totalMinutes) / 60)).toString();  
    var minutes = (Math.abs(totalMinutes) % 60).toString(); 

    var string = "";
    string += hours > 0 ? hours + 'h ' : ''
    string += minutes + 'm' 
      
    return string;  
  },
  getWeeksWithLesson: function(weeksArray) {
    var weeksWithLesson = weeksArray.filter(function(week) {
      if(week.lesson === true) {
        return week;
      }
    });
    return weeksWithLesson;
  },
  findInArrayById: function(id, targetArray) {
    if(targetArray && targetArray.length > 0) {
      for (var i=0; i < targetArray.length; i++) {
        var elem = targetArray[i];
        if (elem.id === Number(id)) {
          return elem;
        }
      }
    } else {
      return null;
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
      return (indexOf.call(this, needle) > -1);
  },
  sumObject: function(obj) {
  // http://stackoverflow.com/questions/16449295/how-to-sum-the-values-of-a-javascript-object
    var sum = 0;
    for( var el in obj ) {
      if( obj.hasOwnProperty( el ) ) {
        sum += parseFloat( obj[el] );
      }
    }
    return sum;
  },
  // http://stackoverflow.com/questions/34852855/combined-comparison-spaceship-operator-in-javascript
  spaceship: function(val1, val2) {
    if ((val1 === null || val2 === null) || (typeof val1 != typeof val2)) {
      return null;
    }
    if (typeof val1 === 'string') {
      return (val1).localeCompare(val2);
    }
    else {
      if (val1 > val2) { return 1 }
      else if (val1 < val2) { return -1 }
      return 0;
    }
  }
  // Gets the 3 payment dates for a given year
  // paymentDates: function(year) {
  //   // returns array of 3 payments (def: 1st June/July/August of current year)
  //   var day = 1;
  //   var firstMonth = 6;
  //   var currentYear = year || new Date().getFullYear;
  //   var dates = [];
  //   for(var i=0; i<3; i++) {
  //     var string = currentYear + "-" + (i+firstMonth) + "-" + day;
  //     dates[i] = new Date(string);
  //   }
  //   return dates;
  // },

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
} 