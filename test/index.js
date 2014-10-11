"use strict";

describe("holyfills", function() {
  before(function() {
    global.HAS_ARRAY_IS_ARRAY = false;
    global.HAS_FUNCTION_BIND = false;
    global.HAS_DESCRIPTORS_SUPPORT = false;
    global.IS_ARRAY_SPLICE_WORKS_AS_EXPECTED_FOR_NOOP_EMPTY_ARRAY = false;
    global.IS_ARRAY_SPLICE_WORKS_AS_EXPECTED_FOR_EMPTY_OBJECT = false;
    global.IS_ARRAY_SPLICE_WORKS_AS_EXPECTED = false;
    global.IS_ARRAY_UNSHIFT_WORKS_AS_EXPECTED = false;
    global.IS_ARRAY_FOREACH_WORKS_AS_EXPECTED = false,
    global.HAS_ARRAY_FOREACH = false;
    global.IS_ARRAY_MAP_WORKS_AS_EXPECTED = false;
    global.HAS_ARRAY_MAP = false;
    global.IS_ARRAY_FILTER_WORKS_AS_EXPECTED = false;
    global.HAS_ARRAY_FILTER = false;
    global.IS_ARRAY_EVERY_WORKS_AS_EXPECTED = false;
    global.HAS_ARRAY_EVERY = false;
    global.IS_ARRAY_SOME_WORKS_AS_EXPECTED = false;
    global.HAS_ARRAY_SOME = false;
    global.IS_ARRAY_REDUCE_WORKS_AS_EXPECTED = false;
    global.HAS_ARRAY_REDUCE = false;
    global.IS_ARRAY_REDUCE_RIGHT_WORKS_AS_EXPECTED = false;
    global.HAS_ARRAY_REDUCE_RIGHT = false;
    global.IS_ARRAY_INDEX_OF_WORKS_AS_EXPECTED = false;
    global.HAS_ARRAY_INDEX_OF = false;
    global.IS_ARRAY_LAST_INDEX_OF_WORKS_AS_EXPECTED = false;
    global.HAS_ARRAY_LAST_INDEX_OF = false;
    global.IS_OBJECT_KEYS_WORKS_AS_EXPECTED_FOR_ARGUMENTS = false;
    global.HAS_OBJECT_KEYS = false;
    global.IS_NUMBER_TO_FIXED_WORKS_AS_EXPECTED = false;
    global.HAS_NUMBER_TO_FIXED = false;
    global.IS_STRING_SPLIT_WORKS_AS_EXPECTED_FOR_REGEX = false;
    global.IS_STRING_SPLIT_WORKS_AS_EXPECTED_FOR_UNDEFINED = false;
    global.IS_STRING_SPLIT_WORKS_AS_EXPECTED = false;
    global.IS_STRING_REPLACE_WORKS_AS_EXPECTED = false;
    global.IS_STRING_SUBSTR_WORKS_AS_EXPECTED = false;
    global.IS_STRING_TRIM_WORKS_AS_EXPECTED = false;
    global.IS_PARSE_INT_WORKS_AS_EXPECTED = false;
  });
  require("./helpers");
  require("./array");
  require("./function");
  require("./object");
  require("./number");
  require("./string");
  require("./parseInt");
});
