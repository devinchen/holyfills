"use strict";
var assignProperty = require("../helpers/assignProperty"),
    ArrayPrototype = require("../helpers/ArrayPrototype"),
    arrayCanSplitString = require("../helpers/arrayCanSplitString"),
    isString = require("../helpers/isString"),
    toObject = require("../helpers/toObject"),
    toUint32 = require("../helpers/toUint32"),
    toInteger = require("../helpers/toInteger");

module.exports = HAS_ARRAY_INDEX_OF ? ArrayPrototype.indexOf : function (sought /*, fromIndex */ ) {
  var self = arrayCanSplitString && isString(this) ? this.split("") : toObject(this),
      length = toUint32(self.length),
      i = 0;

  if (!length) {
    return -1;
  }

  if (1 < arguments.length) {
    i = toInteger(arguments[1]);
  }

  // handle negative indices
  i = 0 <= i ? i : Math.max(0, length + i);
  for (; i < length; i += 1) {
    if (i in self && self[i] === sought) {
      return i;
    }
  }
  return -1;
};

// ES5 15.4.4.14
// http://es5.github.com/#x15.4.4.14
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
assignProperty(ArrayPrototype, "indexOf", module.exports, !IS_ARRAY_INDEX_OF_WORKS_AS_EXPECTED);
