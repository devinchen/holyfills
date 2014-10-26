"use strict";
var assignProperty = require("../helpers/assignProperty"),
    ArrayPrototype = require("../helpers/ArrayPrototype"),
    toObject = require("../helpers/toObject"),
    arrayCanSplitString = require("../helpers/arrayCanSplitString"),
    isString = require("../helpers/isString"),
    toUint32 = require("../helpers/toUint32"),
    isFunction = require("../helpers/isFunction");

module.exports = HAS_ARRAY_REDUCE_RIGHT ? ArrayPrototype.reduceRight : function (fun /*, initial*/) {
  var object = toObject(this),
      self,
      length,
      i,
      result;

  // If no callback function or if callback is not a callable function
  if (!isFunction(fun)) {
    throw new TypeError(fun + " is not a function");
  }

  self = arrayCanSplitString && isString(this) ? this.split("") : object;
  length = toUint32(self.length);

  // no value to return if no initial value and an empty array
  if (!length && 1 === arguments.length) {
    throw new TypeError("reduceRight of empty array with no initial value");
  }

  i = length - 1;

  if (2 <= arguments.length) {
    result = arguments[1];
  } else {
    do {
      if (i in self) {
        result = self[i];
        i -= 1;
        break;
      }
      i -= 1;
      // if array contains no values, no initial value to return
      if (0 > i) {
        throw new TypeError("reduceRight of empty array with no initial value");
      }
    } while (true);
  }

  if (0 > i) {
    return result;
  }

  do {
    if (i in self) {
      result = fun.call(void 0, result, self[i], i, object);
    }
    i -= 1;
  } while (0 <= i);

  return result;
};

// ES5 15.4.4.22
// http://es5.github.com/#x15.4.4.22
// https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Array/reduceRight

assignProperty(ArrayPrototype, "reduceRight", module.exports, !IS_ARRAY_REDUCE_RIGHT_WORKS_AS_EXPECTED);
