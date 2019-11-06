const { readFile } = require("../lib/utils/readFile");
const path = require("path");

describe("readFile", () => {
  it("should throw an error if file path is not provided", () => {
    expect(() => readFile()).toThrow();
  });

  it("should read file", async () => {
    const filePath = path.resolve(__dirname, "./files/chrome_bookmarks.html");
    const data = await readFile(filePath);
    expect(data).toHaveProperty("parser");
    expect(data).toHaveProperty("bookmarks");
  });
});
