"use strict";
var assignProperty = require("../helpers/assignProperty"),
    isConstructor = require("../helpers/isConstructor");

module.exports = HAS_ARRAY_OF ? Array.of : function () {
  var items = arguments,
      length = items.length,
      result = isConstructor(this) ? new this(length) : new Array(length),
      index = 0,
      value;

  while (index < length) {
    value = items[index];
    assignProperty(result, index, value, false);
    index += 1;
  }
  result.length = length;
  return result;
};

assignProperty(Array, "of", module.exports, false);

//defineProperty(Array, 'of', { 'value': of, 'configurable': true, 'writable': true });
