"use strict";
var assignProperty = require("../helpers/assignProperty");
var object_to_string = require("../helpers/object_to_string");

module.exports = HAS_ARRAY_IS_ARRAY ? Array.isArray : function (obj) {
  return "[object Array]" === object_to_string.call(obj);
};

// ES5 15.4.3.2
// http://es5.github.com/#x15.4.3.2
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
assignProperty(Array, "isArray", module.exports);
