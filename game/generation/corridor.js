module.exports.connect = (firstRoom, secondRoom) => {
  const firstHole = getWallHole(firstRoom.find(x => x.entrance))
  const secondHole = getWallHole(secondRoom.find(x => x.entrance))

  return {
    holes: [firstHole, secondHole]
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