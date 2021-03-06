/**
 * Player object for keeping track of x/y coords, as well as other
 * data like inventory and such.
 */
class Player {
  constructor(name) {
    this.name = name

    // Init with x and y of 0
    this.x = 0
    this.y = 0

    // Array of items
    this.inventory = []
  }
}

module.exports = Player