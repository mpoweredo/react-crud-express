import { db } from '@/db'
import { CustomRequest } from '@/types/customRequest'
import { Response } from 'express'
import { ITodo } from './todo.type'

const deleteTodo = async (req: CustomRequest<ITodo>, res: Response) => {
  const { id } = req.body

  if (!id) return res.status(400).json({ message: 'No id provided!' })

  const addedTodo = await db.todo.delete({
    where: {
      id,
    }
  })

  res.status(200).json({ message: 'Todo deleted successfully!' })
}

export { deleteTodo }
