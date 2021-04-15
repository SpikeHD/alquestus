/**
 * Room generation
 * 
 * @param {Object} size
 * @param {Number} size.width
 * @param {Number} size.height 
 * @param {Object} location
 * @param {Number} location.x
 * @param {Number} location.y
 * @param {Array} exits 
 * @param {String} entranceSide
 */
module.exports = (size, location, exits, entranceSide, entranceOffset) => {
  // TODO: entrace/exit calculation

  return [
    // Top
    {
      angle: 'horiz',
      size: size.width,
      start: { x: location.x, y: location.y }
    },
    // Right
    {
      angle: 'vert',
      size: size.height,
      start: { x: location.x + size.width, y: location.y }
    },
    // Bottom
    {
      angle: 'horiz',
      size: size.width,
      start: { x: location.x, y: location.y }
    },
    // Left
    {
      angle: 'vert',
      size: size.height,
      start: { x: location.x, y: location.y + size.height }
    }
  ]
}