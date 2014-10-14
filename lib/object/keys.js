"use strict";
var assignProperty = require("../helpers/assignProperty"),
    isFunction = require("../helpers/isFunction"),
    isArguments = require("../helpers/isArguments"),
    isString = require("../helpers/isString"),
    owns = require("../helpers/owns"),
    array_slice = require("../helpers/array_slice"),

    hasDontEnumBug = !({"toString": null}).propertyIsEnumerable("toString"),
    /* jshint -W068 */
    hasProtoEnumBug = (function () {}).propertyIsEnumerable("prototype"),
    dontEnums = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor"
    ],
    dontEnumsLength = dontEnums.length;

// http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
var originalKeys = HAS_OBJECT_KEYS ? Object.keys : function (object) {
  var isFn = isFunction(object),
      isArgs = isArguments(object),
      isObject = object !== null && typeof object === "object",
      isStr = isObject && isString(object),
      theKeys = [],
      skipProto = hasProtoEnumBug && isFn,
      i = 0,
      name,
      ctor,
      skipConstructor,
      j = 0,
      dontEnum;

  if (!isObject && !isFn && !isArgs) {
    throw new TypeError("Object.keys called on a non-object");
  }

  if (isStr || isArgs) {
    for (; i < object.length; i += 1) {
      theKeys.push(String(i));
    }
  } else {
    for (name in object) {
      if (!(skipProto && name === "prototype") && owns(object, name)) {
        theKeys.push(String(name));
      }
    }
  }

  if (hasDontEnumBug) {
    ctor = object.constructor;
    skipConstructor = ctor && object === ctor.prototype;

    for (; j < dontEnumsLength; j += 1) {
      dontEnum = dontEnums[j];
      if (!(skipConstructor && dontEnum === "constructor") && owns(object, dontEnum)) {
        theKeys.push(dontEnum);
      }
    }
  }
  return theKeys;
};

module.exports = IS_OBJECT_KEYS_WORKS_AS_EXPECTED_FOR_ARGUMENTS ? originalKeys : function (object) {
  if (isArguments(object)) {
    return originalKeys(array_slice.call(object));
  } else {
    return originalKeys(object);
  }
};

// ES5 15.2.3.14
// http://es5.github.com/#x15.2.3.14
assignProperty(Object, "keys", module.exports, !IS_OBJECT_KEYS_WORKS_AS_EXPECTED_FOR_ARGUMENTS);
