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
      if (x === 12 && y === 118) {
        row += '&'
        continue
      }

      let drewWall = false

      // Check for wall creation
      currentMap.rooms.forEach(room => {
        room.forEach(wall => {
          // We found a wall start position, draw it
          if (wall.start.y === y && between(x, wall.start.x, wall.start.x + wall.size) && wall.angle === 'horiz' && !drewWall) {
            // Draw that mf wall
            row += currentMap.mat

            drewWall = true
          }
          
          if (wall.start.x === x && between(y, wall.start.y, wall.start.y + wall.size) && wall.angle === 'vert' && !drewWall) {
            // If the x is correct, and the y is within the size it should draw, draw it
            row += currentMap.mat

            drewWall = true
          }
        })
      })
      
      if (x === player.x && y === player.y) {
        if (!drewWall) row += '0'
        else data.collided = true
      } else if (!drewWall) row += ' '
    }

    draw(row)
  }

  return data
}