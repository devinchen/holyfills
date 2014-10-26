"use strict";
var assignProperty = require("../helpers/assignProperty"),
    StringPrototype = require("../helpers/StringPrototype"),
    isFunction = require("../helpers/isFunction"),
    isRegex = require("../helpers/isRegex"),

    string_replace = StringPrototype.replace;// Native, don't modify

module.exports = IS_STRING_REPLACE_WORKS_AS_EXPECTED ? string_replace : function (searchValue, replaceValue) {
  var isFn = isFunction(replaceValue),
      hasCapturingGroups = isRegex(searchValue) && (/\)[*?]/).test(searchValue.source),
      wrappedReplaceValue;

  if (!isFn || !hasCapturingGroups) {
    return string_replace.call(this, searchValue, replaceValue);
  } else {
    wrappedReplaceValue = function (match) {
      var length = arguments.length,
          originalLastIndex = searchValue.lastIndex,
          args;

      searchValue.lastIndex = 0;
      args = searchValue.exec(match) || [];
      searchValue.lastIndex = originalLastIndex;
      args.push(arguments[length - 2], arguments[length - 1]);
      return replaceValue.apply(this, args);
    };
    return string_replace.call(this, searchValue, wrappedReplaceValue);
  }
};

assignProperty(StringPrototype, "replace", module.exports, !IS_STRING_REPLACE_WORKS_AS_EXPECTED);
