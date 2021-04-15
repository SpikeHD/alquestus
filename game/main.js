const Player = require('./classes/Player')
const type = require('../util/typeText')

let stage = 0

module.exports = async (playername) => {
  const player = new Player(playername)

  await type('There would be some lore here if I had come up with any...', 'fast')
  await type('Check out this cool typing effect though!!', 'fast')
  await type('It even has various speeds...', 'slow')
  await type('Also I have access to the playername:', 'fast')
  await type(`Hi ${player.name}!! <3`, 'fast')
}