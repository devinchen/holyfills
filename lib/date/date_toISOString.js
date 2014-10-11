"use strict";
var assignProperty = require("../helpers/assignProperty");
var DatePrototype = require("../helpers/DatePrototype");

var negativeDate = -62198755200000;
var negativeYearString = "-000001";

module.exports = HAS_DATE_TO_ISO_STRING ? DatePrototype.toISOString : function () {
// This function returns a String value represent the instance in time
// represented by this Date object. The format of the String is the Date Time
// string format defined in 15.9.1.15. All fields are present in the String.
// The time zone is always UTC, denoted by the suffix Z. If the time value of
// this object is not a finite Number a RangeError exception is thrown.
  var result, length, value, year, month;
  if (!isFinite(this)) {
    throw new RangeError("Date.prototype.toISOString called on non-finite value.");
  }

  year = this.getUTCFullYear();

  month = this.getUTCMonth();
  // see https://github.com/es-shims/es5-shim/issues/111
  year += Math.floor(month / 12);
  month = (month % 12 + 12) % 12;

  // the date time string format is specified in 15.9.1.15.
  result = [month + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds()];
  year = (
    (year < 0 ? "-" : (year > 9999 ? "+" : "")) +
    ("00000" + Math.abs(year)).slice(0 <= year && year <= 9999 ? -4 : -6)
  );

  length = result.length;
  while (length--) {
    value = result[length];
    // pad months, days, hours, minutes, and seconds to have two
    // digits.
    if (value < 10) {
      result[length] = "0" + value;
    }
  }
  // pad milliseconds to have three digits.
  return (
    year + "-" + result.slice(0, 2).join("-") +
    "T" + result.slice(2).join(":") + "." +
    ("000" + this.getUTCMilliseconds()).slice(-3) + "Z"
  );
};

// ES5 15.9.5.43
// http://es5.github.com/#x15.9.5.43
assignProperty(DatePrototype, "toISOString", module.exports, !IS_DATE_TO_ISO_STRING_WORKS_AS_EXPECTED);
