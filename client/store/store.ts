import { configureStore } from '@reduxjs/toolkit'
import { backendApi } from 'src/services/backend/backend'

const store = configureStore({
  reducer: { [backendApi.reducerPath]: backendApi.reducer },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backendApi.middleware),
})

export { store }
