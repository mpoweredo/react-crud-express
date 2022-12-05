import { config } from 'dotenv'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { todoRoute } from './routes/todoRoutes'
import { corsOptions } from './config/corsOptions'

config()

const app = express()

app.use(cors(corsOptions))

app.use(express.json())

app.use('/todo', todoRoute)

app.get('/', async (req: Request, res: Response) => {
  res.send('Done')
})


app.listen(5000)