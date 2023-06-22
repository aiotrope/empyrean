import createHttpError from 'http-errors'
import morgan from 'morgan'
import logger from './logger'

const stream = {
  write: (message) => logger.http(message),
}

const skip = () => {
  const env = process.env.NODE_ENV || 'development'

  return env !== 'development'
}

const loggingMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
)

const validateAuthObject = (schema) => async (req, res, next) => {
  const resource = req.body

  try {
    await schema.validate(resource)

    next()
  } catch (err) {
    logger.error(err)

    res.status(400).json({ error: err.errors.join(', ') })
  }
}

const endPoint404 = (req, res, next) => {
  next(createHttpError(404))
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)
  logger.debug(error.errors)

  if (error.name === 'CastError') {
    return res.status(400).json({
      error: `${error.name}: invalid ${error.path} using ${error.value}`,
    })
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  if (error.name === 'NotFoundError') {
    return res.status(404).json({ error: error.message })
  }
  if (error.name === 'MongoServerError') {
    return res.status(400).json({
      error: `duplicate username ${req.body.username} cannot be registered!`,
    })
  }

  if (error.name === 'TypeError') {
    return res.status(400).json({ error: error.message })
  }

  if (
    error.name === 'JsonWebTokenError' ||
    error.name === 'UnauthorizedError'
  ) {
    return res
      .status(401)
      .json({ error: 'unauthorize: token maybe incorrect or missing!' })
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired!' })
  }

  if (error.message === 'Email already in use') {
    return res.status(403).json({ error: error.message })
  }

  if (error.message === 'Invalid credentials') {
    return res.status(401).json({ error: error.message })
  }

  next(error)
}

const middlewares = {
  loggingMiddleware,
  endPoint404,
  errorHandler,
  validateAuthObject,
}

export default middlewares
