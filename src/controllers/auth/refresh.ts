import { Request, Response } from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { TUserData } from './auth.type'
import { db } from '@/db'

const refreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies

  if (!cookies.jwt) return res.sendStatus(403)

  const refreshTokenCookie = cookies.jwt

  jwt.verify(
    refreshTokenCookie,
    process.env.REFRESH_TOKEN_SECRET as string,

    // @ts-expect-error FIXME: fix ts errors
    async (error: VerifyErrors | null, decoded: TUserData) => {
      if (error) {
        res.clearCookie('jwt', {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        res.sendStatus(403)

        return
      }

      const foundUser = await db.user.findFirst({
        where: {
          email: decoded.email,
        },
      })

      if (!foundUser) return res.sendStatus(403)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...user } = foundUser

      const accessToken = jwt.sign(
        {
          email: user.email,
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '10s' }
      )
      res.status(200).json({ token: accessToken, user })
    }
  )
}

export { refreshToken }