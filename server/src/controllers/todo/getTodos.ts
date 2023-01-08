import { db } from '@/db'
import { Response, Request } from 'express'
import { getUserId } from '../../utils/getUserId'

const getTodos = async (req: Request, res: Response) => {
  const id = getUserId(req)

  const todos = await db.todo.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      userId: id,
    },
  })

  res.status(200).json(todos)
}

export { getTodos }
