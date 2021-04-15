const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

module.exports = async () => {
  return await new Promise((res) => {
    rl.question('What is your name? ', (name) => {
      // Clear console
      process.stdout.write('\033c')

      rl.question('Skip intro? ', (skip) => {
        res({ playername: name, skip: skip.toLowerCase() === 'yes'} )

        // Clear console
        process.stdout.write('\033c')
      })
    })
  })
}