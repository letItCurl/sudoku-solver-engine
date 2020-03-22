const _ = require('underscore')
const {grid} = require('./sudokuData')
const Sudoku = require('./sudoku')

const copy = function(data) {
    return new Sudoku (JSON.parse(JSON.stringify(data)))
}
const returnSudoku = function(obj) {
    return (JSON.parse(JSON.stringify(obj.grid)))
}
const replaceRow = function(obj, y) {
    obj.grid[y] = ["x","x","x","x","x","x","x","x"]
}
const replaceCol = function(obj, x) {
    for(let scanY = 0; scanY < 9 ; scanY++){
        obj.grid[scanY][x] = "x"
    }
}

const canWePlace = function(area){
    var str = area.join().replace(/,/g,"").replace(/x/g,"")
    if(str.length===1 && str==="0"){return true}
}




const mySudok = new Sudoku(grid)
const mySudok2 = copy(mySudok.grid)

var n = 2
var centers = [[1,1],[4,1],[7,1],[1,4],[4,4],[7,4],[1,7],[4,7],[7,7]]

for(let scanX = 0; scanX<9 ; scanX++){
    for(let scanY = 0; scanY<9 ; scanY++){
        if(mySudok2.grid[scanY][scanX] === n){
            replaceCol(mySudok2, scanX)
            replaceRow(mySudok2, scanY)
            mySudok2.grid[scanY][scanX] = n
        }
    }
}

mySudok2.displayGrid()

centers.forEach(center => { 
    if(canWePlace(mySudok2.getArea(center[0],center[1]))){
        console.log(mySudok2.getArea(center[0],center[1]))
        console.log("we can replace !")
    }else{
        console.log("No replacement possible @: "+center)
    }
})


//mySudok.displayGrid()
//mySudok2.displayGrid()
