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
module.exports = (size, location, entranceSide) => {
  const sides = [
    // Top
    {
      angle: 'horiz',
      size: size.width-1,
      start: { x: location.x, y: location.y + size.height },
    },
    // Right
    {
      angle: 'vert',
      size: size.height,
      start: { x: location.x + size.width-1, y: location.y }
    },
    // Bottom
    {
      angle: 'horiz',
      size: size.width-1,
      start: { x: location.x, y: location.y }
    },
    // Left
    {
      angle: 'vert',
      size: size.height,
      start: { x: location.x, y: location.y }
    }
  ]

  if (entranceSide === 'top') sides[0].entrance = true
  if (entranceSide === 'right') sides[1].entrance = true
  if (entranceSide === 'bottom') sides[2].entrance = true
  if (entranceSide === 'left') sides[3].entrance = true

  return sides
}