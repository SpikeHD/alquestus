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

  while(inProgress) {
    await controller.input(player)

    console.log('got input')

    drawScreen()
  }
}

function drawScreen() {
  // For each row
  for (let y = 0; y < rows; y++) {
    let row = ''

    console.log(y)

    for (let x = 0; x < columns; y++) {
      if (x === player.x && y === player.y) row += '0'
      else row += '#'
    }

    draw(row)
  }
}