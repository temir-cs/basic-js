const CustomError = require("../extensions/custom-error");

module.exports = function countCats(backyard) {
  const catsCount = backyard.flat().reduce((acc, current) => current === '^^' ? acc += 1 : acc, 0);
  return catsCount;
};
