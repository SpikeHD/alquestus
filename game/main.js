const draw = (text) => console.log(text)
const Player = require('./classes/Player')
const worldgen = require('./generation/worldgen')
const controller = require('./playercontroller')

const columns = process.stdout.columns
const rows = process.stdout.rows-2

let player
let stage = 0
let currentMap = {}
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

    for (let x = 0; x < columns; x++) {
      if (x === player.x && y === player.y) row += '0'
      else row += ' '
    }

    draw(row)
  }
}