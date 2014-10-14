"use strict";
var assignProperty = require("../helpers/assignProperty");
var ArrayPrototype = require("../helpers/ArrayPrototype");
var toObject = require("../helpers/toObject");
var arrayCanSplitString = require("../helpers/arrayCanSplitString");
var isString = require("../helpers/isString");
var toUint32 = require("../helpers/toUint32");
var isFunction = require("../helpers/isFunction");

module.exports = HAS_ARRAY_FOREACH ? ArrayPrototype.forEach : function (fun /*, thisp*/) {
  var object = toObject(this);

  // If no callback function or if callback is not a callable function
  if (!isFunction(fun)) {
    throw new TypeError(fun + " is not a function");
  }

  var self = arrayCanSplitString && isString(this) ? this.split("") : object,
      length = toUint32(self.length),
      thisp = arguments[1];

  for (var i = 0; i < length; i += 1) {
    if (i in self) {
      // Invoke the callback function with call, passing arguments:
      // context, property value, property key, thisArg object
      // context
      fun.call(thisp, self[i], i, object);
    }
  }
};

// ES5 15.4.4.18
// http://es5.github.com/#x15.4.4.18
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/forEach
assignProperty(ArrayPrototype, "forEach", module.exports, !IS_ARRAY_FOREACH_WORKS_AS_EXPECTED);
