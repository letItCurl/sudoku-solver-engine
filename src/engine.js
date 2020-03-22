const { testCol, testRow, testArea } = require('./rules');
const ToolBox = require('./toolBox')

const {grid} = require('./sudokuData')
const Sudoku = require('./sudoku')

const myTooBox = new ToolBox()

Sudoku.prototype.testCol = testCol
Sudoku.prototype.testRow = testRow
Sudoku.prototype.testArea = testArea

//mySudok.tools = getRowFromToolBox.bind(mySudok); for mod one object

const mySudok = new Sudoku(grid)

var numbers = []

const numbersInit = ()=>{
    for(let i = 1; i<10 ; i++){
        numbers[i]=[i,i,i,i,i,i,i,i,i]
    }
    numbers.shift()
    //console.log("initial conditions builded as:")
    //console.log(numbers.join().bgMagenta)
}

numbersInit()

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
    
    originalSudoku.displayGrid("final grid for "+n)
    return (count === 0) ? true : false
}

const findAllN = (sudoku, n, numbers) =>{
    //n goes from 1 to 9
    console.log(`--- COUNTING ${n} ---`)
    for(let scanX = 0; scanX<9 ; scanX++){
        for(let scanY = 0; scanY<9 ; scanY++){
            if(sudoku.grid[scanY][scanX]===n){
                console.log(n+" finded".green)
                numbers[n-1].pop()
            }
        }
    }
    
} 
const showRemaining = (numbers)=>{
    numbers.forEach((element, index)=>{
        console.log(`"--- ${index+1}'s ---`)
        console.log(`${index+1}`.bgRed)
        findAllN(index+1)
        console.log(element)
        console.log("--- end ---")
    })
}
const stopCondition = (numbers)=>{
    numbers = numbers.filter((val)=>{return val.length})
    return (numbers.length) ? true : false
}

const solveAll = function(sudoku,numbers){
    var run = 0
    console.log("STARTING THE LOOP".rainbow)
    console.log(stopCondition(numbers))
    while(stopCondition(numbers)){
        console.log(`RUN NB:${run}`.bgMagenta)
        numbers.forEach((element,index) =>{
            while(!solveN(sudoku, index+1)){
                solveN(sudoku, index+1)
            }
        })
        numbers.forEach((element,index) =>{
            findAllN(sudoku, index+1, numbers)
        })
        run ++
    }
    console.log(numbers)
    console.log(`Nb of Runs: ${run}`)
    console.log("~~~~ DONE! ~~~~".rainbow)
}




numbersInit()
mySudok.displayGrid("Initial sudoku")
solveAll(mySudok, numbers)
mySudok.displayGrid("Finished sudoku")





