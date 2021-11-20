const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const logger = require('./utils/logger')

const server = http.createServer(app)
const PORT = 5000
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})