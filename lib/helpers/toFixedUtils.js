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
  while (0 <= i) {
    c += exports.data[i];
    exports.data[i] = Math.floor(c / n);
    c = (c % n) * exports.base;
    i -= 1;
  }
};
exports.numToString = function () {
  var i = exports.size - 1;
  var s = "";
  while (0 <= i) {
    if ("" !== s || 0 === i || 0 !== exports.data[i]) {
      var t = String(exports.data[i]);
      if ("" === s) {
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
  while (4096 <= x) {
    n += 12;
    x /= 4096;
  }
  while (2 <= x) {
    n += 1;
    x /= 2;
  }
  return n;
};

function pow (x, n, acc) {
  return (0 === n ? acc : (1 === n % 2 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc)));
}
