const draw = (text) => console.log(text)
const chalk = require('chalk')
const debug = require('../util/debug')
const keypress = require('../util/keypress')

// Items
let selected = 0
const buttons = ['Start', 'Quit', 'Etc']

const columns = process.stdout.columns
const rows = process.stdout.rows-2

debug('Columns: ' + columns)
debug('Rows: ' + rows)

module.exports = async () => {
  menuDraw()

  while(true) {
    const key = await keypress()
    
    switch(key) {
    case 'right':
      selected++

      if (selected > buttons.length-1) selected = 0
      break

    case 'left':
      selected--

      if (selected < 0) selected = buttons.length-1
    }

    menuDraw()
  }
}

function menuDraw() {
  // Clear console
  process.stdout.write('\033c')

  const middle = Math.round(rows/2)

  for (let i = 0; i < rows; i++) {
    let row = ''

    // Top button border
    if (i === middle-1 || i === middle+1) {
      buttons.forEach(b => {
        row += '+' + Array(b.length+2).fill('-').join('') + '+ '
      })
    }

    // Button itself
    if (i === middle) {
      buttons.forEach((b, i) => {
        if (selected === i) b = chalk.bgRed(b)

        row += '| ' + b + ' | '
      })
    }

    draw(row)
  }
}