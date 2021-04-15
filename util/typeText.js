// Yeah yeah hardcoded speeds whatever
const speeds = {
  slow: 100,
  medium: 50,
  fast: 5
}

module.exports = async (text, speed) => {
  const arr = text.split('')

  for (let i = 0; i < arr.length; i++) {
    await new Promise(res => {
      setTimeout(() => {
        process.stdout.write(arr[i])
        res()
      }, speeds[speed] || 50)
    })
  }

  // Break line when done
  process.stdout.write('\n')

  return
}