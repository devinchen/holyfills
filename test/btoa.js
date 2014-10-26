"use strict";

describe("btoa", function() {
  var btoa;

  before(function() {
    btoa = require("../lib/btoa");
  });

  it("can encode ASCII input", function() {
    btoa("").should.equal("");
    btoa("f").should.equal("Zg==");
    btoa("fo").should.equal("Zm8=");
    btoa("foo").should.equal("Zm9v");
    btoa("quux").should.equal("cXV1eA==");
    btoa("!\"#$%").should.equal("ISIjJCU=");
    btoa("&'()*+").should.equal("JicoKSor");
    btoa(",-./012").should.equal("LC0uLzAxMg==");
    btoa("3456789:").should.equal("MzQ1Njc4OTo=");
    btoa(";<=>?@ABC").should.equal("Ozw9Pj9AQUJD");
    btoa("DEFGHIJKLM").should.equal("REVGR0hJSktMTQ==");
    btoa("NOPQRSTUVWX").should.equal("Tk9QUVJTVFVWV1g=");
    btoa("YZ[\\]^_`abc").should.equal("WVpbXF1eX2BhYmM=");
    btoa("defghijklmnop").should.equal("ZGVmZ2hpamtsbW5vcA==");
    btoa("qrstuvwxyz{|}~").should.equal("cXJzdHV2d3h5ent8fX4=");
  });

  it("should throw error for non object", function () {
    (function () {
      btoa("✈");
    }).should.throw();
  });

  it("coerces input", function() {
    btoa(42).should.equal(btoa("42"));
    btoa(null).should.equal(btoa("null"));
    btoa({x: 1}).should.equal(btoa("[object Object]"));
  });
});
