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

const scanAreaAndReplaceZero = function(ref, obj, center, val){
    for(let i = center[0]-1; i < center[0]+2; i++){
        for(let j = center[1]-1; j < center[1]+2; j++){
            if(ref.grid[j][i]===0){
                obj.grid[j][i]=val
                console.log("REPLACEMENT".green+" @: "+i+" "+j)
            }else{
                console.log("NOT REPLACED".yellow + ref.grid[j][i])
            }
        }
    }
}

const mySudok = new Sudoku(grid)
const copiedSudoku = copy(mySudok.grid)
var n = 6
var centers = [[1,1],[4,1],[7,1],[1,4],[4,4],[7,4],[1,7],[4,7],[7,7]]



const hideImpossibilities = function(refSudoku, n){
    for(let scanX = 0; scanX<9 ; scanX++){
        for(let scanY = 0; scanY<9 ; scanY++){
            if(refSudoku.grid[scanY][scanX] === n){
                replaceCol(refSudoku, scanX)
                replaceRow(refSudoku, scanY)
                refSudoku.grid[scanY][scanX] = "#"
            }
        }
    }
}

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


