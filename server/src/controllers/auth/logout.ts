import { CustomResponse } from '@/types/customResponse'
import { Request } from 'express'

const signout = async (req: Request, res: CustomResponse) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })

  res.json({ message: 'Signed out!' })
}

export { signout }
