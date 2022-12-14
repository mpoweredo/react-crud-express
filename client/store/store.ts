import { configureStore } from '@reduxjs/toolkit'
import { backendApi } from 'src/services/backend/backend'
import snackbarReducer from './snackbar/snackbarSlice'

import { snackbarLogger } from './middlewares/snackbarLogger'

const store = configureStore({
  reducer: {
    [backendApi.reducerPath]: backendApi.reducer,
    snackbar: snackbarReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backendApi.middleware, snackbarLogger),
})

export { store }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
