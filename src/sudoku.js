const colors = require('colors')
const {checkCol, checkRow, checkArea} = require('./rules')

const {grid} = require('./sudokuData')

class Sudoku{

    constructor(grid){
        this.grid = grid
    }

    displayGrid = function(title){
        if(title){
            console.log(title.red.bold)
        }else{
            console.log("All sudoku".red.bold)
        }
    console.log("+-----------+".red.bold)
    for (let x = 0; x < 9; x++) {
        var str = this.grid[x].join().replace(/,/g,"")
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
    displayRow = function(x){
        console.log(`row@${x}:`.red.bold)
        console.log(`${this.grid[x].join().replace(/,/g," ").yellow}`)
    }
    displayCol = function(y){
        console.log(`col@${y}: `.red.bold)
        for (let x = 0; x < 9; x++) {
            if(x===0){
                console.log(`${this.grid[x][y]}`.yellow)
            }else{
                console.log(`${this.grid[x][y]}`.yellow)
            }
        }
    }
    displayCross = function(x,y){
        var space = ""
        console.log(`cross@${x},${y}: `.red.bold)
        for(let i = 0; i < y; i++){
            space = `${space}  `
        }
        for (let scanX = 0; scanX < 9; scanX++) {
            if(scanX===x){
                console.log(this.grid[x].join().replace(/,/g," ").yellow)
            }else{
                console.log(space+`${this.grid[scanX][y]}`.yellow)
            }
        }
    }
    getRow = function(x){
        return this.grid[x]
    }
    getCol = function(y){
        var col = []
        for (let x = 0; x < 9; x++) {
            col.push(this.grid[x][y])
        }
        return col
    }
    getArea = function(x,y){
        var area = []
        if((x>=0&&x<3)){
            if(y>=0&&y<3){
                for(let i = 0; (i>=0&&i<3) ;i++){
                    for(let j = 0; (j>=0&&j<3) ;j++){
                        area.push(this.grid[i][j])
                    }
                }
                return area
            }else if(y>=3&&y<6){
                for(let i = 0; (i>=0&&i<3) ;i++){
                    for(let j = 3; (j>=3&&j<6) ;j++){
                        area.push(this.grid[j][i])
                    }
                }
                return area
            }else{
                for(let i = 0; (i>=0&&i<3) ;i++){
                    for(let j = 6; (j>=6&&j<9) ;j++){
                        area.push(this.grid[j][i])
                    }
                }
                return area
            }
        }if((x>=3&&x<6)){
            if(y>=0&&y<3){
                for(let i = 3; (i>=3&&i<6) ;i++){
                    for(let j = 0; (j>=0&&j<3) ;j++){
                        area.push(this.grid[j][i])
                    }
                }
                return area
            }else if(y>=3&&y<6){
                for(let i = 3; (i>=3&&i<6) ;i++){
                    for(let j = 3; (j>=3&&j<6) ;j++){
                        area.push(this.grid[j][i])
                    }
                }
                return area
            }else{
                for(let i = 3; (i>=3&&i<6) ;i++){
                    for(let j = 6; (j>=6&&j<9) ;j++){
                        area.push(this.grid[j][i])
                    }
                }
                return area
            }
        }if((x>=6&&x<9)){
            if(y>=0&&y<3){
                for(let i = 6; (i>=6&&i<9) ;i++){
                    for(let j = 0; (j>=0&&j<3) ;j++){
                        area.push(this.grid[j][i])
                    }
                }
                return area
            }else if(y>=3&&y<6){
                for(let i = 6; (i>=6&&i<9) ;i++){
                    for(let j = 3; (j>=3&&j<6) ;j++){
                        area.push(this.grid[j][i])
                    }
                }
                return area
            }else{
                for(let i = 6; (i>=6&&i<9) ;i++){
                    for(let j = 6; (j>=6&&j<9) ;j++){
                        area.push(this.grid[j][i])
                    }
                }
                return area
            }
        }
    }
    checkInitialArea = function(x,y) {
        const area = this.getArea(x,y)
        return this.isMoreThanOne(area)

    }
    checkInitialRow = function(y) {
        const row = this.getRow(y)
        return this.isMoreThanOne(row)
    }
    checkInitialCol = function(x) {
        const col = this.getCol(x)
        return this.isMoreThanOne(col)
    }
    isMoreThanOne = function(arr) {
        var numbersCount = [[],[],[],[],[],[],[],[],[]]
        var validated = true
        arr.forEach((el) => {
            if(el!=0){numbersCount[el-1].push(el)}
        });
        numbersCount.forEach(el =>{
            if(el.length > 1){validated = false}
        })
        if(validated){return true}else{return false}
    }
    checkInput = function(x,y) {
        var msg = {erros: []}
        if(!this.checkInitialArea(x,y)){msg.erros.push('doubles in the current area')}
        if(!this.checkInitialRow(y)){msg.erros.push('doubles in the current row')}
        if(!this.checkInitialCol(x)){msg.erros.push('doubles in the current colunm')}
        if(msg.erros.length===0){return true}else{return msg}
    }
}

module.exports = Sudoku
/*
const mySudok = new Sudoku(grid)

if(mySudok.checkInput(5,1)===true){
    console.log("ALL FINE")
}else{
    var msg = mySudok.checkInput(1,1)
    msg.erros.forEach(el=>{
        console.log(el)
    })
}
*/