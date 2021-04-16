/**
 * Check if value is in between a range
 * 
 * @param {Number} val 
 * @param {Number} min 
 * @param {Number} max 
 */
module.exports.between = (val, min, max) => {
  return val >= min && val <= max
}

/**
 * Get random number in name
 * 
 * @param {Number} min 
 * @param {Number} max
 */
module.exports.random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}