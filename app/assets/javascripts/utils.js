//= require ./utils/extensions
//= require ./utils/pricer
//= require ./utils/helper




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