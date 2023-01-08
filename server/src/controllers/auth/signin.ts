import { CustomRequest } from '@/types/customRequest'
import { TSignin } from './auth.type'
import { db } from '@/db'
import { compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { CustomResponse } from '@/types/customResponse'

// eslint-disable-next-line
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const signin = async (req: CustomRequest<TSignin>, res: CustomResponse) => {
  const { email, password } = req.body

  if (!emailRegex.test(email))
    return res.status(400).json({ message: 'Thats not an email!' })
  if (!password.trim() || password.length < 8)
    return res.status(400).json({
      message: 'Error!',
      description: 'Password should contain at least 8 characters',
    })

  try {
    const foundUser = await db.user.findFirst({
      where: {
        email,
      },
    })

    if (!foundUser)
      return res.status(400).json({
        message: 'Error!',
        description: 'Credentials are invalid!',
      })

    const { password: hashedPassword } = foundUser

    const isPasswordCorrect = compareSync(password, hashedPassword)

    if (!isPasswordCorrect)
      return res.status(400).json({
        message: 'Error!',
        description: 'Credentials are invalid!',
      })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = foundUser

    const token = {
      id: user.id,
    }

    const accessToken = jwt.sign(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: '60d',
      }
    )

    const refreshToken = jwt.sign(
      token,
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: '90d',
      }
    )

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7776000,
    })

    res.json({
      token: accessToken,
      user,
      message: 'Success!',
      description: 'Signed in successfully!',
    })
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(400)
        .json({ message: 'Something went wrong. Try again later!' })
    }
  }
}

export { signin }
