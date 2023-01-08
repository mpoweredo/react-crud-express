import { db } from '@/db'
import { CustomRequest } from '@/types/customRequest'
import { Response } from 'express'
import { ITodo } from './todo.type'
import { getUserId } from '../../utils/getUserId'

const editTodo = async (req: CustomRequest<ITodo>, res: Response) => {
  const { title, completed, id: todoId } = req.body

  const userId = getUserId(req)

  if (!todoId) return res.status(400).json({ message: 'No id provided!' })
  if (!title.trim())
    return res.status(400).json({ message: 'Title is required!' })

  try {
    await db.todo.updateMany({
      data: {
        title,
        completed,
      },
      where: {
        id: todoId,
        userId,
      },
    })

    res.status(200).json({ message: 'Todo Edited successfully!' })
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(400)
        .json({ message: 'Something went wrong while editing todo!' })
    }
  }
}

export { editTodo }
