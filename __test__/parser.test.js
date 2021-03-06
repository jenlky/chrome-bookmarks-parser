const { parser } = require("../lib/parser");
const path = require("path");
const fs = require("fs");
const readline = require("readline");

const data = {
  parser: "netscape",
  bookmarks: [
    {
      type: "folder",
      title: "Bookmarks Bar",
      add_date: "1512058172",
      last_modified: "1522775181",
      ns_root: "toolbar",
      children: [
        {
          type: "folder",
          title: "Bookmarks Bar",
          add_date: "1512058172",
          last_modified: "1522775181",
          ns_root: "toolbar",
          children: [
            {
              type: "bookmark",
              url: "http://yahoo.com/",
              title: "First level bookmarks bar bookmark",
              add_date: "1522775169"
            },
            {
              type: "folder",
              title: "First level bookmark bar folder",
              add_date: "1522775181",
              last_modified: "1522775193",
              ns_root: null,
              children: [Array]
            }
          ]
        }
      ]
    },
    {
      title: "Menu",
      children: [
        {
          type: "folder",
          title: "First level other bookmarks folder",
          add_date: "1522775208",
          last_modified: "1522775257",
          ns_root: null,
          children: [Array]
        },
        {
          type: "bookmark",
          url: "http://reddit.com/",
          title: "First\n                level other bookmarks bookmark",
          add_date: "1522775228",
          icon:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACdUlEQVQ4jWXTTYjVdRTG8c/5/e+945hNMhKUIBXVQBlYTSA6I2Z6w52bEJFyI4YiCbWrNm3SVRHUoheCCqLQVjFBiETW9CYlBtGqAROsJocaydS5L//T4k5qdDZncXiec+A834AkgoRs24i90gRuEhKz0rTi1Tjqs2s1YbFyrRHXOyTsVgyp/x0gUAV1Lkhv6Ho6PnUBIgnjRow6oqGtK1Gj4Optl7NWFMNC38cu2R5f+KsRZN7gkIa2no7QkKrB9kiPPEVmWH5j5c77agd3dl34Y6thz+NAyS0mVXbr6YtoEEVVUh1p+WhoDYept9Ls6dRZKGjoqYXHc7N1kW3vKXao9S0oAj2hg7XrWDXGu2/TQkNqYolaqNTeaUgTUuoJt43R7YSx+9m0k1tXU/dYs4nj7/PTqdAcSr/+HJoSk/LhspAbZB5YX+ff5zPPz2XW/fxf9XuZc2cz589l7huvc4PMdukUV/6Ygz6ygpefYN8D9Hv0Ouwd581nWLGS5hCluiIrsp61NNK3X6VvPkr9PvdM0N5F1aDRYmIbt9w9MDx5LJ06kZZKWZ8p0udKhCJ9/aGsKh7ayb0bmf+d+XOs30b7MVk1ODE1iFeJEKar5243q85HNaOY+UFEhLHxNHc2zHzPb6cZvi6NjIojL4TDL6aWUGdHz/6A3OwVQ/br6Lis4a41xYPb08o7BjH+ZSYc/4AfT9Za+lqaul6KY54cRHnCMsMOa9qqH+lS1jpC04CVrtSShqOoMnRNKXY46uJVmFZb5mYHhT2qsoSgXiSqlAFVvfoSXvOnZ+M7Fy1y9l+ct5jEHkxi1aL/GWFa3+vxiS+v1fwDhn4cQ7msNN8AAAAASUVORK5CYII="
        }
      ],
      ns_root: "menu"
    }
  ]
};

describe("parser", () => {
  // test shouldn't pass
  it("should write text", async () => {
    const textPath = path.resolve(__dirname, "./files/chrome_bookmarks.txt");

    await parser(
      path.resolve(__dirname, "./files/chrome_bookmarks.html"),
      textPath
    );

    const readInterface = readline.createInterface({
      input: fs.createReadStream(textPath),
      output: process.stdout
    });

    const data = [
      "http://yahoo.com/ | First level bookmarks bar bookmark",
      "http://bing.com/ | Second level bookmarks bar bookmark",
      "http://msn.com/ | Second level other bookmarks bookmark",
      "http://reddit.com/ | First level other bookmarks bookmark"
    ];

    let x = 0;
    for await (const line of readInterface) {
      expect(line).toBe(data[x]);
      x++;
    }
  });
});
