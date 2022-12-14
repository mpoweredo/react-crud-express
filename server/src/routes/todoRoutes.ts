import express from 'express'
import { addTodo } from 'src/controllers/todo/addTodo'
import { deleteTodo } from 'src/controllers/todo/deleteTodo'
import { getTodo } from 'src/controllers/todo/getTodo'
import { getTodos } from 'src/controllers/todo/getTodos'

const router = express.Router()

router.route('/').post(addTodo).get(getTodos).delete(deleteTodo)

router.route('/:id').get(getTodo)

export { router as todoRoute }