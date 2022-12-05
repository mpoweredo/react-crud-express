import express from 'express'
import { addTodo } from 'src/controllers/todo/addTodo'

const router = express.Router()

router.route('/').post(addTodo)

export { router as todoRoute }