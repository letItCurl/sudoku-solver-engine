const _ = require('underscore')
const {grid} = require('./sudokuData')
const Sudoku = require('./sudoku')

class ToolBox{
    constructor(){
        
    }
    copy = function(data) {
        return new Sudoku (JSON.parse(JSON.stringify(data)))
    }
    returnData = function(data) {
        return (JSON.parse(JSON.stringify(data)))
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
    writeLogsToFile = function (obj, name){
        var fs = require("fs")
        fs.writeFile(`./src/outputs/json/${name}.json`, JSON.stringify(obj), (err) => {
            if (err) {
                console.error(err)
                return;
            };
            console.log("File ./src/outputs/json/"+name+".json has been created");
        });
    }
}

module.exports = ToolBox
