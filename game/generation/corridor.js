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
    // NOT TO SELF: DONT HARDCODE AS length OR ELSE I WONT BE ABLE TO DO VERT WALL ENTRANCES
    let length = holes[1].y - holes[0].y
    let size = Math.round((holes[1][axis] - holes[0][axis])/2)

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

    // Create opposite angled middle
    if (length !== 0) {
      // Get whatever wall is on the side closest to the next rooms entrance
      // I am so tired I really hope this is the best way to do this
      const closerWall = walls.reduce((prev, cur) => (Math.abs(cur[axis] - holes[1][axis]) < Math.abs(prev[axis] - holes[1][axis])) ? cur : prev)
      let startX = closerWall.start.x < holes[1].x ? closerWall.start.x + closerWall.size : closerWall.start.x 
      let startY = closerWall.start.y < holes[1].y ? closerWall.start.y + closerWall.size : closerWall.start.y

      // Add an extra wall to the farther wall to create a proper corner
      walls[walls.indexOf(walls.find(w => w !== closerWall))].size += 2

      // Negative length? Draw from end to start instead
      if (length < 0) {
        length = -length

        startY = startY-length
      }

      // Closer wall
      walls.push({
        angle: fSide.angle,
        size: length,
        start: { x: startX, y: startY  }
      })

      // Farther wall
      walls.push({
        angle: fSide.angle,
        size: length + 2,
        start: { x: startX + (fSide.angle === 'horiz' ? 2:0), y: startY + (fSide.angle === 'vert' ? 2:0) }
      })
    }
  }

  return walls
}