"use strict";
var assignProperty = require("../helpers/assignProperty");
var StringPrototype = require("../helpers/StringPrototype");

var string_substr = StringPrototype.substr;// Native, don't modify

module.exports = IS_STRING_SUBSTR_WORKS_AS_EXPECTED ? string_substr : function (start, length) {
  return string_substr.call(
    this,
    start < 0 ? Math.max(0, this.length + start) : start,
    length
  );
};

// ECMA-262, 3rd B.2.3
// Not an ECMAScript standard, although ECMAScript 3rd Edition has a
// non-normative section suggesting uniform semantics and it should be
// normalized across all browsers
assignProperty(StringPrototype, "substr", module.exports, !IS_STRING_SUBSTR_WORKS_AS_EXPECTED);
