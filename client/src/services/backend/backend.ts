import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
const backendApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({}),
  tagTypes: ['Todos'],
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export { backendApi }
