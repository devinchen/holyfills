"use strict";
var assignProperty = require("../helpers/assignProperty"),
    ArrayPrototype = require("../helpers/ArrayPrototype"),
    toObject = require("../helpers/toObject"),
    arrayCanSplitString = require("../helpers/arrayCanSplitString"),
    isString = require("../helpers/isString"),
    toUint32 = require("../helpers/toUint32"),
    isFunction = require("../helpers/isFunction");

module.exports = HAS_ARRAY_REDUCE ? ArrayPrototype.reduce : function (fun /*, initial*/) {
  var object = toObject(this),
      self,
      length,
      i = 0,
      result;

  // If no callback function or if callback is not a callable function
  if (!isFunction(fun)) {
    throw new TypeError(fun + " is not a function");
  }

  self = arrayCanSplitString && isString(this) ? this.split("") : object;
  length = toUint32(self.length);

  // no value to return if no initial value and an empty array
  if (!length && 1 === arguments.length) {
    throw new TypeError("reduce of empty array with no initial value");
  }

  if (2 <= arguments.length) {
    result = arguments[1];
  } else {
    do {
      if (i in self) {
        result = self[i];
        i += 1;
        break;
      }
      i += 1;
      // if array contains no values, no initial value to return
      if (i >= length) {
        throw new TypeError("reduce of empty array with no initial value");
      }
    } while (true);
  }

  for (; i < length; i += 1) {
    if (i in self) {
      result = fun.call(void 0, result, self[i], i, object);
    }
  }

  return result;
};

// ES5 15.4.4.21
// http://es5.github.com/#x15.4.4.21
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduce

assignProperty(ArrayPrototype, "reduce", module.exports, !IS_ARRAY_REDUCE_WORKS_AS_EXPECTED);
