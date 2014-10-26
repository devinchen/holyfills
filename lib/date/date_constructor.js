"use strict";

var isoDateExprString = "^" +
  "(\\d{4}|[+-]\\d{6})" + // four-digit year capture or sign +
                // 6-digit extended year
  "(?:-(\\d{2})" + // optional month capture
  "(?:-(\\d{2})" + // optional day capture
  "(?:" + // capture hours:minutes:seconds.milliseconds
    "T(\\d{2})" + // hours capture
    ":(\\d{2})" + // minutes capture
    "(?:" + // optional :seconds.milliseconds
      ":(\\d{2})" + // seconds capture
      "(?:(\\.\\d{1,}))?" + // milliseconds capture
    ")?" +
  "(" + // capture UTC offset component
    "Z|" + // UTC capture
    "(?:" + // offset specifier +/-hours:minutes
      "([-+])" + // sign capture
      "(\\d{2})" + // hours offset capture
      ":(\\d{2})" + // minutes offset capture
    ")" +
  ")?)?)?)?" +
"$";

if (!IS_DATE_CONSTRUCTOR_WORKS_AS_EXPECTED) {
  // ES5 15.9.4.2
  // http://es5.github.com/#x15.9.4.2
  // based on work shared by Daniel Friesen (dantman)
  // http://gist.github.com/303249
  // XXX global assignment won't work in embeddings that use
  // an alternate object for the context.
  /* jshint -W020 */
  Date = (function (NativeDate) {
    // 15.9.1.15 Date Time String Format.
    var isoDateExpression = new RegExp(isoDateExprString),
        months = [
          0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365
        ],
        key;

    // Copy any custom methods a 3rd party library may have added
    /* jshint -W089 */
    for (key in NativeDate) {
      Date[key] = NativeDate[key];
    }

    // Copy "native" methods explicitly; they may be non-enumerable
    Date.now = NativeDate.now;
    Date.UTC = NativeDate.UTC;
    Date.prototype = NativeDate.prototype;
    Date.prototype.constructor = Date;

    // Upgrade Date.parse to handle simplified ISO 8601 strings
    Date.parse = parse;

    return Date;

    /* jshint -W004 */
    function Date (Y, M, D, h, m, s, ms) {// Date.length === 7
      var length = arguments.length,
          date;
      if (this instanceof NativeDate) {
        date = 1 === length && String(Y) === Y ? // isString(Y)
          // We explicitly pass it through parse:
          new NativeDate(Date.parse(Y)) :
          // We have to manually make calls depending on argument
          // length here
          7 <= length ? new NativeDate(Y, M, D, h, m, s, ms) :
          6 <= length ? new NativeDate(Y, M, D, h, m, s) :
          5 <= length ? new NativeDate(Y, M, D, h, m) :
          4 <= length ? new NativeDate(Y, M, D, h) :
          3 <= length ? new NativeDate(Y, M, D) :
          2 <= length ? new NativeDate(Y, M) :
          1 <= length ? new NativeDate(Y) :
                  new NativeDate();
        // Prevent mixups with unfixed Date object
        date.constructor = Date;
        return date;
      }
      return NativeDate.apply(this, arguments);
    }

    function dayFromMonth (year, month) {
      var t = 1 < month ? 1 : 0;
      return (
        months[month] +
        Math.floor((year - 1969 + t) / 4) -
        Math.floor((year - 1901 + t) / 100) +
        Math.floor((year - 1601 + t) / 400) +
        365 * (year - 1970)
      );
    }

    function toUTC (t) {
      return Number(new NativeDate(1970, 0, 1, 0, 0, 0, t));
    }

    function parse (string) {
      var match = isoDateExpression.exec(string),
          year,
          month,
          day,
          hour,
          minute,
          second,
          millisecond,
          isLocalTime,
          signOffset,
          hourOffset,
          minuteOffset,
          result;
      if (match) {
        // parse months, days, hours, minutes, seconds, and milliseconds
        // provide default values if necessary
        // parse the UTC offset component
        year = Number(match[1]);
        month = Number(match[2] || 1) - 1;
        day = Number(match[3] || 1) - 1;
        hour = Number(match[4] || 0);
        minute = Number(match[5] || 0);
        second = Number(match[6] || 0);
        millisecond = Math.floor(Number(match[7] || 0) * 1000);
        // When time zone is missed, local offset should be used
        // (ES 5.1 bug)
        // see https://bugs.ecmascript.org/show_bug.cgi?id=112
        isLocalTime = Boolean(match[4] && !match[8]);
        signOffset = "-" === match[9] ? 1 : -1;
        hourOffset = Number(match[10] || 0);
        minuteOffset = Number(match[11] || 0);
        if (
          hour < (
            0 < minute || 0 < second || 0 < millisecond ?
            24 : 25
          ) &&
          60 > minute && 60 > second && 1000 > millisecond &&
          -1 < month && 12 > month && 24 > hourOffset &&
          60 > minuteOffset && // detect invalid offsets
          -1 < day &&
          day < (
            dayFromMonth(year, month + 1) -
            dayFromMonth(year, month)
          )
        ) {
          result = (
            (dayFromMonth(year, month) + day) * 24 +
            hour +
            hourOffset * signOffset
          ) * 60;
          result = (
            (result + minute + minuteOffset * signOffset) * 60 +
            second
          ) * 1000 + millisecond;
          if (isLocalTime) {
            result = toUTC(result);
          }
          if (-8.64e15 <= result && 8.64e15 >= result) {
            return result;
          }
        }
        return NaN;
      }
      /* jshint -W040 */
      return NativeDate.parse.apply(this, arguments);
    }
  })(Date);
}

module.exports = Date;
