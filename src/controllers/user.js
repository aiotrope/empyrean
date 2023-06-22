import config from '../utils/config'
require('express-async-errors')
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user'

const signup = async (req, res) => {
  let { email, password } = req.body

  try {
    const foundUser = await User.findOne({ email })

    if (foundUser) throw Error('Email already in use')

    const saltRounds = 10

    const hashed = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
      email: email,
      password: hashed,
    })

    const response = await User.create(newUser)

    //return res.status(200).json({ id: response.id, email: response.email })
    return res.status(200).send({ id: response.id, email: response.email, redirect_path: '/login.html' })
  } catch (err) {
    res.status(403).json({ error: err.message })
  }
}

const signin = async (req, res) => {
  let { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    const correctPassword =
      user === null ? false : await bcrypt.compare(password, user.password)

    if (!(user && correctPassword)) throw Error('Invalid credentials')

    const payload = {
      email: user.email,
      id: user.id,
    }

    const token = jwt.sign(payload, config.secret, { expiresIn: '1h' })

    //res.status(200).json({ success: true, token: token, email: payload.email })
    res.status(200).send({ success: true, token: token, email: payload.email, redirect_path: 'http://localhost:3000' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const privateRoute = async (req, res) => {
  try {
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
