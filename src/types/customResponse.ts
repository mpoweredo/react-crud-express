import { Response } from 'express'

type TJson = {
  message: string
  description?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

type TSend<T = Response> = (body?: TJson) => T

interface CustomResponse extends Response {
  json: TSend<this>
}

export type { CustomResponse }
