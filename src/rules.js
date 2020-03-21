const _ = require('underscore')

const checkRow = function(x) {
    return !_.contains(this.getRow(x),0)
}
const checkCol = function(x) {
    return !_.contains(this.getCol(x),0)
}
const checkArea = function(x,y) {
    return !_.contains(this.getArea(x,y),0)
}

exports.checkCol = checkCol
exports.checkRow = checkRow
exports.checkArea = checkArea
