const menu = require('./game/menu')
const name = require('./game/namepick')
const main = require('./game/main')
const intro = require('./game/intro')

;(async () => {
  // First show the menu
  await menu()

  // Name picker
  let {playername, skip} = await name()

  // Intro scene
  if (!skip) await intro(playername)

  // Once the menu is returned, we start the game!
  await main(playername)
})()