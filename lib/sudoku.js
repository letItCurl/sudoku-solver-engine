function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const colors = require('colors');

const {
  checkCol,
  checkRow,
  checkArea
} = require('./rules');

class Sudoku {
  constructor(grid) {
    _defineProperty(this, "displayGrid", function (title) {
      if (title) {
        console.log(title.red.bold);
      } else {
        console.log("All sudoku".red.bold);
      }

      console.log("+-----------+".red.bold);

      for (let x = 0; x < 9; x++) {
        var str = this.grid[x].join().replace(/,/g, "");
        str = "|".red.bold + str.slice(0, 3) + "|".red.bold + str.slice(3, 6) + "|".red.bold + str.slice(-3) + "|".red.bold;
        console.log(str);

        if (x === 2) {
          console.log("|-----------|".red.bold);
        }

        if (x === 5) {
          console.log("|-----------|".red.bold);
        }
      }

      console.log("+-----------+".red.bold);
    });

    _defineProperty(this, "displayRow", function (x) {
      console.log(`row@${x}:`.red.bold);
      console.log(`${this.grid[x].join().replace(/,/g, " ").yellow}`);
    });

    _defineProperty(this, "displayCol", function (y) {
      console.log(`col@${y}: `.red.bold);

      for (let x = 0; x < 9; x++) {
        if (x === 0) {
          console.log(`${this.grid[x][y]}`.yellow);
        } else {
          console.log(`${this.grid[x][y]}`.yellow);
        }
      }
    });

    _defineProperty(this, "displayCross", function (x, y) {
      var space = "";
      console.log(`cross@${x},${y}: `.red.bold);

      for (let i = 0; i < y; i++) {
        space = `${space}  `;
      }

      for (let scanX = 0; scanX < 9; scanX++) {
        if (scanX === x) {
          console.log(this.grid[x].join().replace(/,/g, " ").yellow);
        } else {
          console.log(space + `${this.grid[scanX][y]}`.yellow);
        }
      }
    });

    _defineProperty(this, "getRow", function (x) {
      return this.grid[x];
    });

    _defineProperty(this, "getCol", function (y) {
      var col = [];

      for (let x = 0; x < 9; x++) {
        col.push(this.grid[x][y]);
      }

      return col;
    });

    _defineProperty(this, "getArea", function (x, y) {
      var area = [];

      if (x >= 0 && x < 3) {
        if (y >= 0 && y < 3) {
          for (let i = 0; i >= 0 && i < 3; i++) {
            for (let j = 0; j >= 0 && j < 3; j++) {
              area.push(this.grid[i][j]);
            }
          }

          return area;
        } else if (y >= 3 && y < 6) {
          for (let i = 0; i >= 0 && i < 3; i++) {
            for (let j = 3; j >= 3 && j < 6; j++) {
              area.push(this.grid[j][i]);
            }
          }

          return area;
        } else {
          for (let i = 0; i >= 0 && i < 3; i++) {
            for (let j = 6; j >= 6 && j < 9; j++) {
              area.push(this.grid[j][i]);
            }
          }

          return area;
        }
      }

      if (x >= 3 && x < 6) {
        if (y >= 0 && y < 3) {
          for (let i = 3; i >= 3 && i < 6; i++) {
            for (let j = 0; j >= 0 && j < 3; j++) {
              area.push(this.grid[j][i]);
            }
          }

          return area;
        } else if (y >= 3 && y < 6) {
          for (let i = 3; i >= 3 && i < 6; i++) {
            for (let j = 3; j >= 3 && j < 6; j++) {
              area.push(this.grid[j][i]);
            }
          }

          return area;
        } else {
          for (let i = 3; i >= 3 && i < 6; i++) {
            for (let j = 6; j >= 6 && j < 9; j++) {
              area.push(this.grid[j][i]);
            }
          }

          return area;
        }
      }

      if (x >= 6 && x < 9) {
        if (y >= 0 && y < 3) {
          for (let i = 6; i >= 6 && i < 9; i++) {
            for (let j = 0; j >= 0 && j < 3; j++) {
              area.push(this.grid[j][i]);
            }
          }

          return area;
        } else if (y >= 3 && y < 6) {
          for (let i = 6; i >= 6 && i < 9; i++) {
            for (let j = 3; j >= 3 && j < 6; j++) {
              area.push(this.grid[j][i]);
            }
          }

          return area;
        } else {
          for (let i = 6; i >= 6 && i < 9; i++) {
            for (let j = 6; j >= 6 && j < 9; j++) {
              area.push(this.grid[j][i]);
            }
          }

          return area;
        }
      }
    });

    this.grid = grid;
  }

}

module.exports = Sudoku; //console.log(Sudoku)