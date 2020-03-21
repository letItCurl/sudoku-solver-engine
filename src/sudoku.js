const data = require('./sudokuData')
const colors = require('colors')

function Sudoku(sudoku){
    
    this.sudoku = sudoku

    this.displaySudoku = function(){
    console.log("All sudoku".red.bold)
    console.log("+-----------+".red.bold)
    for (let x = 0; x < 9; x++) {
        var str = this.sudoku[x].join().replace(/,/g,"")
        str = "|".red.bold+str.slice(0,3)+"|".red.bold+str.slice(3,6)+"|".red.bold+str.slice(-3)+"|".red.bold
        console.log(str)
        if (x === 2){
            console.log("|-----------|".red.bold)  
        }
        if(x === 5){
            console.log("|-----------|".red.bold)
        }
    }
    console.log("+-----------+".red.bold)
    }

    this.displayRow = function(x){
        console.log(`row@${x}:`.red.bold)
        console.log(`${this.sudoku[x].join().replace(/,/g," ").yellow}`)
    }
    this.displayCol = function(y){
        console.log(`col@${y}: `.red.bold)
        for (let x = 0; x < 9; x++) {
            if(x===0){
                console.log(`${this.sudoku[x][y]}`.yellow)
            }else{
                console.log(`${this.sudoku[x][y]}`.yellow)
            }
        }
    }
    this.displayCross = function(x,y){
        var space = ""
        console.log(`cross@${x},${y}: `.red.bold)
        for(let i = 0; i < y; i++){
            space = `${space}  `
        }
        for (let scanX = 0; scanX < 9; scanX++) {
            if(scanX===x){
                console.log(this.sudoku[x].join().replace(/,/g," ").yellow)
            }else{
                console.log(space+`${this.sudoku[scanX][y]}`.yellow)
            }
        }
    }
    this.getRow = function(x){
        return this.sudoku[x]
    }
    this.getCol = function(y){
        var col = []
        for (let x = 0; x < 9; x++) {
            col.push(this.sudoku[x][y])
        }
        return col
    }
    this.getArea = function(x,y){
        var area = []
        if((x>=0&&x<3)){
            if(y>=0&&y<3){
                for(let i = 0; (i>=0&&i<3) ;i++){
                    for(let j = 0; (j>=0&&j<3) ;j++){
                        area.push(this.sudoku[i][j])
                    }
                }
                return area
            }else if(y>=3&&y<6){
                for(let i = 0; (i>=0&&i<3) ;i++){
                    for(let j = 3; (j>=3&&j<6) ;j++){
                        area.push(this.sudoku[j][i])
                    }
                }
                return area
            }else{
                for(let i = 0; (i>=0&&i<3) ;i++){
                    for(let j = 6; (j>=6&&j<9) ;j++){
                        area.push(this.sudoku[j][i])
                    }
                }
                return area
            }
        }if((x>=3&&x<6)){
            if(y>=0&&y<3){
                for(let i = 3; (i>=3&&i<6) ;i++){
                    for(let j = 0; (j>=0&&j<3) ;j++){
                        area.push(this.sudoku[j][i])
                    }
                }
                return area
            }else if(y>=3&&y<6){
                for(let i = 3; (i>=3&&i<6) ;i++){
                    for(let j = 3; (j>=3&&j<6) ;j++){
                        area.push(this.sudoku[j][i])
                    }
                }
                return area
            }else{
                for(let i = 3; (i>=3&&i<6) ;i++){
                    for(let j = 6; (j>=6&&j<9) ;j++){
                        area.push(this.sudoku[j][i])
                    }
                }
                return area
            }
        }if((x>=6&&x<9)){
            if(y>=0&&y<3){
                for(let i = 6; (i>=6&&i<9) ;i++){
                    for(let j = 0; (j>=0&&j<3) ;j++){
                        area.push(this.sudoku[j][i])
                    }
                }
                return area
            }else if(y>=3&&y<6){
                for(let i = 6; (i>=6&&i<9) ;i++){
                    for(let j = 3; (j>=3&&j<6) ;j++){
                        area.push(this.sudoku[j][i])
                    }
                }
                return area
            }else{
                for(let i = 6; (i>=6&&i<9) ;i++){
                    for(let j = 6; (j>=6&&j<9) ;j++){
                        area.push(this.sudoku[j][i])
                    }
                }
                return area
            }
        }
    }
}
const mySudok = new Sudoku(data.sudoku)

mySudok.displaySudoku()

console.log(mySudok.getArea(6,6))
