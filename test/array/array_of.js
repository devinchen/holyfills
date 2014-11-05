"use strict";
var assert = require("assert"),
    assertDeepEquals = assert.deepEqual;

describe("constructor.of", function () {
  var testSubject,
      actual,
      array_of;

  before(function () {
    array_of = require("../../lib/array/array_of");
  });

  it("should return zero length when no input value", function () {
    array_of.length.should.equal(0);
  });

  it("should not support property", function () {
    array_of.propertyIsEnumerable("of").should.equal(false);
  });

  it("should return array instance", function () {
    assertDeepEquals(array_of("abc"), ["abc"]);
    assertDeepEquals(array_of(undefined), [undefined]);
    assertDeepEquals(array_of(null), [null]);
    assertDeepEquals(array_of(false), [false]);
    assertDeepEquals(array_of(-Infinity), [-Infinity]);
    assertDeepEquals(array_of(-0), [-0]);
    assertDeepEquals(array_of(+0), [+0]);
    assertDeepEquals(array_of(1), [1]);
    assertDeepEquals(array_of(1, 2, 3), [1, 2, 3]);
    assertDeepEquals(array_of(+Infinity), [+Infinity]);
    assertDeepEquals(array_of({ "0": "a", "1": "b", "2": "c", "length": 3 }), [{ "0": "a", "1": "b", "2": "c", "length": 3 }]);
    assertDeepEquals(array_of(undefined, null, false, -Infinity, -0, +0, 1, 2, +Infinity), [undefined, null, false, -Infinity, -0, +0, 1, 2, +Infinity]);
  });

  it("should skip non-existing values", function () {
    assertDeepEquals(array_of.call(null, "abc"), ["abc"]);
    assertDeepEquals(array_of.call(null, undefined), [undefined]);
    assertDeepEquals(array_of.call(null, null), [null]);
    assertDeepEquals(array_of.call(null, false), [false]);
    assertDeepEquals(array_of.call(null, -Infinity), [-Infinity]);
    assertDeepEquals(array_of.call(null, -0), [-0]);
    assertDeepEquals(array_of.call(null, +0), [+0]);
    assertDeepEquals(array_of.call(null, 1), [1]);
    assertDeepEquals(array_of.call(null, 1, 2, 3), [1, 2, 3]);
    assertDeepEquals(array_of.call(null, +Infinity), [+Infinity]);
    assertDeepEquals(array_of.call(null, { "0": "a", "1": "b", "2": "c", "length": 3 }), [{ "0": "a", "1": "b", "2": "c", "length": 3 }]);
    assertDeepEquals(array_of.call(null, undefined, null, false, -Infinity, -0, +0, 1, 2, +Infinity), [undefined, null, false, -Infinity, -0, +0, 1, 2, +Infinity]);
    assertDeepEquals(array_of.call(Object, 1, 2, 3), { "0": 1, "1": 2, "2": 3, "length": 3 });

    testSubject = Object(3); testSubject[0] = 1; testSubject[1] = 2; testSubject[2] = 3; testSubject.length = 3;
    assertDeepEquals(array_of.call(Object, 1, 2, 3), testSubject);
    array_of.call(Object).length.should.equal(0);
    (function() { array_of.call(function() { return Object.freeze({}); }); }).should.throw();
    assertDeepEquals(array_of(undefined, null, false, -Infinity, -0, +0, 1, 2, +Infinity), [undefined, null, false, -Infinity, -0, +0, 1, 2, +Infinity]);

    assertDeepEquals(array_of.apply(null, ["abc"]), ["abc"]);
    assertDeepEquals(array_of.apply(null, [undefined]), [undefined]);
    assertDeepEquals(array_of.apply(null, [null]), [null]);
    assertDeepEquals(array_of.apply(null, [false]), [false]);
    assertDeepEquals(array_of.apply(null, [-Infinity]), [-Infinity]);
    assertDeepEquals(array_of.apply(null, [-0]), [-0]);
    assertDeepEquals(array_of.apply(null, [+0]), [+0]);
    assertDeepEquals(array_of.apply(null, [1]), [1]);
    assertDeepEquals(array_of.apply(null, [1, 2, 3]), [1, 2, 3]);
    assertDeepEquals(array_of.apply(null, [+Infinity]), [+Infinity]);
    assertDeepEquals(array_of.apply(null, [{ "0": "a", "1": "b", "2": "c", "length": 3 }]), [{ "0": "a", "1": "b", "2": "c", "length": 3 }]);
    assertDeepEquals(array_of.apply(null, [undefined, null, false, -Infinity, -0, +0, 1, 2, +Infinity]), [undefined, null, false, -Infinity, -0, +0, 1, 2, +Infinity]);
    assertDeepEquals(array_of.apply(Object, [1, 2, 3]), { "0": 1, "1": 2, "2": 3, "length": 3 });

    testSubject = Object(3); testSubject[0] = 1; testSubject[1] = 2; testSubject[2] = 3; testSubject.length = 3;
    assertDeepEquals(array_of.apply(Object, [1, 2, 3]), testSubject);
    array_of.apply(Object).length.should.equal(0);
    (function() { array_of.apply(function() { return Object.freeze({}); }); }).should.throw();
  });

  it("should ensure no setters are called for the indexes", function () {
    var MyType = function() {};
      Object.defineProperty(MyType, "0", {
        "set": function(x) {
          throw Error("Setter called: " + x);
        }
    });
    assertDeepEquals(array_of.call(MyType, "abc"), { "0": "abc", "length": 1 });
  });
});
