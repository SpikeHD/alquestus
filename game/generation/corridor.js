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

    // Push the first half of the wall, which ends where the vertical one will begin
    walls.push({
      angle: fSide.angle,
      size: (holes[0][axis] + holes[1][axis])/2,
      start: { x: holes[0].x + (axis === 'x' ? 1:0), y: holes[0].y + (axis === 'y' ? 1:0) }
    })

    // Other side, yknow, since it's a hallway
    walls.push({
      angle: fSide.angle,
      size: (holes[0][axis] + holes[1][axis])/2,
      start: { x: holes[0].x - (axis === 'x' ? 1:0), y: holes[0].y - (axis === 'y' ? 1:0) }
    })
  }

  console.log(walls)

  return walls
}