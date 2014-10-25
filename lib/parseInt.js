"use strict";
var string_trim = require("./string/string_trim");

if (!IS_PARSE_INT_WORKS_AS_EXPECTED) {
  // ES-5 15.1.2.2
  /* jshint -W020 */
  parseInt = (function (origParseInt) {
    var hexRegex = /^0[xX]/;
    return function parseIntES5 (str, radix) {
      var trimmedStr = string_trim.call(String(str)),
          correctRadix = radix;
      if (!Number(correctRadix)) {
        correctRadix = hexRegex.test(trimmedStr) ? 16 : 10;
      }
      return origParseInt(trimmedStr, correctRadix);
    };
  }(parseInt));
}

module.exports = parseInt;
