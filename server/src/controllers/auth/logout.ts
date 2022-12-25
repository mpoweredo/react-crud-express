import { CustomResponse } from '@/types/customResponse'
import { Request } from 'express'

const signout = async (req: Request, res: CustomResponse) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //No content
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
  res.clearCookie('isLoggedIn')
  res.json({ message: 'Signed out!' })
}

export { signout }
