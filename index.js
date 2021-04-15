const menu = require('./game/menu')
const main = require('./game/main')

;(async () => {
  // First show the menu
  await menu()

  // Once the menu is returned, we start the game!
  await main()
})()