"use strict";
var assignProperty = require("../helpers/assignProperty");
var NumberPrototype = require("../helpers/NumberPrototype");
var toFixedUtils = require("../helpers/toFixedUtils");

module.exports = HAS_NUMBER_TO_FIXED ? NumberPrototype.toFixed : function (fractionDigits) {
  var f, x, s, m, e, z, j, k;

  // Test for NaN and round fractionDigits down
  f = Number(fractionDigits);
  f = f !== f ? 0 : Math.floor(f);

  if (0 > f || 20 < f) {
    throw new RangeError("Number.toFixed called with invalid number of decimals");
  }

  x = Number(this);

  // Test for NaN
  if (x !== x) {
    return "NaN";
  }

  // If it is too big or small, return the string value of the number
  if (-1e21 >= x || 1e21 <= x) {
    return String(x);
  }

  s = "";

  if (0 > x) {
    s = "-";
    x = -x;
  }

  m = "0";

  if (1e-21 < x) {
    // 1e-21 < x < 1e21
    // -70 < log2(x) < 70
    e = toFixedUtils.log(x * toFixedUtils.pow(2, 69, 1)) - 69;
    z = (0 > e ? x * toFixedUtils.pow(2, -e, 1) : x / toFixedUtils.pow(2, e, 1));
    z *= 0x10000000000000; // Math.pow(2, 52);
    e = 52 - e;

    // -18 < e < 122
    // x = z / 2 ^ e
    if (0 < e) {
      toFixedUtils.multiply(0, z);
      j = f;

      while (7 <= j) {
        toFixedUtils.multiply(1e7, 0);
        j -= 7;
      }

      toFixedUtils.multiply(toFixedUtils.pow(10, j, 1), 0);
      j = e - 1;

      while (23 <= j) {
        /* jshint -W016 */
        toFixedUtils.divide(1 << 23);
        j -= 23;
      }

      /* jshint -W016 */
      toFixedUtils.divide(1 << j);
      toFixedUtils.multiply(1, 1);
      toFixedUtils.divide(2);
      m = toFixedUtils.numToString();
    } else {
      toFixedUtils.multiply(0, z);
      /* jshint -W016 */
      toFixedUtils.multiply(1 << (-e), 0);
      m = toFixedUtils.numToString() + "0.00000000000000000000".slice(2, 2 + f);
    }
  }

  if (0 < f) {
    k = m.length;

    if (k <= f) {
      m = s + "0.0000000000000000000".slice(0, f - k + 2) + m;
    } else {
      m = s + m.slice(0, k - f) + "." + m.slice(k - f);
    }
  } else {
    m = s + m;
  }

  return m;
};

// ES5.1 15.7.4.5
// http://es5.github.com/#x15.7.4.5
assignProperty(NumberPrototype, "toFixed", module.exports, !IS_NUMBER_TO_FIXED_WORKS_AS_EXPECTED);

