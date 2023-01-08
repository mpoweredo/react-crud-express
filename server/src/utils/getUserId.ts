import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { TUserData } from '@/controllers/auth/auth.type'

const getUserId = (req: Request): number => {
  const { authorization: token } = req.headers as { authorization: string }

  const { id } = jwt.decode(token) as TUserData

  return id
}

export { getUserId }
