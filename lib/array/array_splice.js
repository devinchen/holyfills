"use strict";
var assignProperty = require("../helpers/assignProperty"),
    ArrayPrototype = require("../helpers/ArrayPrototype"),
    array_splice = require("../helpers/array_splice"),
    toInteger = require("../helpers/toInteger"),
    array_slice = require("../helpers/array_slice");

module.exports = IS_ARRAY_SPLICE_WORKS_AS_EXPECTED ? array_splice : function (start, deleteCount) {
  var args = arguments;
  if (0 === args.length) {
    return [];
  } else {
    if (!IS_ARRAY_SPLICE_WORKS_AS_EXPECTED_FOR_EMPTY_OBJECT) {
      this.length = Math.max(toInteger(this.length), 0);
      if (0 < args.length && "number" !== typeof deleteCount) {
        args = array_slice.call(args);
        if (2 > args.length) {
          args.push(this.length - start);
        } else {
          args[1] = toInteger(deleteCount);
        }
      }
    }
    return array_splice.apply(this, args);
  }
};

// ES5 15.4.4.12
// http://es5.github.com/#x15.4.4.12
assignProperty(ArrayPrototype, "splice", module.exports, !IS_ARRAY_SPLICE_WORKS_AS_EXPECTED);
