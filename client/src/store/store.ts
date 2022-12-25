import { configureStore } from '@reduxjs/toolkit'
import { backendApi } from '@/backend/backend'
import snackbarReducer from './snackbar/snackbarSlice'
import authReducer from './auth/authSlice'

import { snackbarLogger } from './middlewares/snackbarLogger'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = () =>
  configureStore({
    reducer: {
      [backendApi.reducerPath]: backendApi.reducer,
      snackbar: snackbarReducer,
      auth: authReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(backendApi.middleware, snackbarLogger),
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore)
