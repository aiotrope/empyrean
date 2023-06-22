import config from './config.js'
import mongoose from 'mongoose'
import logger from './logger.js'

const opts = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const MongoDatabase = () => {
  mongoose.set('strictQuery', false)

  const dbURL = config.mongo_url

  mongoose.connect(dbURL, opts)

  const conn = mongoose.connection

  conn.once('open', () => {
    logger.info(`Database connected: ${dbURL}`)
  })

  conn.on('error', (error) => {
    logger.error(`connection error: ${error}`)
  })
}

export default MongoDatabase
