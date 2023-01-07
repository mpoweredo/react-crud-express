import express from 'express'

import { loginLimiter } from '../middlewares/LoginLimiter'
import {signup} from "../controllers/auth/signup";
import {signin} from "../controllers/auth/signin";
import {refreshToken} from "../controllers/auth/refresh";
import {signout} from "../controllers/auth/logout";

const router = express.Router()

router.route('/signup').post(signup)

router.route('/signin').post(loginLimiter, signin)

router.route('/refresh').get(refreshToken)

router.route('/signout').get(signout)

const authRoute = router

export { authRoute }
