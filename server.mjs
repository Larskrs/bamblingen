import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { logger } from './logger'
 
const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
 
app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port)
 
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )

  logger.info("Server started")
  logger.info(`${process.env.AUTH_GOOGLE_ID}, ${process.env.AUTH_GOOGLE_SECRET}, ${process.env.AUTH_SECRET}, ${process.env.AUTH_URL}`)
})