import { db } from '@/db'
import { CustomRequest } from '@/types/customRequest'
import { Response } from 'express'
import { INewTodo } from './todo.type'

const addTodo = async (req: CustomRequest<INewTodo>, res: Response) => {
  const { completed, title = '' } = req.body

  if (!title.trim()) return res.status(400).json({ message: 'Title is required!' })

  try {
    await db.todo.create({
      data: {
        title,
        completed
      }
    })

    return res.status(200).json({ message: 'Todo added successfully!' })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: 'Error!', description: 'Something went wrong while adding todo.' })
    }
  }
}

export { addTodo }
