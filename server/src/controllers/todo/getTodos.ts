import { db } from '@/db'
import { Response, Request } from 'express'

const getTodos = async (req: Request, res: Response) => {
  const todos = await db.todo.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  res.status(200).json(todos)
}

export { getTodos }