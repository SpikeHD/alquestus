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
    let size = Math.round((holes[1][axis] - holes[0][axis]))/2

    // Push the first half of the wall, which ends where the vertical one will begin
    walls.push({
      angle: drawAngle,
      size: size,
      start: { x: holes[0].x + (axis === 'x' ? 0:1), y: holes[0].y + (axis === 'y' ? 0:1) }
    })

    // Other side, yknow, since it's a hallway
    walls.push({
      angle: drawAngle,
      size: size,
      start: { x: holes[0].x - (axis === 'x' ? 0:1), y: holes[0].y - (axis === 'y' ? 0:1) }
    })
  }

  return walls
}