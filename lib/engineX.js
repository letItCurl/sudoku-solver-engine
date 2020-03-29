function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//const { testCol, testRow, testArea } = require('./rules');
//small example of how we can add function to a class
//Sudoku.prototype.testCol = testCol
//Sudoku.prototype.testRow = testRow
//Sudoku.prototype.testArea = testArea
//mySudok.tools = getRowFromToolBox.bind(mySudok); for mod one object
const ToolBox = require('./toolBox');

const {
  grid
} = require('./sudokuData');

const Sudoku = require('./sudoku');

class Engine {
  constructor(sudoku, toolBox) {
    _defineProperty(this, "init", function () {
      //this function fills numbers[] with all the the numbers
      this.numbers = [];
      this.numbers = [];

      for (let i = 1; i < 10; i++) {
        this.numbers[i] = [i, i, i, i, i, i, i, i, i];
      }

      this.numbers.shift();
    });

    _defineProperty(this, "solveN", function (n) {
      //take a number from 1 to 9
      var count = 0; // use to check nb of iteration done
      //copy the sudoku

      const refSudoku = this.toolBox.copy(this.sudoku.grid); //hide with "x" all cross and areas of a given number N

      this.toolBox.hideImpossibilities(refSudoku, n); //scan all centers

      this.centers.forEach(center => {
        //if the area has one 0, then we place the N number in the given place
        if (this.toolBox.canWePlace(refSudoku.getArea(center[0], center[1]))) {
          //scan the area,place a number in this.sudoku
          this.logs.push(`--->REPLACEMENT FOR: ${n}'s @center: ${center}`);
          this.scanAreaAndReplaceZero(refSudoku, center, n);
          count++;
        } else {
          this.logs.push("NO REPLACEMENT POSSIBLE @AREA: " + center);
        }
      }); //return (count === 0) ? true : false

      if (count === 0) {
        this.logs.push(`NO MORE REPLACEMENT POSSIBLE FOR ${n}'s`);
        return true;
      } else {
        this.logs.push(`TESTING MORE REPLACEMENT FOR ${n}'s`);
        return false;
      }
    });

    _defineProperty(this, "testPos", function (i, j) {
      for (let scanI = 0; scanI < this.store.length; scanI++) {
        if (this.store[scanI][0] === i && this.store[scanI][1] === j) {
          return true;
        }
      }
    });

    _defineProperty(this, "findAllNAndPop", function (n) {
      //n goes from 1 to 9
      var count = 0;
      this.logs.push(`--- COUNTING ${n}'s ---`);

      for (let scanX = 0; scanX < 9; scanX++) {
        for (let scanY = 0; scanY < 9; scanY++) {
          if (this.sudoku.grid[scanY][scanX] === n) {
            if (!this.testPos(scanY, scanX)) {
              this.store.push([scanY, scanX]);
              this.numbers[n - 1].pop();
              this.logs.push(`--- NEW ${n} FINDED, N's COUNT UPDATED ---`);
              count++;
            }
          }
        }
      }

      count === 0 ? this.logs.push(`--- NEW ${n}'s NOT FINDED ---`) : this.logs.push(`--- ${n}'s COUNTED ---`);
    });

    _defineProperty(this, "stopCondition", numbers => {
      numbers = numbers.filter(val => {
        return val.length;
      });
      return numbers.length ? true : false;
    });

    _defineProperty(this, "scanAreaAndReplaceZero", function (ref, center, val) {
      for (let i = center[0] - 1; i < center[0] + 2; i++) {
        for (let j = center[1] - 1; j < center[1] + 2; j++) {
          if (ref.grid[j][i] === 0) {
            this.sudoku.grid[j][i] = val; //console.log("REPLACEMENT".green+" @: "+i+" "+j)

            this.logs.push(`--->POS REPLACED: ${j},${i}`);
            this.logs.push(`--->VAL INSERTED: ${val}`);
            this.logs.push([i, j, val]);
          } else {//console.log("NOT REPLACED".yellow + ref.grid[j][i])
          }
        }
      }
    });

    _defineProperty(this, "solveAll", function () {
      this.init();
      this.logs = [];
      this.logs.push(`--- LUNCHING ENGINE ---`);
      this.logs.push(`--- INITIAL STATE CLEANED ---`);
      this.logs.push(`--- STARTING ---`);
      var run = 1;

      while (this.stopCondition(this.numbers) && run < 50) {
        this.logs.push(`### RUN NB: ${run} ###`);
        this.numbers.forEach((element, index) => {
          this.logs.push(`--- TRYING TO SOLVING: ${index + 1}'s ---`);

          while (!this.solveN(index + 1)) {
            this.logs.push(`--- SOLVING: ${index + 1}'s ---`);
            this.solveN(index + 1);
          }
        });
        this.logs.push(`--- UPDATING GENERAL NUMBERS COUNT IF NEEDED ---`);
        this.numbers.forEach((element, index) => {
          this.logs.push(`--- CHEKING THE UPDATE OF: ${index + 1}  ---`);
          this.findAllNAndPop(index + 1, this.numbers);
        });
        run++;
      }

      this.logs.push(`---> NB OF TOTAL RUNS ${run}`);

      if (run === 50) {
        this.logs = ['This sudoku is damned'];
        this.errors = ["//////////", 'This sudoku is damned', 'See the docs to understand why', 'an assumption needs to be made or initial input incorrect', "//////////"];
        return false;
      } else {
        return true;
      } //this.toolBox.writeLogsToFile(this.logs, "RunTheTrap")

    });

    this.numbers = [], this.store = [], this.centers = [[1, 1], [4, 1], [7, 1], [1, 4], [4, 4], [7, 4], [1, 7], [4, 7], [7, 7]], this.sudoku = sudoku, this.toolBox = toolBox, this.logs = [];
  }

}

module.exports = Engine;
/*
const myTooBox = new ToolBox()
const mySudok = new Sudoku(grid)

mySudok.displayGrid("Initial sudoku")
myEngine = new Engine(mySudok, myTooBox)
myEngine.solveAll()

console.log("testSolveAll")
console.log(myEngine.logs.length)
mySudok.displayGrid("Finished sudoku")
*/