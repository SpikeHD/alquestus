const room = require('./room')
const brick = require('./materials/brick')

module.exports.create = (difficulty) => {
  // Construct an object full of wall/item/chest/etc. coords
  return {
    rooms: [room({ width: 4, height: 4 }, { x: Math.round(process.stdout.columns/2) , y: Math.round(process.stdout.rows/2) }, 1, 'left', 1)],
    mat: brick
  }
}