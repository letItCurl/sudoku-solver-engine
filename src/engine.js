const { checkCol, checkRow, checkArea } = require('./rules');





const {grid} = require('./sudokuData')
const Sudoku = require('./sudoku')

//Sudoku.prototype.checkRow = checkRow
//Sudoku.prototype.checkCol = checkCol
//Sudoku.prototype.checkArea = checkArea

//mySudok.tools = getRowFromToolBox.bind(mySudok); for mod one object

const mySudok = new Sudoku(grid)
const copiedSudoku = copy(mySudok.grid)
var n = 9
var centers = [[1,1],[4,1],[7,1],[1,4],[4,4],[7,4],[1,7],[4,7],[7,7]]

copiedSudoku.displayGrid("initial number: "+n)
hideImpossibilities(copiedSudoku, n)

copiedSudoku.displayGrid("hided number: "+n)

centers.forEach(center => { 
    if(canWePlace(copiedSudoku.getArea(center[0],center[1]))){
        console.log("we can replace here!".green+center)
        console.log(`--- START REPLACEMENT FOR:${n} @center:${center} ---`.magenta)
        console.log("Here is the area:")
        console.log(copiedSudoku.getArea(center[0],center[1]))
        scanAreaAndReplaceZero(copiedSudoku ,mySudok, center, n)
        console.log(`--- END REPLACEMENT FOR:${n} @center:${center} ---`.magenta)

    }else{
        console.log("No replacement possible @area: "+center)
        //console.log(copiedSudoku.getArea(center[0],center[1]))
    }
})

mySudok.displayGrid("final mod")