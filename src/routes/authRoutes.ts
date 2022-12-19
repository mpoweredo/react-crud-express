import express from 'express'
import { signup } from 'src/controllers/auth/signup'

const router = express.Router()

router.route('/signup').post(signup)

export { router as authRoute }
