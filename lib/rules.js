const _ = require('underscore');

const testRow = function (x) {
  return !_.contains(this.getRow(x), 0);
};

const testCol = function (x) {
  return !_.contains(this.getCol(x), 0);
};

const testArea = function (x, y) {
  return !_.contains(this.getArea(x, y), 0);
};

exports.testRow = testRow;
exports.testCol = testCol;
exports.testArea = testArea;