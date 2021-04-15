const keypress = require('../util/keypress')

/**
 * @param {Player} player 
 */
module.exports.input = async (player) => {
  const key = await keypress()

  switch(key) {
  case 'up':
    player.y++
    break

  case 'down':
    player.y--
    break

  case 'right':
    player.x++
    break

  case 'left':
    player.x--
    break
  }

  return
}