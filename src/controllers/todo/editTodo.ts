import { db } from '@/db'
import { CustomRequest } from '@/types/customRequest'
import { Response } from 'express'
import { ITodo } from './todo.type'

const editTodo = async (req: CustomRequest<ITodo>, res: Response) => {
  const { title, completed, id } = req.body

  if (!id) return res.status(400).json({ message: 'No id provided!' })
  if (!title.trim()) return res.status(400).json({ message: 'Title is required!' })

  try {
    await db.todo.update({
      data: {
        title, completed
      },
      where: {
        id,
      }
    })

    res.status(200).json({ message: 'Todo Edited successfully!' })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: 'Something went wrong while editing todo!' })
    }
  }
}

export { editTodo }
