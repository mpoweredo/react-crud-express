import express from 'express'
import { signout } from 'src/controllers/auth/logout'
import { refreshToken } from 'src/controllers/auth/refresh'
import { signin } from 'src/controllers/auth/signin'
import { signup } from 'src/controllers/auth/signup'
import { loginLimiter } from '../middlewares/LoginLimiter'

const router = express.Router()

router.route('/signup').post(signup)

router.route('/signin').post(loginLimiter, signin)

router.route('/refresh').get(refreshToken)

router.route('/signout').post(signout)

export { router as authRoute }
