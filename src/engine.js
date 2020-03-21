const { checkCol, checkRow, checkArea } = require('./rules');
const Sudoku = require("./sudoku.js");
const data = require('./sudokuData')

Sudoku.prototype.checkRow = checkRow
Sudoku.prototype.checkCol = checkCol
Sudoku.prototype.checkArea = checkArea
//mySudok.tools = getRowFromToolBox.bind(mySudok); for mod one object

const mySudok = new Sudoku(data.sudoku)

class Engine{
    constructor(sudokuToSolve){
        this.sudoku =  sudokuToSolve
        this.numbersToDo = [1,2,3,4,5,6,7,8,9]
    }
}

const myEngine = new Engine(mySudok)


console.log(myEngine.numbersToDo)