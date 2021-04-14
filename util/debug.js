const chalk = require('chalk')

module.exports = (...args) => {
  if (process.argv.includes('--debug')) console.log(chalk.green('[DEBUG]'), args.join(' '))
}