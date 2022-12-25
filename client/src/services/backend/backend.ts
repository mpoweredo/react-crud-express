import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { RootState } from '../../store/store'
import { logout, setCredentials } from '../../store/auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/',
  credentials: 'include',
  prepareHeaders(headers, { getState }) {
    const token = (getState() as RootState).auth.token

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  console.log(result)

  // TODO FIX TYPOS
  if (result.error && result.error.originalStatus === 401) {
    console.log('sending refresh token')

    const refreshResult = await baseQuery('/refresh', api, extraOptions)

    console.log(refreshResult)

    console.log('asdasd', refreshResult)

    if ('data' in refreshResult) {
      // TODO FIX TYPOS
      api.dispatch(setCredentials({ ...refreshResult.data }))

      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())

      return refreshResult
    }
  }

  return result
}

const backendApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['Todos'],
})

export { backendApi }
