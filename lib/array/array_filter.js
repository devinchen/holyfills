"use strict";
var assignProperty = require("../helpers/assignProperty");
var ArrayPrototype = require("../helpers/ArrayPrototype");
var toObject = require("../helpers/toObject");
var arrayCanSplitString = require("../helpers/arrayCanSplitString");
var isString = require("../helpers/isString");
var toUint32 = require("../helpers/toUint32");
var isFunction = require("../helpers/isFunction");

module.exports = HAS_ARRAY_FILTER ? ArrayPrototype.filter : function (fun /*, thisp*/) {
  var object = toObject(this);

  // If no callback function or if callback is not a callable function
  if (!isFunction(fun)) {
    throw new TypeError(fun + " is not a function");
  }

  var self = arrayCanSplitString && isString(this) ? this.split("") : object,
      length = toUint32(self.length),
      thisp = arguments[1],
      value,
      result = [];

  for (var i = 0; i < length; i += 1) {
    if (i in self) {
      value = self[i];
      if (fun.call(thisp, value, i, object)) {
        result.push(value);
      }
    }
  }
  return result;
};

// ES5 15.4.4.20
// http://es5.github.com/#x15.4.4.20
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/filter
assignProperty(ArrayPrototype, "filter", module.exports, !IS_ARRAY_FILTER_WORKS_AS_EXPECTED);
