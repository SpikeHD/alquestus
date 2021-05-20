const draw = (text) => console.log(text)
const { between } = require('./math')
const Player = require('./classes/Player')
const worldgen = require('./generation/worldgen')
const controller = require('./playercontroller')

const columns = process.stdout.columns
const rows = process.stdout.rows-2

let player
let lastCoords
let stage = 0
let currentMap = worldgen.outside.create(stage)
let inProgress = true

/**
 * Main gameplay
 * 
 * @param {String} playername 
 */
module.exports = async (playername) => {
  player = new Player(playername)

  drawScreen()

  while(inProgress) {
    lastCoords = await controller.input(player, columns-2, rows)

    const state = drawScreen()

    // Reset coords to last on collision
    if (state.collided) {
      player.x = lastCoords.x
      player.y = lastCoords.y

      // We shouldn't revert into another wall, so just redraw
      drawScreen()
    }
  }
}

/**
 * Draw the current screen
 */
function drawScreen() {
  // Clear console
  process.stdout.write('\033c')

  // Some data to return
  let data = { collided: false }

  // reverse Y loop for proper coords
  for (let y = rows; y > 0; y--) {
    let row = ''

    // Player position
    for (let x = 0; x < columns; x++) {
      let drewWall = false

      // Check for wall creation
      currentMap.rooms.forEach(room => {
        room.forEach(wall => {
          if (!drewWall) {
            drewWall = drawWall(wall, x, y)

            // If we need to draw a wall
            if (drewWall) row += currentMap.theme.wall
          }
        })
      })

      // Check for corridor creation
      currentMap.corridors.forEach(corridor => {
        corridor.walls.forEach(wall => {
          if (!drewWall) {
            drewWall = drawWall(wall, x, y)

            // If we need to draw a wall
            if (drewWall) row += currentMap.theme.wall
          }
        })
      })
      
      // Draw player if it isn't colliding, otherwise an empty space
      if (x === player.x && y === player.y) {
        if (!drewWall) row += 'ඞ'
        else data.collided = true
      } else if (!drewWall) row += ' '
    }

    draw(row)
  }

  return data
}

/**
 * "Should I draw a wall at this coordinate?" function
 * 
 * @param {Object} wall 
 * @param {String} row 
 * @returns 
 */
function drawWall(wall, x, y) {
  // If this wall should actually NOT be drawn, like if it's an entrance
  if (currentMap.corridors.find(c => c.holes.find(h => h.x === x && h.y === y))) {
    return false
  }

  if (wall.start.y === y && between(x, wall.start.x, wall.start.x + wall.size) && wall.angle === 'horiz') {
    return true
  }

  if (wall.start.x === x && between(y, wall.start.y, wall.start.y + wall.size) && wall.angle === 'vert') {
    return true
  }

  return false
}
