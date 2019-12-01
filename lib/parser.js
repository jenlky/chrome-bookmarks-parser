const path = require("path");
const { readFile } = require("./utils/readFile");
const fs = require("fs");

const writeRecursively = (stream, bookmark) => {
  try {
    if (bookmark.type === "bookmark") {
      stream.write(bookmark.url + " | " + bookmark.title + "\n");
    } else if (("children" in bookmark) & (bookmark.children.length > 0)) {
      for (child of bookmark.children) {
        return writeRecursively(stream, child);
      }
    }
    // return writeRecursively(stream, bookmark);
  } catch (error) {
    console.log(error);
  }
};

const parser = async (filePath, writeToPath) => {
  const data = await readFile(filePath);
  const stream = fs.createWriteStream(writeToPath, { flags: "w" });
  console.log("data", data);
  console.log("data.bookmarks", data.bookmarks);

  for (let bookmark of data.bookmarks) {
    console.log("bookmark", bookmark);
    return writeRecursively(stream, bookmark);
  }
};

module.exports = {
  parser
};
