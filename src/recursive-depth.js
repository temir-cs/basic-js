const CustomError = require("../extensions/custom-error");

module.exports = class DepthCalculator {
  calculateDepth(arr) {
    if (!Array.isArray(arr)) return 0;
    return arr.length === 0 ? 1 : 1 + Math.max(...arr.map((item) => this.calculateDepth(item)));
  }
};