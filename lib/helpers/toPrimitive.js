"use strict";
var isPrimitive = require("./isPrimitive"),
    isFunction = require("./isFunction");

module.exports = function (input) {
  var val, valueOf, toStr;
  if (isPrimitive(input)) {
    return input;
  }
  valueOf = input.valueOf;
  if (isFunction(valueOf)) {
    val = valueOf.call(input);
    if (isPrimitive(val)) {
      return val;
    }
  }
  toStr = input.toString;
  if (isFunction(toStr)) {
    val = toStr.call(input);
    if (isPrimitive(val)) {
      return val;
    }
  }
  throw new TypeError();
};
