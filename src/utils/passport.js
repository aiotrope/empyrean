import config from './config'
import { Strategy, ExtractJwt } from 'passport-jwt'
import * as passportLocal from 'passport-local'
import bcrypt from 'bcrypt'

import User from '../models/user'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret,
  passReqToCallback: true,
}
//options.issuer = ???;
//options.audience = ???;

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
}

const LocalStrategy = passportLocal.Strategy

export const jwtStrategy = (passport) => {
  passport.use(
    new Strategy(options, async (req, payload, done) => {
      const user = await User.findOne({ email: payload.email })
      if (user) {
        req.user = user // current user Obj

        return done(null, user)
      }

      return done(null, false)
    })
  )
}

const verifyAuthCredentialsCallback = (email, password, done) => {
  User.findOne({ email }).then((user) => {
    if (!user) {
      return done(null, false, { message: 'Invalid credential' })
    } else {
      const isCorrectPassword = bcrypt.compareSync(password, user.password)
      if (!isCorrectPassword) {
        return done(null, false, { message: 'Invalid credential' })
      } else {
        return done(null, user)
      }
    }
  })
}

export const authenticateUserLocal = (passport) => {
  passport.use(new LocalStrategy(customFields, verifyAuthCredentialsCallback))

  passport.serializeUser((user, done) => done(null, user.id))

  passport.deserializeUser((id, done) =>
    User.findById(id)
      .then((user) => done(null, user))
      .catch((err) => done(err))
  )
}

