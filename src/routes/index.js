import express from 'express'
import passport from 'passport'

import middlewares from '../utils/middlewares'
import userController from '../controllers/user'

const router = express.Router()

router.get(
  '/register.html',
  middlewares.preAuthMiddleware,
  async (req, res) => {
    res.render('register', {
      title: 'Empyrean | Registration',
      subTitle: 'Registration page',
    })
  }
)

router.post(
  '/register.html',
  middlewares.preAuthMiddleware,
  userController.signup
)

router.get('/login.html', middlewares.preAuthMiddleware, async (req, res) => {
  res.render('login', { title: 'Empyrean | login', subTitle: 'Login page' })
})

router.post(
  '/login.html',
  middlewares.preAuthMiddleware,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login.html',
    failureFlash: true,
  }),
  userController.signin
)

router.get('', async (req, res) => {
  res.render('index', { title: 'Empyrean', subTitle: 'Home page' })
})

export default router
