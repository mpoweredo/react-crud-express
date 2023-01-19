import { db } from '@/db'
import { Response, Request } from 'express'

const getTodoTags = async (req: Request, res: Response) => {
  try {
    const todoTags = await db.tag.findMany()

    res.status(200).json(todoTags)
  } catch (error) {
    res.sendStatus(400)
  }
}

export { getTodoTags }
