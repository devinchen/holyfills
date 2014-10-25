// Check failure of by-index access of string characters (IE < 9)
// and failure of `0 in boxedString` (Rhino)
var boxedString = Object("a");
module.exports = "a" !== boxedString[0] || !(0 in boxedString);
