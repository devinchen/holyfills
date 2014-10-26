"use strict";
var assignProperty = require("../helpers/assignProperty"),
    ArrayPrototype = require("../helpers/ArrayPrototype"),
    toObject = require("../helpers/toObject"),
    arrayCanSplitString = require("../helpers/arrayCanSplitString"),
    isString = require("../helpers/isString"),
    toUint32 = require("../helpers/toUint32"),
    isFunction = require("../helpers/isFunction");

module.exports = HAS_ARRAY_MAP ? ArrayPrototype.map : function (fun /*, thisp*/) {
  var object = toObject(this),
      self,
      length,
      thisp,
      result,
      i;

  // If no callback function or if callback is not a callable function
  if (!isFunction(fun)) {
    throw new TypeError(fun + " is not a function");
  }

  self = arrayCanSplitString && isString(this) ? this.split("") : object;
  length = toUint32(self.length);
  thisp = arguments[1];
  result = new Array(length);

  for (i = 0; i < length; i += 1) {
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
