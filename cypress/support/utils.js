function generateTimestamp() {
    const timestamp = new Date().toISOString()
    return timestamp
  }

module.exports = { generateTimestamp };