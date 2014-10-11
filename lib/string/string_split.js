"use strict";
var assignProperty = require("../helpers/assignProperty");
var StringPrototype = require("../helpers/StringPrototype");
var isRegex = require("../helpers/isRegex");
var toUint32 = require("../helpers/toUint32");
var ArrayPrototype = require("../helpers/ArrayPrototype");

var string_split = StringPrototype.split;// Native, don't modify
if (!IS_STRING_SPLIT_WORKS_AS_EXPECTED_FOR_REGEX) {
// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
// Many browsers do not split properly with regular expressions or they
// do not perform the split correctly under obscure conditions.
// See http://blog.stevenlevithan.com/archives/cross-browser-split
// I've tested in many browsers and this seems to cover the deviant ones:
//    "ab".split(/(?:ab)*/) should be ["", ""], not [""]
//    ".".split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
//    "tesst".split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
//       [undefined, "t", undefined, "e", ...]
//    "".split(/.?/) should be [], not [""]
//    ".".split(/()()/) should be ["."], not ["", "", "."]
//
  var compliantExecNpcg = /()??/.exec("")[1] === void 0; // NPCG: nonparticipating capturing group

  module.exports = function (separator, limit) {
    var string = this;
    if (separator === void 0 && limit === 0) {
      return [];
    }

    // If `separator` is not a regex, use native split
    if (!isRegex(separator)) {
      return string_split.call(this, separator, limit);
    }

    var output = [],
        flags = (separator.ignoreCase ? "i" : "") +
                (separator.multiline  ? "m" : "") +
                (separator.extended   ? "x" : "") + // Proposed for ES6
                (separator.sticky     ? "y" : ""), // Firefox 3+
        lastLastIndex = 0,
        // Make `global` and avoid `lastIndex` issues by working with a copy
        separator2, match, lastIndex, lastLength;
    separator = new RegExp(separator.source, flags + "g");
    string += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn"t need flags gy, but they don"t hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = toUint32(
      limit === void 0 ?
      -1 : // Math.pow(2, 32) - 1
      limit
    );
    while (match = separator.exec(string)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(string.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don"t consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function () {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === void 0) {
                match[i] = void 0;
              }
            }
          });
        }
        if (match.length > 1 && match.index < string.length) {
          ArrayPrototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === string.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(string.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  };
} else if (!IS_STRING_SPLIT_WORKS_AS_EXPECTED_FOR_UNDEFINED) {
// [bugfix, chrome]
// If separator is undefined, then the result array contains just one String,
// which is the this value (converted to a String). If limit is not undefined,
// then the output array is truncated so that it contains no more than limit
// elements.
// "0".split(undefined, 0) -> []
//
  module.exports = function (separator, limit) {
    if (separator === void 0 && limit === 0) { return []; }
    return string_split.call(this, separator, limit);
  };
} else {
  module.exports = string_split;
}

// ES5 15.5.4.14
// http://es5.github.com/#x15.5.4.14
assignProperty(StringPrototype, "split", module.exports, !IS_STRING_SPLIT_WORKS_AS_EXPECTED);
