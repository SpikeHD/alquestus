module.exports.connect = (first, second) => {
  const firstHole = getWallHole(first.find(x => x.entrance))
  const secondHole = getWallHole(second.find(x => x.entrance))
  const holes = [firstHole, secondHole]

  return {
    walls: generateWalls(first, second, holes),
    holes
  }
}

function getWallHole(side) {
  if (side.angle === 'horiz') {
    return {
      x: side.start.x + Math.round(side.size/2),
      y: side.start.y
    }
  } else if (side.angle === 'vert') {
    return {
      x: side.start.x,
      y: side.start.y + Math.round(side.size/2)
    }
  }
}

function generateWalls(first, second, holes) {
  const fSide = first.find(x => x.entrance)
  const sSide = second.find(x => x.entrance)
  const walls = []

  // Horiz with Horiz or Vert with Vert
  if (fSide.angle === sSide.angle) {
    // Flip the axis
    // NOTE TO FUTURE SELF YES THIS IS SUPPOSED TO FLIP THEM YOU FUCKING BUFFOON
    const axis = fSide.angle === 'horiz' ? 'y':'x'
    // YES THIS NEEDS TO BE FLIPPED TOO BITCH
    const drawAngle = fSide.angle === 'horiz' ? 'vert':'horiz'
    let length = holes[1][axis === 'x' ? 'y':'x'] - holes[0][axis === 'x' ? 'y':'x']
    let size = Math.round((holes[1][axis] - holes[0][axis])/2)

    // Ending positions
    const endX = holes[1].x - size
    const endY = holes[1].y - size

    // This is the line that leads EXACTLY from the 
    const startLine = {
      angle: drawAngle,
      size,
      start: { x: holes[0].x, y: holes[0].y }
    }

    if (length < 0) {
      length = -length
    }

    const midLine = {
      angle: fSide.angle,
      size: length,
      start: { x: startLine.start.x + size, y: startLine.start.y + size }
    }

    const endLine = {
      angle: drawAngle,
      size,
      start: { x: endX, y: endY }
    }

    walls.push(startLine)
    walls.push(midLine)
    walls.push(endLine)
  }

  return walls
}