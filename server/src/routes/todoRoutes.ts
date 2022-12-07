import express from 'express'
import { addTodo } from 'src/controllers/todo/addTodo'
import { getTodos } from 'src/controllers/todo/getTodos'

const router = express.Router()

router.route('/').post(addTodo).get(getTodos)

export { router as todoRoute }