import express from 'express'
import { addTodo } from 'src/controllers/todo/addTodo'
import { deleteTodo } from 'src/controllers/todo/deleteTodo'
import { editTodo } from 'src/controllers/todo/editTodo'
import { getTodo } from 'src/controllers/todo/getTodo'
import { getTodos } from 'src/controllers/todo/getTodos'
import { verifyJWT } from '../middlewares/verifyJWT'
import { getTodoTags } from '@/controllers/todo/getTodoTags'

const router = express.Router()

router.route('/tags').get(getTodoTags)

router.use(verifyJWT)

router.route('/').post(addTodo).get(getTodos).delete(deleteTodo).patch(editTodo)

router.route('/:id').get(getTodo)

export { router as todoRoute }
