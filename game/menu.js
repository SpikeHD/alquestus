const draw = (text) => console.log(text)
const chalk = require('chalk')
const debug = require('../util/debug')
const keypress = require('../util/keypress')

// Items
let selected = 0
const buttons = ['Start', 'Quit', 'Etc']

const columns = process.stdout.columns
const rows = process.stdout.rows

debug('Columns: ' + columns)
debug('Rows: ' + rows)

module.exports = async () => {
  menuDraw()

  while(true) {
    debug(await keypress())
  }
}

function menuDraw() {
  const middle = Math.round(rows/2)

  for (let i = 0; i < rows; i++) {
    let row = ''

    // Top button border
    if (i === middle-1) {
      row += 'top'
    }
    
    // Bottom button border
    if (i === middle+1) {
      row += 'bottom'
    }

    // Button itself
    if (i === middle) {
      row += 'middle'
    }

    draw(row)
  }
}