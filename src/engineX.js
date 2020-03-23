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
        this.toolBox = toolBox,
        this.logs = []
    }
    init = function(){
        //this function fills numbers[] with all the the numbers
        this.numbers = []
        this.numbers = []
        for(let i = 1; i<10 ; i++){
            this.numbers[i]=[i,i,i,i,i,i,i,i,i]
        }
        this.numbers.shift()
    }
    solveN = function(n){
        //take a number from 1 to 9
        var count = 0 // use to check nb of iteration done
        var msg = []
        //copy the sudoku
        const refSudoku = this.toolBox.copy(this.sudoku.grid)
        //hide with "x" all cross and areas of a given number N
        this.toolBox.hideImpossibilities(refSudoku, n)
        //scan all centers
        this.centers.forEach(center => {
            //if the area has one 0, then we place the N number in the given place
            if(this.toolBox.canWePlace(refSudoku.getArea(center[0],center[1]))){
                //scan the area,place a number in this.sudoku
                msg.push(`--->REPLACEMENT FOR: ${n}'s @center: ${center}`)
                this.toolBox.scanAreaAndReplaceZero(refSudoku ,this.sudoku, center, n, msg)
                count ++;
            }else{
                msg.push("NO REPLACEMENT POSSIBLE @AREA: "+center)
            }
        })
        //return (count === 0) ? true : false
        if(count === 0){
            msg.push(`NO MORE REPLACEMENT POSSIBLE FOR ${n}'s`)
            this.logs.push({
                actionName: "solveN", 
                sudoku: this.toolBox.returnData(this.sudoku.grid), 
                messages: msg})
            return true
        }else{
            msg.push(`TESTING MORE REPLACEMENT FOR ${n}'s`)
            this.logs.push({
                actionName: "solveN", 
                sudoku: this.toolBox.returnData(this.sudoku.grid),
                //state:  this.toolBox.returnData(this.state),
                messages: msg})
            return false
        }
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
        var msg = {}
        msg.push(`--- COUNTING ${n}'s ---`)
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
        this.logs.push({
            actionName: "findAllNAndPop", 
            sudoku: this.toolBox.returnData(this.sudoku.grid),
            state:  this.toolBox.returnData(this.state), 
            messages: msg})
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
console.log(myEngine.logs[6])


