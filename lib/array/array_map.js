"use strict";
var assignProperty = require("../helpers/assignProperty");
var ArrayPrototype = require("../helpers/ArrayPrototype");
var toObject = require("../helpers/toObject");
var arrayCanSplitString = require("../helpers/arrayCanSplitString");
var isString = require("../helpers/isString");
var toUint32 = require("../helpers/toUint32");
var isFunction = require("../helpers/isFunction");

module.exports = HAS_ARRAY_MAP ? ArrayPrototype.map : function (fun /*, thisp*/) {
  var object = toObject(this),
      self = arrayCanSplitString && isString(this) ? this.split("") : object,
      length = toUint32(self.length),
      i = 0,
      thisp = arguments[1],
      result = new Array(length);

  // If no callback function or if callback is not a callable function
  if (!isFunction(fun)) {
    throw new TypeError(fun + " is not a function");
  }

  for (; i < length; i += 1) {
    if (i in self) {
      result[i] = fun.call(thisp, self[i], i, object);
    }
  }
  return result;
};

// ES5 15.4.4.19
// http://es5.github.com/#x15.4.4.19
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/map
assignProperty(ArrayPrototype, "map", module.exports, !IS_ARRAY_MAP_WORKS_AS_EXPECTED);
