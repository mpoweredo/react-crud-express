import { db } from '@/db'
import { CustomRequest } from '@/types/customRequest'
import { Response, Request } from 'express'

const getTodo = async (req: Request<{ id: number }>, res: Response) => {
  const id = +req.params.id

  if (!id) return res.status(400).json({ message: 'No id provided!' })

  const postData = await db.todo.findUnique({
    where: {
      id,
    }
  })

  res.status(200).json(postData)
}

export { getTodo }
