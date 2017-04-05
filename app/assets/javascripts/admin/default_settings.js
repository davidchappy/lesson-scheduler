// All values should be strings
var defaultSettings = {
  lessonLengthOptions: {
    name: 'Lesson Lengths', 
    value: "30, 45, 60, 75, 90, 105, 120", 
    description: "" },
  thirtyMinRate: { 
    name: '30Min Rate',
    value: "2000",
    description: "" },
  baseLessonLength: { 
    name: 'Base Lesson Length',
    value: "30",
    description: "" },
  adminEmail: { 
    name: 'Admin Email',
    value: "nja@dmusicstudios.com",
    description: "" }, 
  adminPhone: { 
    name: 'Admin Phone',
    value: "864-363-8526",
    description: "" }, 

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
}

