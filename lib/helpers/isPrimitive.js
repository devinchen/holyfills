"use strict";

module.exports = function (input) {
  var type = typeof input;
  return (
    null === input ||
    "undefined" === type ||
    "boolean" === type ||
    "number" === type ||
    "string" === type
  );
};
