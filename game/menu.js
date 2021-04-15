const draw = (text) => console.log(text)
const chalk = require('chalk')
const debug = require('../util/debug')
const keypress = require('../util/keypress')

let menuActive = true

// Button items
let selected = 0
const buttons = ['Start', 'Options', 'Exit']

// For space calculation
const columns = process.stdout.columns
const rows = process.stdout.rows-2

debug('Columns: ' + columns)
debug('Rows: ' + rows)

/**
 * Draws menu until game is started
 */
module.exports = async () => {
  menuDraw()

  while(menuActive) {
    const key = await keypress()
    
    // Menu controller
    switch(key) {
    case 'right':
      selected++

      if (selected > buttons.length-1) selected = 0
      break

    case 'left':
      selected--

      if (selected < 0) selected = buttons.length-1
      break

    case 'enter':
      menuInputHandle()
      break

    case 'escape':
      process.exit()
      break
    }

    menuDraw()
    debug(key)
  }

  // Clear console
  process.stdout.write('\033c')
  return
}

/**
 * Draws the buttons for the menu, and highlights the selected option
 */
function menuDraw() {
  // Clear console
  process.stdout.write('\033c')

  const middle = Math.round(rows/2)

  for (let i = 0; i < rows; i++) {
    let row = ''

    // Button borders
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

/**
 * Handle each menu option when selected
 */
function menuInputHandle() {
  const option = buttons[selected]

  if (option === 'Exit') {
    process.exit()
  }

  if (option === 'Start') {
    menuActive = false
  }
}