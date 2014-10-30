"use strict";

describe("atob", function() {
  var atob;

  before(function() {
    atob = require("../lib/atob");
  });

  it("can encode ASCII input", function() {
    atob("").should.equal("");
    atob("Zg==").should.equal("f");
    atob("Zm8").should.equal("=fo");
    atob("Zm9v").should.equal("foo");
    atob("cXV1eA==").should.equal("quux");
    atob("ISIjJCU=").should.equal("!\"#$%");
    atob("JicoKSor").should.equal("&'()*+");
    atob("LC0uLzAxMg==").should.equal(",-./012");
    atob("MzQ1Njc4OTo=").should.equal("3456789:");
    atob("Ozw9Pj9AQUJD").should.equal(";<=>?@ABC");
    atob("REVGR0hJSktMTQ==").should.equal("DEFGHIJKLM");
    atob("Tk9QUVJTVFVWV1g=").should.equal("NOPQRSTUVWX");
    atob("WVpbXF1eX2BhYmM=").should.equal("YZ[\\]^_`abc");
    atob("ZGVmZ2hpamtsbW5vcA==").should.equal("defghijklmnop");
    atob("cXJzdHV2d3h5ent8fX4=").should.equal("qrstuvwxyz{|}~");
  });

  it("should throw error for non object", function () {
    (function () {
      atob("a");
    }).should.throw();
  });

  it("coerces input", function() {
    atob(42).should.equal(atob("42"));
    atob(null).should.equal(atob("null"));
  });
});
