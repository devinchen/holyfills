"use strict";

// ES5 9.4
// http://es5.github.com/#x9.4
// http://jsperf.com/to-integer
module.exports = function (num) {
  var n = +num;
  if (n !== n) { // isNaN
    n = 0;
  } else if (0 !== n && n !== (1 / 0) && n !== -(1 / 0)) {
    n = (0 < n || -1) * Math.floor(Math.abs(n));
  }
  return n;
};
