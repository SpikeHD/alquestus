const draw = (text) => console.log(text)
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let menuActive = true

const columns = process.stdout.columns
const rows = process.stdout.rows-2

module.exports = async () => {
  return await new Promise((res) => {
    rl.question('What is your name? ', (name) => {
      res(name)

      // Clear console
      process.stdout.write('\033c')
    })
  })
}