"use strict";

module.exports = function (Constructor) {
  try {
    var me = new Constructor();
    return true;
  } catch (e) {
    return false;
  }
};
