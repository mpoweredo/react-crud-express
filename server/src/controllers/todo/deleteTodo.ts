import { db } from '@/db'
import { CustomRequest } from '@/types/customRequest'
import { Response } from 'express'
import { ITodo } from './todo.type'
import { getUserId } from '../../utils/getUserId'

const deleteTodo = async (req: CustomRequest<ITodo>, res: Response) => {
  const { id: todoId } = req.body

  const userId = getUserId(req)

  if (!todoId) return res.status(400).json({ message: 'No id provided!' })

  try {
    await db.todo.deleteMany({
      where: {
        id: todoId,
        userId,
      },
    })

    res.status(200).json({ message: 'Todo deleted successfully!' })
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(400)
        .json({ message: 'Something went wrong while deleting todo!' })
    }
  }
}

export { deleteTodo }
