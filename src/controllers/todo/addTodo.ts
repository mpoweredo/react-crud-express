import { db } from '@/db'
import { CustomRequest } from '@/types/customRequest'
import { Response } from 'express'
import { INewTodo } from './todo.type'

const addTodo = async (req: CustomRequest<INewTodo>, res: Response) => {
  const { completed, title = '' } = req.body

  if (!title.trim()) return res.status(400).json({ message: 'Title is required!' })

  const addedTodo = await db.todo.create({
    data: {
      title,
      completed
    }
  })

  console.log(addedTodo)

  res.status(200).json(addedTodo)
}

export { addTodo }
