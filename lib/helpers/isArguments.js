"use strict";
var object_to_string = require("../helpers/object_to_string");
var isArray = require("../array/isArray");
var isFunction = require("./isFunction");

module.exports = function(obj) {
  return (object_to_string.call(obj) === "[object Arguments]") || (
    !isArray(obj) &&
    obj !== null &&
    typeof obj === "object" &&
    typeof obj.length === "number" &&
    obj.length >= 0 &&
    isFunction(obj.callee)
  );
};
