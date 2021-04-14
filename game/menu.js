const draw = (text) => console.log(text)
const chalk = require('chalk')
const debug = require('../util/debug')

// Items
let selected = 0
const buttons = ['Start', 'Quit', 'Etc']

const columns = process.stdout.columns
const rows = process.stdout.rows

debug('Columns: ' + columns)
debug('Rows: ' + rows)

// Calculate placing the menu items equally at the bottom of the screen
let itemSpace = 2
let totalItemSpace = buttons.join(Array(itemSpace).fill(' ').join()).length
debug(totalItemSpace)

if (totalItemSpace + columns % 2 === 0) totalItemSpace--

debug(itemSpace)
debug(totalItemSpace)

module.exports = () => {
  menuDraw()
}

function menuDraw() {
  for(let i = 0; i < rows; i++) {
    if (i !== rows-1) {
      draw(chalk.blue(Array(columns).fill('█').join('')))
      continue
    }

    // Fill first half
    let row = ''
    const totalBlank = columns - totalItemSpace
    const space = Array(totalBlank/2).fill('█').join('')

    // Button highlight handling
    let textBtns = ''

    buttons.forEach((b, i) => {
      if (i === selected) textBtns += chalk.white(chalk.bgRed(b))
      else textBtns += b

      // Item spacing
      if (i !== buttons.length-1) textBtns += Array(itemSpace).fill('-').join('')
    })

    row += chalk.blue(space + textBtns + space)

    draw(row)
  }
}