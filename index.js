const menu = require('./game/menu')
const name = require('./game/namepick')
const main = require('./game/main')
const intro = require('./game/intro')

;(async () => {
  // First show the menu
  await menu()

  // Name picker
  let playerName = await name()

  // Intro scene
  await intro(playerName)

  // Once the menu is returned, we start the game!
  await main(playerName)
})()