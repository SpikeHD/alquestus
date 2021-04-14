process.stdin.setRawMode(true)
const menu = require('./game/menu')

;(async () => {
  await menu()
})()