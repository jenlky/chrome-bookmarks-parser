const fs = require("fs");
const parse = require("bookmarks-parser");

module.exports.readFile = filePath => {
  if (!filePath) throw "File path is required";

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) throw err;

      return parse(data, (err, res) => {
        if (err) throw err;
        resolve(res);
      });
    });
  });
};
