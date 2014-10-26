"use strict";
var assignProperty = require("../helpers/assignProperty"),
    date_constructor = require("./date_constructor");

module.exports = HAS_DATE_NOW ? date_constructor.now : function () {
  return new Date().getTime();
};

// ES5 15.9.4.4
// http://es5.github.com/#x15.9.4.4
assignProperty(date_constructor, "now", module.exports);
