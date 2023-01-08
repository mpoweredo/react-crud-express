import { CustomRequest } from '@/types/customRequest'
import { TSignup } from './auth.type'
import { db } from '@/db'
import { hashSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { CustomResponse } from '@/types/customResponse'

// eslint-disable-next-line
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const signup = async (req: CustomRequest<TSignup>, res: CustomResponse) => {
  const { name, email, password } = req.body

  if (!name.trim())
    return res.status(400).json({ message: 'Name is required!' })
  if (!emailRegex.test(email))
    return res.status(400).json({ message: 'Thats not an email!' })
  if (!password.trim() || password.length < 8)
    return res.status(400).json({
      message: 'Error!',
      description: 'Password should contain atleast 8 characters',
    })

  try {
    const existingUser = await db.user.findFirst({
      where: {
        email,
      },
    })

    if (existingUser)
      return res.status(400).json({
        message: 'Error!',
        description: 'Account with this email already exists!',
      })

    const hashedPassword = hashSync(password, 12)

    const createdUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = createdUser

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
      description: 'Created account successfully!',
    })
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(400)
        .json({ message: 'Something went wrong. Try again later!' })
    }
  }
}

export { signup }
