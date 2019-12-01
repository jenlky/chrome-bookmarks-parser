const { parser } = require("../lib/parser");
const path = require("path");

parser(
  path.resolve(__dirname, "../bookmarks_12_1_19.html"),
  path.resolve(__dirname, "../bookmarks.txt")
);
