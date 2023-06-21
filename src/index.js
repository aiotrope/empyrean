import config from './utils/config'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import session from 'express-session'
import passport from 'passport'
import flash from 'express-flash'
import ejsLayouts from 'express-ejs-layouts'

import MongoDatabase from './utils/db'
import middlewares from './utils/middlewares'
import logger from './utils/logger'
import { jwtStrategy } from './utils/passport'

import indexRouter from './routes/index'
import userRouter from './routes/user'
import todoRouter from './routes/todo'

const app = express()

MongoDatabase()

jwtStrategy(passport)

app.set('views', path.join(__dirname, '../views'))

app.set('view engine', 'ejs')

app.use(ejsLayouts)

app.use(express.static(path.join(__dirname, '../public')))

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

app.use(cors())

app.use(flash())

app.use(
  session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())

app.use(passport.session())

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        /* eslint-disable-next-line quotes */
        'script-src': ["'self'"],
        /* eslint-enable-next-line quotes */
      },
    },
  })
)

app.use(middlewares.loggingMiddleware)

app.use('/', indexRouter)

app.use('/api', userRouter)

app.use('/api', todoRouter)

app.use(middlewares.endPoint404)

app.use(middlewares.errorHandler)

app.listen(config.port, () => {
  logger.http(`Server is running on port ${config.port}`)
})
