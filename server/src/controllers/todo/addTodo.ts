import { db } from '@/db'
import { CustomRequest } from '@/types/customRequest'
import { Response } from 'express'
import { INewTodo } from './todo.type'
import { getUserId } from '../../utils/getUserId'

const addTodo = async (req: CustomRequest<INewTodo>, res: Response) => {
  const { completed, title = '' } = req.body

  const id = getUserId(req)

  if (!title.trim())
    return res.status(400).json({ message: 'Title is required!' })

  const { tags } = req.body

  const selectedIds = tags.map(({ value }) => value)

  const finalTagsIds = await db.tag
    .findMany({
      where: {
        id: { in: selectedIds },
      },
    })
    .then((values) =>
      values.map(({ id }) => {
        return { id }
      })
    )

  try {
    await db.todo.create({
      data: {
        title,
        completed,
        userId: id,
        tags: {
          connect: finalTagsIds,
        },
      },
      include: {
        tags: true,
      },
    })

    return res.status(200).json({ message: 'Todo added successfully!' })
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return res.status(400).json({
        message: 'Error!',
        description: 'Something went wrong while adding todo.',
      })
    }
  }
}

export { addTodo }
