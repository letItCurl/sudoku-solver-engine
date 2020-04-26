const Engine = require('./lib/engineX')
const Sudoku = require('./lib/sudoku')
const ToolBox = require('./lib/toolBox')
const {grid} = require('./lib/sudokuData')
const {grid3} = require('./lib/sudokuData3')
const {grid4} = require('./lib/sudokuData4')
const {grid5} = require('./lib/sudokuData5')
const {grid6} = require('./lib/sudokuData6')
const {gridClear} = require('./lib/sudokuDataClear')

exports.grid = grid
exports.grid3 = grid3
exports.grid4 = grid4
exports.grid5 = grid5
exports.grid6 = grid6
exports.gridClear = gridClear
exports.Engine = Engine
exports.ToolBox = ToolBox
exports.Sudoku = Sudoku

