"use strict";
var assignProperty = require("../helpers/assignProperty"),
    FunctionPrototype = require("../helpers/FunctionPrototype"),
    isFunction = require("../helpers/isFunction"),
    array_slice = require("../helpers/array_slice");

function Empty () {}

module.exports = HAS_FUNCTION_BIND ? FunctionPrototype.bind : function (that) { // .length is 1
  // 1. Let Target be the this value.
  var target = this,
      args,
      binder,
      boundLength,
      boundArgs,
      i,
      bound;
  // 2. If IsCallable(Target) is false, throw a TypeError exception.
  if (!isFunction(target)) {
    throw new TypeError("Function.prototype.bind called on incompatible " + target);
  }
  // 3. Let A be a new (possibly empty) internal list of all of the
  //   argument values provided after thisArg (arg1, arg2 etc), in order.
  // XXX slicedArgs will stand in for "A" if used
  args = array_slice.call(arguments, 1); // for normal call
  // 4. Let F be a new native ECMAScript object.
  // 11. Set the [[Prototype]] internal property of F to the standard
  //   built-in Function prototype object as specified in 15.3.3.1.
  // 12. Set the [[Call]] internal property of F as described in
  //   15.3.4.5.1.
  // 13. Set the [[Construct]] internal property of F as described in
  //   15.3.4.5.2.
  // 14. Set the [[HasInstance]] internal property of F as described in
  //   15.3.4.5.3.
  binder = function () {
    var result;
    if (this instanceof bound) {
      // 15.3.4.5.2 [[Construct]]
      // When the [[Construct]] internal method of a function object,
      // F that was created using the bind function is called with a
      // list of arguments ExtraArgs, the following steps are taken:
      // 1. Let target be the value of F"s [[TargetFunction]]
      //   internal property.
      // 2. If target has no [[Construct]] internal method, a
      //   TypeError exception is thrown.
      // 3. Let boundArgs be the value of F"s [[BoundArgs]] internal
      //   property.
      // 4. Let args be a new list containing the same values as the
      //   list boundArgs in the same order followed by the same
      //   values as the list ExtraArgs in the same order.
      // 5. Return the result of calling the [[Construct]] internal
      //   method of target providing args as the arguments.

      result = target.apply(
        this,
        args.concat(array_slice.call(arguments))
      );
      if (Object(result) === result) {
        return result;
      }
      return this;

    } else {
      // 15.3.4.5.1 [[Call]]
      // When the [[Call]] internal method of a function object, F,
      // which was created using the bind function is called with a
      // this value and a list of arguments ExtraArgs, the following
      // steps are taken:
      // 1. Let boundArgs be the value of F"s [[BoundArgs]] internal
      //   property.
      // 2. Let boundThis be the value of F"s [[BoundThis]] internal
      //   property.
      // 3. Let target be the value of F"s [[TargetFunction]] internal
      //   property.
      // 4. Let args be a new list containing the same values as the
      //   list boundArgs in the same order followed by the same
      //   values as the list ExtraArgs in the same order.
      // 5. Return the result of calling the [[Call]] internal method
      //   of target providing boundThis as the this value and
      //   providing args as the arguments.

      // equiv: target.call(this, ...boundArgs, ...args)
      return target.apply(
        that,
        args.concat(array_slice.call(arguments))
      );

    }

  };

  // 15. If the [[Class]] internal property of Target is "Function", then
  //     a. Let L be the length property of Target minus the length of A.
  //     b. Set the length own property of F to either 0 or L, whichever is
  //       larger.
  // 16. Else set the length own property of F to 0.

  boundLength = Math.max(0, target.length - args.length);

  // 17. Set the attributes of the length own property of F to the values
  //   specified in 15.3.5.1.
  boundArgs = [];
  for (i = 0; i < boundLength; i += 1) {
    boundArgs.push("$" + i);
  }

  // XXX Build a dynamic function with desired amount of arguments is the only
  // way to set the length property of a function.
  // In environments where Content Security Policies enabled (Chrome extensions,
  // for ex.) all use of eval or Function costructor throws an exception.
  // However in all of these environments Function.prototype.bind exists
  // and so this code will never be executed.
  /* jshint -W054 */
  bound = new Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this, arguments); }")(binder);

  if (target.prototype) {
    Empty.prototype = target.prototype;
    bound.prototype = new Empty();
    // Clean up dangling references.
    Empty.prototype = null;
  }

  // TODO
  // 18. Set the [[Extensible]] internal property of F to true.

  // TODO
  // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
  // 20. Call the [[DefineOwnProperty]] internal method of F with
  //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
  //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
  //   false.
  // 21. Call the [[DefineOwnProperty]] internal method of F with
  //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
  //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
  //   and false.

  // TODO
  // NOTE Function objects created using Function.prototype.bind do not
  // have a prototype property or the [[Code]], [[FormalParameters]], and
  // [[Scope]] internal properties.
  // XXX can"t delete prototype in pure-js.

  // 22. Return F.
  return bound;
};

// ES-5 15.3.4.5
// http://es5.github.com/#x15.3.4.5
assignProperty(FunctionPrototype, "bind", module.exports);
