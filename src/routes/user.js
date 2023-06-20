import express from 'express'
import passport from 'passport'

import userController from '../controllers/user'
import middlewares from '../utils/middlewares'
import { signupSchema, signinSchema } from '../utils/validators'

const router = express.Router()

router.post(
  '/user/register',
  middlewares.validateAuthObject(signupSchema),
  userController.signup
)

router.post(
  '/user/login',
  middlewares.validateAuthObject(signinSchema),
  userController.signin
)

router.get(
  '/private',
  passport.authenticate('jwt', { session: false }),
  userController.privateRoute
)

export default router
