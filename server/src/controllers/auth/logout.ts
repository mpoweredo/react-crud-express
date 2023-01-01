import { CustomResponse } from '@/types/customResponse'
import { Request } from 'express'

const signout = async (req: Request, res: CustomResponse) => {
  console.log('hejcia')

  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })

  res.json({ message: 'Signed out!' })
}

export { signout }
