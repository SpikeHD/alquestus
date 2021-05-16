const room = require('./room')
const brick = require('./materials/brick')
const { random } = require('../math')
const corridor = require('./corridor')

/**
 * Create ouside environment
 */
module.exports.create = (difficulty) => {
  // Construct an object full of wall/item/chest/etc. coords
  let obj =  {
    rooms: [
      room({ width: random(8, 14), height: random(2, 8) }, { x: Math.round(random(30, 60)) , y: Math.round(random(6, 12)) }, 'right', 1),
      room({ width: random(8, 14), height: random(2, 8) }, { x: Math.round(random(60, 120)) , y: Math.round(random(6, 12)) }, 'left', 1)
    ],
    theme: {
      wall: brick
    },
    corridors: []
  }

  obj.rooms.forEach((room, i) => {
    // Don't create a corridor for the last room
    if (i === obj.rooms.length-1) return

    // Connect current and next room together
    obj.corridors.push(corridor.connect(room, obj.rooms[i+1]))
  })

  return obj
}