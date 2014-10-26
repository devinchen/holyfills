"use strict";
var assignProperty = require("../helpers/assignProperty"),
    ArrayPrototype = require("../helpers/ArrayPrototype"),
    toObject = require("../helpers/toObject"),
    arrayCanSplitString = require("../helpers/arrayCanSplitString"),
    isString = require("../helpers/isString"),
    toUint32 = require("../helpers/toUint32"),
    isFunction = require("../helpers/isFunction");

module.exports = HAS_ARRAY_EVERY ? ArrayPrototype.every : function (fun /*, thisp*/) {
  var object = toObject(this),
      self,
      length,
      thisp,
      i;

  // If no callback function or if callback is not a callable function
  if (!isFunction(fun)) {
    throw new TypeError(fun + " is not a function");
  }

  self = arrayCanSplitString && isString(this) ? this.split("") : object;
  length = toUint32(self.length);
  thisp = arguments[1];

  for (i = 0; i < length; i += 1) {
    if (i in self && !fun.call(thisp, self[i], i, object)) {
      return false;
    }
  }
  return true;
};

// ES5 15.4.4.16
// http://es5.github.com/#x15.4.4.16
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
assignProperty(ArrayPrototype, "every", module.exports, !IS_ARRAY_EVERY_WORKS_AS_EXPECTED);
