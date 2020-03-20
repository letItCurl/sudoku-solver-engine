const colors = require('colors')

exports.displaySudoku = (sudoku) => {
    console.log(" ----------- ".red.bold)
    for (let x = 0; x < 9; x++) {
        var str = sudoku[x].join().replace(/,/g,"")
        str = "|".red.bold+str.slice(0,3)+"|".red.bold+str.slice(3,6)+"|".red.bold+str.slice(-3)+"|".red.bold
        console.log(str)
        if (x === 2){
            console.log("|-----------|".red.bold)  
        }
        if(x === 5){
            console.log("|-----------|".red.bold)
        }
    }
    console.log(" ----------- ".red.bold)
}



