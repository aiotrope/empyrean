import express from 'express'

//import logger from '../utils/logger'

const router = express.Router()

router.get('/register.html', async (req, res) => {

  res.render('register', { title: 'Empyrean | Registration', subTitle: 'Registration page' })
})


router.get('/login.html', async (req, res) => {

  res.render('login', { title: 'Empyrean | login', subTitle: 'Login page' })
})

router.get('', async (req, res) => {

  res.render('index', { title: 'Empyrean' })
})

export default router
