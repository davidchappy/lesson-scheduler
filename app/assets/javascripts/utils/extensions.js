// http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
// Add clean method to Array
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

// http://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
Date.prototype.yyyymmdd = function(separator) {
  var separator = separator || "";
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join(separator);
};

// http://stackoverflow.com/questions/15397372/javascript-new-date-ordinal-st-nd-rd-th
Number.prototype.getNth = function(){
  if(this>3 && this<21) return 'th';
  switch (this % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
  }
}

Number.prototype.ordinalize = function(){
  var nth = Number(this).getNth();
  return String(this) + nth;
}