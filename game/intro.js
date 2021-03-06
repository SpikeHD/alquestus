
const type = require('../util/typeText')
const keypress = require('../util/keypress')

/**
 * Main intro
 * 
 * @param {String} playername 
 */
module.exports = async (playername) => {
  await type(`You are ${playername}, a dungeoneer with a sense of adventure`, 'medium', false)
  await type('... ', 700, false)
  await type('Or maybe you aren\'t', 'fast', false)
  await type(', ', 500, false)
  await type('I don\'t know.', 'fast')

  await type('\n', 'fast')
  await type('Anyways, you find yourself near a large, dungeon-y looking structure. You aren\'t quite there yet, however.', 'medium')
  await type('The entrance beckons you', 'medium', false)
  await type('...', 500)

  await type('\n', 'fast')
  await type('(Press any key to continue, by the way)', 'fast')
}