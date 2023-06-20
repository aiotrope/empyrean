import config from './config'
import { Strategy, ExtractJwt } from 'passport-jwt'

import User from '../models/user'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret,
  passReqToCallback: true,
}

const jwtStrategy = (passport) => {
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

export default jwtStrategy