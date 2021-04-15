const keypress = require('../util/keypress')

/**
 * Player input controller
 * 
 * @param {Player} player 
 */
module.exports.input = async (player, maxX, maxY) => {
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

  if (player.x < 0) player.x = 0
  if (player.y < 0) player.y = 0
  if (player.x > maxX) player.x = maxX
  if (player.y > maxY) player.y = maxY

  return
}