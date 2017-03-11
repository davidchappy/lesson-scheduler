var Helper = {
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