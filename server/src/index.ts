import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'
import { todoRoute } from './routes/todoRoutes'
import { corsOptions } from './config/corsOptions'
import cookieParser from 'cookie-parser'
import { authRoute } from './routes/authRoutes'

config()

const app = express()

app.use(cors(corsOptions))

app.use(cookieParser())

app.use(express.json())

app.use('/todo', todoRoute)

app.use('/', authRoute)

app.listen(5000)
