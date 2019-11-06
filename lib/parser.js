const fs = require("fs");
const parse = require("bookmarks-parser");
const path = "./bookmarks_10_31_19.html";

module.exports.readFile = path => {
  if (!path) throw "File path is required";

  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) throw err;

      parse(data, (err, res) => {
        console.log(res);

        while ("children" in res.bookmarks) {}
      });
    });
  });
};

exports.readFile(path);
