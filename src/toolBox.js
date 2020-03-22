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
    var str = area.join().replace(/,|x|1|6|2|3|4|5|6|7|8|9/g,"")
    if(str==="0"){return true}
}

//const scanPossibilities = function(sudoku, n) {
//    var centers = [[1,1],[4,1],[7,1],[1,4],[4,4],[7,4],[1,7],[4,7],[7,7]]
//    for(let scanX = 0; scanX<9 ; scanX++){
//        for(let scanY = 0; scanY<9 ; scanY++){
//            if(sudoku.grid[scanY][scanX] === n){
//                replaceCol(sudoku, scanX)
//                replaceRow(sudoku, scanY)
//                sudoku.grid[scanY][scanX] = n
//            }
//        }
//    }
//    centers.forEach(center => { 
//        if(canWePlace(sudoku.getArea(center[0],center[1]))){
//            console.log(sudoku.getArea(center[0],center[1]))
//            console.log("we can replace !".green)
//        }else{
//            console.log("No replacement possible @: "+center)
//        }
//    })
//}



/*
for(let i = 1; i < 9; i++ ){
    const copiedSudoku = copy(mySudok.grid)
    copiedSudoku.displayGrid(`${i}`)
    scanPossibilities(copiedSudoku, i)
    console.log("--- END ---".red)
    
}
*/
const mySudok = new Sudoku(grid)
const copiedSudoku = copy(mySudok.grid)
var n = 9
var centers = [[1,1],[4,1],[7,1],[1,4],[4,4],[7,4],[1,7],[4,7],[7,7]]

copiedSudoku.displayGrid("initial number: "+n)
for(let scanX = 0; scanX<9 ; scanX++){
    for(let scanY = 0; scanY<9 ; scanY++){
        if(copiedSudoku.grid[scanY][scanX] === n){
            replaceCol(copiedSudoku, scanX)
            replaceRow(copiedSudoku, scanY)
            copiedSudoku.grid[scanY][scanX] = "#"
        }
    }
}
copiedSudoku.displayGrid("hided number: "+n)
centers.forEach(center => { 
    if(canWePlace(copiedSudoku.getArea(center[0],center[1]))){
        console.log(copiedSudoku.getArea(center[0],center[1]))
        console.log("we can replace ! @ ".green+center)
    }else{
        console.log("No replacement possible @: "+center)
        //console.log(copiedSudoku.getArea(center[0],center[1]))
    }
})

