<p align="center">
  <a style="Color: #f694ff;" href="https://sudoku-binchmarking.firebaseapp.com/"><img src="https://res.cloudinary.com/duydvdaxd/image/upload/v1587807196/Vue-Sprint/sudoku_engine_fn9uaf.png"/></a>
</p>

<p align="center" ><a style="Color: #f694ff;" href="https://sudoku-binchmarking.firebaseapp.com/" >Look what we can do !</a></p>

# Features [![](https://img.shields.io/badge/autor-letItCurl-red.svg)](https://www.linkedin.com/in/roland-lopez-developer/?locale=en_US)

- Solve any valid sudoku.
- Detect invalid sudokus.
- 5 preset of sudokus.
- Logs are directly connected to the program status.

# How to use this ? [![](https://img.shields.io/badge/version-1.0.0-green.svg)](https://www.npmjs.com/package/sudoku-solver-engine)

## installation:
cd into your project and execute:
```
npm i sudoku-engine-solver
//or with yarn
yarn add sudoku-engine-solver
```
## Intro:
This is a node_module that can solve a sudoku step by step and produce a full log of how the code solve the problem. 

This package is meant yo be use both server-side and client-side. (files are builded with babel)

But if you are using this client-side, make sure to use a front-end framework ( angular / react / vue / etc ) to take advantage of the webpack config.

***The best aproach for a "sudoku solver app" would be to put the engine in the general store manager (redux / vueX)***

But you can import the diffrent objects in on component and do all the work in the component.

## Classes:
### sudoku data:
```
import {grid, gridClear, grid3, grid4, grid5, grid6} from 'sudoku-solver-engine'
```
This is all the available sudokus. Those grid are 9x9 matices. gridClear is an empty 9x9 matrix. grid2 is not available beacause it's a damned sudoku...
### Sudoku class:
>This class is meant perform get / set / display / test of a sudoku.
```
import {Sudoku} from 'sudoku-solver-engine'
```
Creation:
```
const mySudoku = new Sudoku(grid) // use any grid that you want
```
<table>
<tr>
  <th>
    method
  </th>
  <th>
    usage
  </th>
</tr>
<tr>
  <td>
    displayGrid(title: sting)
  </td>
  <td>
    console.log the sudoku
  </td>
</tr>
<tr>
  <td>
    displayRow(x: number)
  </td>
  <td>
    console.log the row at x
  </td>
</tr>
<tr>
  <td>
    displayCol(y: number)
  </td>
  <td>
    console.log the col at y
  </td>
</tr>
<tr>
  <td>
    displayCross(x: number, y: number)
  </td>
  <td>
    console.log the column at y and the row at x
  </td>
</tr>
<tr>
  <td>
    getCol(y: number)
  </td>
  <td>
    return the row at y
  </td>
</tr>
<tr>
  <td>
    getRow(x: number)
  </td>
  <td>
    return the row at x
  </td>
</tr>
<tr>
  <td>
    getArea(x: number, y: number)
  </td>
  <td>
    return the area at x,y
  </td>
</tr>
<tr>
  <td>
    isMoreThanOne(arr: number[])
  </td>
  <td>
    return true if in the array there is no double numbers
  </td>
</tr>
<tr>
  <td>
    checkInitialArea(x: number, y: number)
  </td>
  <td>
    return true if area is ok
  </td>
</tr>
<tr>
  <td>
    checkInitialRow(x: number)
  </td>
  <td>
    return true if row is ok
  </td>
</tr>
<tr>
  <td>
    checkInitialCol(y: number)
  </td>
  <td>
    return true if col is ok
  </td>
</tr>
<tr>
  <td>
    checkInput(x: number, y: number)  
  </td>
  <td>
    return true if at x,y the area/col/area are okay. If false it will return an object: {erros: []}
  </td>
</tr>
</table>

### ToolBox class:

>This is just a set of helper. (I will explain why in the next section) 
```
import {ToolBox} from 'sudoku-solver-engine'
```
### Engine class:
>This class is meant to solve a sudoku
```
import {Engine} from 'sudoku-solver-engine'
```
Creation:
```
myEngine = new Engine(mySudoku, myTooBox)
```
<table>
<tr>
  <th>
    method
  </th>
  <th>
    usage
  </th>
</tr>
<tr>
  <td>
    solveN(n: number)
  </td>
  <td>
    Detects all possiblities of n in a sudoku and set the number in the right position. It also feed the log data.
  </td>
</tr>
<tr>
  <td>
    solveAll()
  </td>
  <td>
    Solve all the sudoku and feed the log data. return false if the sudoku is a "multiple choice problem"
  </td>
</tr>
</table>

***I know, this: new Engine(mySudoku, myTooBox) is not efficient. But this code was produce to explain to my students the concept of oop***

## Example:

- create a new directory.
- cd inside
- execute yarn init / npm init
- install the sudoku-solver-engine
- create a testSudoku.js file and write inside:

```
import {ToolBox, Sudoku, grid} from 'sudoku-solver-engine'

const myTooBox = new ToolBox()
const mySudoku = new Sudoku(grid)

mySudoku.displayGrid("Initial sudoku")
myEngine = new Engine(mySudoku, myTooBox)
myEngine.solveAll()

console.log("testSolveAll")
console.log(myEngine.logs.length)
console.log(myEngine.logs)
mySudoku.displayGrid("Finished sudoku")
```
- execute: node testSudoku.js
- enjoy :) !

***The sudoku grid is the same everywhere. They all share the same data !***

# Important
Some Sudokus cannot be solved with this algorithm. Those Sudokus need an assumption to continue the resolution.

But the algorithm is able to detect when an assumption needs to be made, so, you could work on the version 2 of this code that would be able to solve those Sudokus ;)!

# Technical stack
- JS ES6
- Babel
- Npm
- Git
- A lot of patience :p

# About
Npm module made from scratch by me, for you, with <3. 
I used this code to do <a href="https://sudoku-binchmarking.firebaseapp.com/">this<a/> in react.
<table style="border: none;">
  <tr>
    <td>
      <div style="width: 120px;">
        <img style="width: 120px;" src="https://res.cloudinary.com/duydvdaxd/image/upload/w_120,c_fill,ar_1:1,g_auto/v1587723517/Rodeooo_khmmmu.jpg"/>
    </div>
    </td>
    <td>
      <div style="margin-left: 30px;">
        <p>Hey there !</br>
        I'm letItCurl, fullstack developer engineer in freelance a.k.a Roland in real life :p</br>
        If you have any question you can <a href="https://www.linkedin.com/in/roland-lopez-developer/?locale=en_US">contact me</a> if you wish !</p>
        <p>I'm always ready to help !</p>
        <a style="color: #f694ff;" href="mailto:rolandlopez.developer@gmail.com?subject=Hey! Are you available?">Email me</a>
    </div>
    </td>
  </tr>
</table>

