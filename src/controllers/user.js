import config from '../utils/config'
require('express-async-errors')
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user'
//import logger from '../utils/logger'

const signup = async (req, res) => {
  let { email, password } = req.body
  try {
    const foundUser = await User.findOne({ email })

    if (foundUser) throw Error('Email already in use.')

    //logger.debug(JSON.stringify(body, null, 2))

    const saltRounds = 10

    const hashed = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
      email: email,
      password: hashed,
    })

    await User.create(newUser)

    return res.status(200).send('ok')
  } catch (err) {
    res.status(403).json({ error: err.message })
  }
}

const signin = async (req, res) => {
  let { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    const correctPassword =
      user !== null ? bcrypt.compare(password, user.password) : false

    if (!(user && correctPassword)) throw Error('Invalid login credentials!')

    const payload = {
      email: user.email,
      id: user.id,
    }

    const token = jwt.sign(payload, config.secret, { expiresIn: '1h' })

    res.status(200).json({ success: true, token: token })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const privateRoute = async (req, res) => {
  try {
    //logger.debug(req.user)
    const currentUser = req.user

    res.status(200).json({ email: currentUser.email })
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
}

export default {
  signup,
  signin,
  privateRoute,
}