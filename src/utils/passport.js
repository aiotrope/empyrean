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

export const sessionStrategy = (passport, getUserByEmail, getUserById) => {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)

    if (user === null) {
      return done(null, false, { message: 'User not found!' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Incorrect login credentials!' })
      }
    } catch (err) {
      return done(err)
    }
  }

  const LocalStrategy = passportLocal.Strategy

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))

  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

export default jwtStrategy
