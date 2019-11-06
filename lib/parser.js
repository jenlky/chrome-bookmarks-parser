const path = require("path");
const filePath = path.resolve(__dirname, "../bookmarks_10_31_19.html");
const { readFile } = require("./utils/readFile");

const data = readFile(filePath);
console.log(data);
