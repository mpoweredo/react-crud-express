import express from 'express'
import { addTodo } from 'src/controllers/todo/addTodo'
import { deleteTodo } from 'src/controllers/todo/deleteTodo'
import { getTodos } from 'src/controllers/todo/getTodos'

const router = express.Router()

router.route('/').post(addTodo).get(getTodos).delete(deleteTodo)

export { router as todoRoute }