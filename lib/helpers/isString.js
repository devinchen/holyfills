"use strict";
var object_to_string = require("../helpers/object_to_string");

module.exports = function(obj) {
  return "[object String]" === object_to_string.call(obj);
};
