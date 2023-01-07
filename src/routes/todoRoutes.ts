import express from 'express'

import { verifyJWT } from '../middlewares/verifyJWT'
import {getTodos} from "../controllers/todo/getTodos";
import {deleteTodo} from "../controllers/todo/deleteTodo";
import {editTodo} from "../controllers/todo/editTodo";
import {getTodo} from "../controllers/todo/getTodo";
import {addTodo} from "../controllers/todo/addTodo";

const router = express.Router()

router.use(verifyJWT)

router.route('/').post(addTodo).get(getTodos).delete(deleteTodo).patch(editTodo)

router.route('/:id').get(getTodo)

const todoRoute = router

export { todoRoute }
