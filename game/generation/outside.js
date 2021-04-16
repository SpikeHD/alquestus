const room = require('./room')
const brick = require('./materials/brick')
const { random } = require('../math')

/**
 * Create ouside environment
 */
module.exports.create = (difficulty) => {
  // Construct an object full of wall/item/chest/etc. coords
  return {
    rooms: [room({ width: random(6, 10), height: random(2, 6) }, { x: Math.round(random(60, 120)) , y: Math.round(random(6, 10)) }, 1, 'left', 1)],
    mat: brick
  }
}