const _ = require('underscore')
const {grid} = require('./sudokuData')
const Sudoku = require('./sudoku')

class ToolBox{
    constructor(){

    }
    copy = function(data) {
        return new Sudoku (JSON.parse(JSON.stringify(data)))
    }
    returnSudoku = function(obj) {
        return (JSON.parse(JSON.stringify(obj.grid)))
    }
    replaceRow = function(obj, y) {
        obj.grid[y] = ["x","x","x","x","x","x","x","x"]
    }
    replaceCol = function(obj, x) {
        for(let scanY = 0; scanY < 9 ; scanY++){
            obj.grid[scanY][x] = "x"
        }
    }
    
    canWePlace = function(area){
        var str = area.join().replace(/,|x|1|6|2|3|4|5|6|7|8|9/g,"")
        if(str==="0"){return true}
    }
    
    scanAreaAndReplaceZero = function(ref, obj, center, val){
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
    hideImpossibilities = function(refSudoku, n){
        for(let scanX = 0; scanX<9 ; scanX++){
            for(let scanY = 0; scanY<9 ; scanY++){
                if(refSudoku.grid[scanY][scanX] === n){
                    this.replaceCol(refSudoku, scanX)
                    this.replaceRow(refSudoku, scanY)
                    refSudoku.grid[scanY][scanX] = "#"
                }
            }
        }
    }

}

module.exports = ToolBox
