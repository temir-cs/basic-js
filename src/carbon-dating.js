const CustomError = require("../extensions/custom-error");

const MODERN_ACTIVITY= 15; 
const HALF_LIFE_PERIOD= 5730;
const APPR_LOG_OF_TWO = 0.693

module.exports = function dateSample(sampleActivity) {
  if (!sampleActivity || typeof sampleActivity !== 'string' || isNaN(Number(sampleActivity)) || Number(sampleActivity) <= 0) {
    return false;
  } 
  const approxAge = Math.ceil((Math.log(MODERN_ACTIVITY / sampleActivity)) / (APPR_LOG_OF_TWO / HALF_LIFE_PERIOD));
  if (approxAge <= 0) return false;
  return approxAge;
};
