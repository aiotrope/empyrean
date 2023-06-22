import express from 'express'
import passport from 'passport'

import todoController from '../controllers/todo'
import middlewares from '../utils/middlewares'
import { createTodoSchema } from '../utils/validators'

const router = express.Router()

router.post(
  '/todos',
  middlewares.validateAuthObject(createTodoSchema),
  passport.authenticate('jwt', { session: false }),
  todoController.createTodo
)

router.get(
  '/todos',
  passport.authenticate('jwt', { session: false }),
  todoController.fetchAllTodos
)

export default router
