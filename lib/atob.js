"use strict";
// base64 decoder

/* jshint -W117 */
module.exports = HAS_ATOB ? atob : function (input) {
  /* jshint -W016 */
  var chars = require("./helpers/characters"),
      str = String(input).replace(/=+$/, ""),
      bc,
      bs,
      buffer,
      idx,
      output;

  if (1 === str.length % 4) {
    throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (
    // initialize result and counters
    bc = 0, idx = 0, output = "", buffer = str.charAt(idx);
    /* jshint -W052 */
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0;
    // get next character
    idx += 1
  ) {
    // try to find character in table (0-63, not found => -1)
    buffer = chars.indexOf(buffer);
  }
  return output;
};
