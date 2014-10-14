"use strict";

exports.base = 1e7;
exports.size = 6;
exports.data = [0, 0, 0, 0, 0, 0];
exports.multiply = function (n, c) {
  var i = 0;
  while (i < exports.size) {
    c += n * exports.data[i];
    exports.data[i] = c % exports.base;
    c = Math.floor(c / exports.base);
    i += 1;
  }
};
exports.divide = function (n) {
  var i = exports.size - 1, c = 0;
  while (i >= 0) {
    c += exports.data[i];
    exports.data[i] = Math.floor(c / n);
    c = (c % n) * exports.base;
    i -= 1;
  }
};
exports.numToString = function () {
  var i = exports.size - 1;
  var s = "";
  while (i >= 0) {
    if (s !== "" || i === 0 || exports.data[i] !== 0) {
      var t = String(exports.data[i]);
      if (s === "") {
        s = t;
      } else {
        s += "0000000".slice(0, 7 - t.length) + t;
      }
    }
    i -= 1;
  }
  return s;
};

exports.pow = pow;

exports.log = function (x) {
  var n = 0;
  while (x >= 4096) {
    n += 12;
    x /= 4096;
  }
  while (x >= 2) {
    n += 1;
    x /= 2;
  }
  return n;
};

function pow (x, n, acc) {
  return (n === 0 ? acc : (n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc)));
}
