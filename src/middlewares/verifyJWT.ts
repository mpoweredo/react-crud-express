import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { CustomResponse } from '@/types/customResponse'

const verifyJWT = (req: Request, res: CustomResponse, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.sendStatus(401)
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error) => {
    if (error) return res.sendStatus(403)

    next()
  })
}

export { verifyJWT }
