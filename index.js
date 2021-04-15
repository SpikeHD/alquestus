const menu = require('./game/menu')
const name = require('./game/namepick')
const main = require('./game/main')

;(async () => {
  // First show the menu
  await menu()

  // Name picker
  let playerName = await name()

  // Once the menu is returned, we start the game!
  await main(playerName)
})()