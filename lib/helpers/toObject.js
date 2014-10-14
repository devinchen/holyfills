"use strict";

// ES5 9.9
// http://es5.github.com/#x9.9
module.exports = function (o) {
  /* jshint -W116 */
  if (o == null) { // this matches both null and undefined
    throw new TypeError("can't convert " + o + " to object");
  }
  return Object(o);
};
