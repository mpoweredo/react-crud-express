import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { CustomResponse } from '@/types/customResponse'

const verifyJWT = (req: Request, res: CustomResponse, next: NextFunction) => {
  const token = req.headers.authorization

  if (!token) {
    res.sendStatus(403)
    return
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error: any) => {
    if (error) return res.sendStatus(403)

    next()
  })
}

export { verifyJWT }
