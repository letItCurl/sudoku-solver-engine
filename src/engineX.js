const { testCol, testRow, testArea } = require('./rules');
const _ = require('underscore')
//small example of how we can add function to a class
//Sudoku.prototype.testCol = testCol
//Sudoku.prototype.testRow = testRow
//Sudoku.prototype.testArea = testArea
//mySudok.tools = getRowFromToolBox.bind(mySudok); for mod one object

const ToolBox = require('./toolBox')
const {grid} = require('./sudokuData')
const Sudoku = require('./sudoku')

class Engine{
    constructor(sudoku, toolBox){
        this.numbers = [],
        this.store = [],
        this.centers = [[1,1],[4,1],[7,1],[1,4],[4,4],[7,4],[1,7],[4,7],[7,7]],
        this.sudoku = sudoku,
        this.toolBox = toolBox

    }
    init = function(){
        this.numbers = []
        this.numbers = []
        for(let i = 1; i<10 ; i++){
            this.numbers[i]=[i,i,i,i,i,i,i,i,i]
        }
        this.numbers.shift()
    }
    solveN = function(n){
        var count = 0
        const refSudoku = this.toolBox.copy(this.sudoku.grid)
        refSudoku.displayGrid("initial number: "+n)
        this.toolBox.hideImpossibilities(refSudoku, n)
        refSudoku.displayGrid("hided number: "+n)
        
        this.centers.forEach(center => { 
            if(this.toolBox.canWePlace(refSudoku.getArea(center[0],center[1]))){
                console.log("we can replace here!".green+center)
                console.log(`--- START REPLACEMENT FOR:${n} @center:${center} ---`.magenta)
                console.log("Here is the area:")
                console.log(refSudoku.getArea(center[0],center[1]))
                this.toolBox.scanAreaAndReplaceZero(refSudoku ,this.sudoku, center, n)
                console.log(`--- END REPLACEMENT FOR:${n} @center:${center} ---`.magenta)
                count ++;
        
            }else{
                console.log("No replacement possible @area: "+center)
            }
        })
        
        this.sudoku.displayGrid("final grid for "+n)
        return (count === 0) ? true : false
    }
    testPos = function(i, j){
        for(let scanI = 0; scanI<this.store.length ; scanI++){
            if(this.store[scanI][0]===i && this.store[scanI][1]===j){
                return true
            }
        }
    }
    findAllNAndPop = function(n){
        //n goes from 1 to 9
        console.log(`--- COUNTING ${n} ---`)
        for(let scanX = 0; scanX<9 ; scanX++){
            for(let scanY = 0; scanY<9 ; scanY++){
                if(this.sudoku.grid[scanY][scanX]===n){
                    console.log(n+" finded".green)
    
                    if(!this.testPos(scanY,scanX)){
                        this.store.push([scanY,scanX])
                        this.numbers[n-1].pop()
                    } 
                }
            }
        } 
    }
    // THIS JUST CHECKS ! NOT GENERAL MODIFICATIONS !
    stopCondition = (numbers)=>{
        numbers = numbers.filter((val)=>{return val.length})
        return (numbers.length) ? true : false
    }
    solveAll = function(){
        this.init()
        var run = 0
        console.log("STARTING THE LOOP".rainbow)
        console.log(this.stopCondition(this.numbers))
        while(this.stopCondition(this.numbers)){
            console.log(`RUN NB:${run}`.bgMagenta)
            this.numbers.forEach((element,index) =>{
                while(!this.solveN(index+1)){
                    this.solveN(index+1)
                }
            })
            this.numbers.forEach((element,index) =>{
                this.findAllNAndPop(index+1, this.numbers)
            })
            run ++
        }
        console.log(this.numbers)
        console.log(`Nb of Runs: ${run}`)
        console.log("~~~~ DONE! ~~~~".rainbow)
    }
    
}
module.exports = Engine

const myTooBox = new ToolBox()
const mySudok = new Sudoku(grid)

mySudok.displayGrid("Initial sudoku")
myEngine = new Engine(mySudok, myTooBox)
myEngine.solveAll()
mySudok.displayGrid("Finished sudoku")
console.log(myEngine.store.length)


