"use strict";
var object_to_string = require("../helpers/object_to_string"),
    isArray = require("../array/isArray"),
    isFunction = require("./isFunction");

module.exports = function (obj) {
  return ("[object Arguments]" === object_to_string.call(obj)) || (
    !isArray(obj) &&
    null !== obj &&
    "object" === typeof obj &&
    "number" === typeof obj.length &&
    0 <= obj.length &&
    isFunction(obj.callee)
  );
};
