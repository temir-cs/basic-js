const CustomError = require("../extensions/custom-error");

const instructions = ['--discard-prev', '--double-prev', '--discard-next', '--double-next'];

module.exports = function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error(`${arr} is not a valid array!`);
  }

  const discard = (array, phrase) => {
    const direction = phrase.substr(phrase.length - 4);
    let result = array.slice();
    const index = array.indexOf(phrase);
    direction === 'prev'
    ? result[index - 1] = ''
    : result[index + 1] = '';
    result[index] = '';
    return result;
  }
  const double = (array, phrase) => {
    const direction = phrase.substr(phrase.length - 4);
    let result = array.slice();
    const index = array.indexOf(phrase);
    result[index] = direction === 'prev' ? result[index - 1] : result[index + 1];
    return result;
  }

  const result = arr.reduce((acc, current) => {
    switch (current) {
      case '--discard-prev':
        return discard(acc, current);
      case '--discard-next':
        return discard(acc, current);
      case '--double-prev':
        return double(acc, current);
      case '--double-next':
        return double(acc, current);
      default:
        return acc;
    }
  }, arr);
  return result.filter((item) => item !== '' && item !== undefined);
};
