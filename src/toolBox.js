const _ = require('underscore')
const data = require('./sudokuData')
const Sudoku = require('./sudoku')



const copy = function(data) {
    return new Sudoku(data)
}
const replaceRow = function(obj, y) {
    obj.sudoku[y] = ["x","x","x","x","x","x","x","x"]
}
const replaceCol = function(obj, x) {
    for(let scanY = 0; scanY < 9 ; scanY++){
        obj.sudoku[scanY][x] = "x"
    }
}

const mySudok2 = new Sudoku(data.sudoku)
const mySudok = new Sudoku(data.sudoku)

mySudok2.setPos([1,2,"XX"])

mySudok2.displaySudoku()
mySudok.displaySudoku()