const CustomError = require("../extensions/custom-error");

module.exports = function calculateHanoi(disksNumber, turnsSpeed) {
  const minNumOfTurns = 2 ** disksNumber - 1;
  const turnsPerSecond = turnsSpeed / 3600;
  const secondsToSolve = Math.floor(minNumOfTurns / turnsPerSecond);
  return { turns: minNumOfTurns, seconds: secondsToSolve };
};
