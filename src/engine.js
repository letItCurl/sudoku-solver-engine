const { checkCol, checkRow, checkArea } = require('./rules');
const ToolBox = require('./toolBox')

const {grid} = require('./sudokuData')
const Sudoku = require('./sudoku')

const myTooBox = new ToolBox()

//Sudoku.prototype.checkRow = checkRow
//Sudoku.prototype.checkCol = checkCol
//Sudoku.prototype.checkArea = checkArea

//mySudok.tools = getRowFromToolBox.bind(mySudok); for mod one object

const mySudok = new Sudoku(grid)

var n = 9
var centers = [[1,1],[4,1],[7,1],[1,4],[4,4],[7,4],[1,7],[4,7],[7,7]]

const solveN = function(originalSudoku, n){
    var count = 0
    const refSudoku = myTooBox.copy(originalSudoku.grid)
    refSudoku.displayGrid("initial number: "+n)
    myTooBox.hideImpossibilities(refSudoku, n)
    refSudoku.displayGrid("hided number: "+n)
    
    centers.forEach(center => { 
        if(myTooBox.canWePlace(refSudoku.getArea(center[0],center[1]))){
            console.log("we can replace here!".green+center)
            console.log(`--- START REPLACEMENT FOR:${n} @center:${center} ---`.magenta)
            console.log("Here is the area:")
            console.log(refSudoku.getArea(center[0],center[1]))
            myTooBox.scanAreaAndReplaceZero(refSudoku ,originalSudoku, center, n)
            console.log(`--- END REPLACEMENT FOR:${n} @center:${center} ---`.magenta)
            count ++;
    
        }else{
            console.log("No replacement possible @area: "+center)
        }
    })
    
    originalSudoku.displayGrid("final mod")
    return (count === 0) ? true : false
}

solveN(mySudok, n) ? console.log("on ne peut pas aller plus loin !".green) : console.log("il y a encore des étapes...".red)
solveN(mySudok, n) ? console.log("on ne peut pas aller plus loin !".green) : console.log("il y a encore des étapes...".red)


