"use strict";

describe("prototype.constructor", function () {
  before(function() {
    require("../../lib/date/date_constructor");
  });

  it("should be a polyfill", function () {
    Date.toString().should.not.containEql("[native code]");
  });

  it("works with standard formats", function () {                           //Chrome 19     Opera 12      Firefox 11    IE 9          Safari 5.1.1
    (+new Date("2012-12-31T23:59:59.000Z")).should.equal(1356998399000);    //1356998399000 1356998399000 1356998399000 1356998399000 1356998399000
    (+new Date("2012-04-04T05:02:02.170Z")).should.equal(1333515722170);    //1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
    (+new Date("2012-04-04T05:02:02.170999Z")).should.equal(1333515722170); //1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
    (+new Date("2012-04-04T05:02:02.17Z")).should.equal(1333515722170);     //1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
    (+new Date("2012-04-04T05:02:02.1Z")).should.equal(1333515722100);      //1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
    (+new Date("2012-04-04T24:00:00.000Z")).should.equal(1333584000000);    //NaN           1333584000000 1333584000000 1333584000000 1333584000000
    (+new Date("2012-02-29T12:00:00.000Z")).should.equal(1330516800000);    //1330516800000 1330516800000 1330516800000 1330516800000 1330516800000
    (+new Date("2011-03-01T12:00:00.000Z")).should.equal(1298980800000);    //1298980800000 1298980800000 1298980800000 1298980800000 1298980800000

    // https://github.com/es-shims/es5-shim/issues/80 Safari bug with leap day
    (new Date("2034-03-01T00:00:00.000Z") -
          new Date("2034-02-27T23:59:59.999Z")).should.equal(86400001);     //86400001      86400001       86400001       86400001      1
  });

  it("should support extended years", function () {
    (+new Date("+275760-09-13T00:00:00.000Z")).should.equal(8.64e15);
    (+new Date("-000001-01-01T00:00:00Z")).should.equal(-62198755200000);
  });
});
