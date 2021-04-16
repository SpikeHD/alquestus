module.exports.between = (val, min, max) => {
  return val >= min && val <= max
}

module.exports.random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}