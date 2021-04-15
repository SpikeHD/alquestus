const room = require('./room')

module.exports.create = (difficulty) => {
  // Construct an object full of wall/item/chest/etc. coords
  return {
    rooms: [room({ width: 10, height: 10 }, 1, 'left', 1)]
  }
}