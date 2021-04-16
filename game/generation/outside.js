const room = require('./room')
const brick = require('./materials/brick')
const { random } = require('../math')

module.exports.create = (difficulty) => {
  // Construct an object full of wall/item/chest/etc. coords
  return {
    rooms: [room({ width: random(2, 6), height: random(2, 6) }, { x: Math.round(process.stdout.columns/2) , y: Math.round(process.stdout.rows/2) }, 1, 'left', 1)],
    mat: brick
  }
}