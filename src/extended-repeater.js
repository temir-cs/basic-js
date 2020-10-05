const CustomError = require("../extensions/custom-error");

module.exports = function repeater(input, options) {
  const str = typeof input === 'string' ? input : String(input);
  const repeatTimes = options.repeatTimes || 1;
  const separator = options.separator || '+';
  const addition = typeof options.addition === 'string' ? options.addition : String(options.addition);
  const additionRepeatTimes = options.additionRepeatTimes || 1;
  const additionSeparator = options.additionSeparator || '|';

  const additionStr = Array(additionRepeatTimes).fill(addition === 'undefined' ? '' : addition).join(additionSeparator);
  const result = Array(repeatTimes).fill(`${str}${additionStr}`).join(separator);
  return result;
};
  