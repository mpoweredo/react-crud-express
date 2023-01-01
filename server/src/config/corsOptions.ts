import { allowedOrigins } from './allowedOrigins'
import cors from 'cors'

const corsOptions: cors.CorsOptions = {
  // origin: (origin, callback) => {
  //   console.log(origin)
  //   if (!origin) return
  //
  //   if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
  //     callback(null, true)
  //   } else {
  //     callback(new Error('Not allowed by CORS!'))
  //   }
  // },
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
}

export { corsOptions }
