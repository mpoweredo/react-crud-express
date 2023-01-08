import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { TUserData } from './auth.type'
import { db } from '@/db'

const refreshToken = async (req: Request, res: Response) => {
  const refreshTokenCookie = req.cookies.jwt as string

  if (!refreshTokenCookie) return res.sendStatus(401)

  jwt.verify(
    refreshTokenCookie,
    process.env.REFRESH_TOKEN_SECRET as string,
    async (error, decoded) => {
      if (error || !decoded) {
        res.sendStatus(401)

        return
      }

      const { id } = decoded as TUserData

      const foundUser = await db.user.findFirst({
        where: {
          id,
        },
      })

      if (!foundUser) return res.sendStatus(401)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...user } = foundUser

      const token = {
        id: user.id,
      }

      const accessToken = jwt.sign(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '60d' }
      )

      res.status(200).json({ token: accessToken, user })
    }
  )
}

export { refreshToken }
