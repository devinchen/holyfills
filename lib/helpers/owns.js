"use strict";
var function_bind = require("../function/function_bind"),
    FunctionPrototype = require("../helpers/FunctionPrototype"),
    ObjectPrototype = require("../helpers/ObjectPrototype");

module.exports = function_bind.call(FunctionPrototype.call, ObjectPrototype.hasOwnProperty);
