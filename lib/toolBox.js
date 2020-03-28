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

    _defineProperty(this, "scanAreaAndReplaceZero", function (ref, obj, center, val, msg) {
      for (let i = center[0] - 1; i < center[0] + 2; i++) {
        for (let j = center[1] - 1; j < center[1] + 2; j++) {
          if (ref.grid[j][i] === 0) {
            obj.grid[j][i] = val; //console.log("REPLACEMENT".green+" @: "+i+" "+j)

            msg.push(`--->POS REPLACED: ${i},${i}`);
          } else {//console.log("NOT REPLACED".yellow + ref.grid[j][i])
          }
        }
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