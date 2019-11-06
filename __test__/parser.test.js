const { readFile } = require("../lib/parser");

describe("readFile", () => {
  it("should throw an error if file path is not provided", () => {
    expect(() => readFile()).toThrow();
  });
});
