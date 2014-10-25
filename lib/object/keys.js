"use strict";
var assignProperty = require("../helpers/assignProperty");
var isFunction = require("../helpers/isFunction");
var isArguments = require("../helpers/isArguments");
var isString = require("../helpers/isString");
var owns = require("../helpers/owns");
var array_slice = require("../helpers/array_slice");

var hasDontEnumBug = !({"toString": null}).propertyIsEnumerable("toString");
/* jshint -W068 */
var hasProtoEnumBug = (function () {}).propertyIsEnumerable("prototype");
var dontEnums = [
      "toString",
      "toLocaleString",
      "valueOf",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "constructor"
    ];
var dontEnumsLength = dontEnums.length;

// http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
var originalKeys = HAS_OBJECT_KEYS ? Object.keys : function (object) {
  var isFn = isFunction(object),
      isArgs = isArguments(object),
      isObject = null !== object && "object" === typeof object,
      isStr = isObject && isString(object);

  if (!isObject && !isFn && !isArgs) {
    throw new TypeError("Object.keys called on a non-object");
  }

  var theKeys = [],
      skipProto = hasProtoEnumBug && isFn;
  if (isStr || isArgs) {
    for (var i = 0; i < object.length; i += 1) {
      theKeys.push(String(i));
    }
  } else {
    for (var name in object) {
      if (!(skipProto && "prototype" === name) && owns(object, name)) {
        theKeys.push(String(name));
      }
    }
  }

  if (hasDontEnumBug) {
    var ctor = object.constructor,
        skipConstructor = ctor && object === ctor.prototype,
        dontEnum;

    for (var j = 0; j < dontEnumsLength; j += 1) {
      dontEnum = dontEnums[j];
      if (!(skipConstructor && "constructor" === dontEnum) && owns(object, dontEnum)) {
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
