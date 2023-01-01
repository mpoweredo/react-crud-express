import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { axiosBaseQuery } from '@/backend/axiosBaseQuery'
import { RootState } from '../../store/store'

const backendApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (api) => {
      const headers: Record<string, string> = {
        accept: 'application/json',
      }

      const state = api.getState() as RootState

      const token = state.auth.token

      const checkIsClientSide = () =>
        !!(
          typeof window !== 'undefined' &&
          window.document &&
          window.document.createElement
        )

      if (checkIsClientSide()) {
        if (token) {
          headers.authorization = token
        }

        return headers
      }

      // // find any cookies in the request
      // let cookies: Partial<{ [key: string]: string }> = {}
      // if ('req' in ctx && ctx.req && 'cookies' in ctx.req && ctx.req.cookies) {
      //   cookies = ctx.req.cookies
      // }
      //
      // const token = cookies['jwt']
      //
      // if (token) {
      //   headers.authorization = token
      // }

      return headers
    },
  }),
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ['Todos'],
  endpoints: () => ({}),
})

export { backendApi }
