"use strict";
var assignProperty = require("../helpers/assignProperty");
var StringPrototype = require("../helpers/StringPrototype");
var string_replace = require("./string_replace");

// whitespace from: http://es5.github.io/#x15.5.4.20
var ws = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003" +
          "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028" +
          "\u2029\uFEFF";
var wsRegexChars = "[" + ws + "]";
var trimBeginRegexp = new RegExp("^" + wsRegexChars + wsRegexChars + "*");
var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + "*$");

// http://blog.stevenlevithan.com/archives/faster-trim-javascript
// http://perfectionkills.com/whitespace-deviations/
module.exports = IS_STRING_TRIM_WORKS_AS_EXPECTED ? StringPrototype.trim : function () {
  if (this === void 0 || null === this) {
    throw new TypeError("can't convert " + this + " to object");
  }
  return string_replace.call(
    string_replace.call(String(this), trimBeginRegexp, ""),
    trimEndRegexp, ""
  );
};

// ES5 15.5.4.20
assignProperty(StringPrototype, "trim", module.exports, !IS_STRING_TRIM_WORKS_AS_EXPECTED);
