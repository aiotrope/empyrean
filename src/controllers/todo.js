require('express-async-errors')

import Todo from '../models/todo'

const createTodo = async (req, res) => {
  const currentUser = req.user

  try {
    let createOrUpdateUserTodos = await Todo.findOneAndUpdate(
      { user: currentUser.id },
      { $push: { items: { $each: req.body.items } } },
      { new: true, upsert: true }
    )

    if (createOrUpdateUserTodos) return res.status(200).send('ok')
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
}

const fetchAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find({}).populate('user', { id: 1, email: 1 })

    res.status(200).json(allTodos)
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
}

export default {
  createTodo,
  fetchAllTodos,
}