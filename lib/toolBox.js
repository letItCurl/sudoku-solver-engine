function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const _ = require('underscore');

const {
  grid
} = require('./sudokuData');

const Sudoku = require('./sudoku');

class ToolBox {
  constructor() {
    _defineProperty(this, "copy", function (data) {
      return new Sudoku(JSON.parse(JSON.stringify(data)));
    });

    _defineProperty(this, "returnData", function (data) {
      return JSON.parse(JSON.stringify(data));
    });

    _defineProperty(this, "replaceRow", function (obj, y) {
      obj.grid[y] = ["x", "x", "x", "x", "x", "x", "x", "x"];
    });

    _defineProperty(this, "replaceCol", function (obj, x) {
      for (let scanY = 0; scanY < 9; scanY++) {
        obj.grid[scanY][x] = "x";
      }
    });

    _defineProperty(this, "canWePlace", function (area) {
      var str = area.join().replace(/,|x|1|6|2|3|4|5|6|7|8|9/g, "");

      if (str === "0") {
        return true;
      }
    });

    _defineProperty(this, "hideImpossibilities", function (refSudoku, n) {
      for (let scanX = 0; scanX < 9; scanX++) {
        for (let scanY = 0; scanY < 9; scanY++) {
          if (refSudoku.grid[scanY][scanX] === n) {
            this.replaceCol(refSudoku, scanX);
            this.replaceRow(refSudoku, scanY);
            refSudoku.grid[scanY][scanX] = "#";
          }
        }
      }
    });

    _defineProperty(this, "writeLogsToFile", function (obj, name) {
      var fs = require("fs");

      fs.writeFile(`./src/outputs/json/${name}.json`, JSON.stringify(obj), err => {
        if (err) {
          console.error(err);
          return;
        }

        ;
        console.log("File ./src/outputs/json/" + name + ".json has been created");
      });
    });
  }

}

module.exports = ToolBox;