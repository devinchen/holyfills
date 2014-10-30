"use strict";
// base64 encoder

/* jshint -W117 */
module.exports = HAS_BTOA ? btoa : function (input) {
  /* jshint -W016 */
  var chars = require("./helpers/characters"),
      str = String(input),
      block,
      charCode,
      idx,
      map = chars,
      output = "";

  for (
    // initialize result and counter
    idx = 0;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = "=", idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (0xFF < charCode) {
      throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
    }
    block = block << 8 | charCode;
  }
  return output;
};
