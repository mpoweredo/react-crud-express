import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const backendApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
    credentials: 'include',
  }),
  endpoints: () => ({}),
  tagTypes: ['Todos'],
})

export { backendApi }
