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

}