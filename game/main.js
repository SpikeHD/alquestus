const draw = (text) => console.log(text)
const Player = require('./classes/Player')
const worldgen = require('./generation/worldgen')
const controller = require('./playercontroller')

const columns = process.stdout.columns
const rows = process.stdout.rows-2

let player
let stage = 0
let currentMap = worldgen.outside.create(stage)
let inProgress = true

module.exports = async (playername) => {
  player = new Player(playername)

  drawScreen()

  while(inProgress) {
    await controller.input(player, columns-2, rows)

    drawScreen()
  }
}

function drawScreen() {
  // Clear console
  process.stdout.write('\033c')

  // reverse Y loop for proper coords
  for (let y = rows; y > 0; y--) {
    let row = ''

    // Player position
    for (let x = 0; x < columns; x++) {
      if (x === 12 && y === 118) {
        row += '&'
        continue
      }

      if (x === player.x && y === player.y) row += '0'
      else {
        let drewWall = false

        // Check for wall creation
        currentMap.rooms.forEach(room => {
          room.forEach(wall => {
            // We found a wall start position, draw it
            if (wall.start.x === x && wall.start.y === y) {
              // Draw that mf wall
              if (wall.angle === 'horiz') {
                row += Array(wall.size).fill(currentMap.mat).join('')
                // Increment x automatically so we don't have to loop over the same positions
                x += wall.size
              }
            } else if (wall.start.x === x && between(y, wall.start.y, wall.start.y + wall.size) && wall.angle === 'vert') {
              // If the x is correct, and the y is within the size it should draw, draw it
              row += currentMap.mat

              drewWall = true
            }
          })
        })

        if (!drewWall) row += ' '
      }
    }

    draw(row)
  }
}

function between(val, min, max) {
  return val >= min && val <= max
}