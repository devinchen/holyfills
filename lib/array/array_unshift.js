"use strict";
var assignProperty = require("../helpers/assignProperty"),
    ArrayPrototype = require("../helpers/ArrayPrototype"),
    array_unshift = require("../helpers/array_unshift");

module.exports = IS_ARRAY_UNSHIFT_WORKS_AS_EXPECTED ? array_unshift : function () {
  array_unshift.apply(this, arguments);
  return this.length;
};

// ES5 15.4.4.12
// http://es5.github.com/#x15.4.4.13
// Return len+argCount.
// [bugfix, ielt8]
assignProperty(ArrayPrototype, "unshift", module.exports, !IS_ARRAY_UNSHIFT_WORKS_AS_EXPECTED);
