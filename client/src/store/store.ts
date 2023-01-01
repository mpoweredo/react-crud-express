import {
  configureStore,
  ImmutableStateInvariantMiddlewareOptions,
  SerializableStateInvariantMiddlewareOptions,
} from '@reduxjs/toolkit'
import { backendApi } from '@/backend/backend'
import snackbarReducer from './snackbar/snackbarSlice'
import authReducer from './auth/authSlice'

import { snackbarLogger } from './middlewares/snackbarLogger'
import { createWrapper, Context } from 'next-redux-wrapper'

interface MyThunkOptions<E> {
  extraArgument: E
}

interface MyDefaultMiddlewareOptions {
  thunk?: boolean | MyThunkOptions<Context>
  immutableCheck?: boolean | ImmutableStateInvariantMiddlewareOptions
  serializableCheck?: boolean | SerializableStateInvariantMiddlewareOptions
}

const makeStore = (ctx: Context) =>
  configureStore({
    reducer: {
      [backendApi.reducerPath]: backendApi.reducer,
      snackbar: snackbarReducer,
      auth: authReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (gDM) =>
      gDM<MyDefaultMiddlewareOptions>({
        thunk: {
          // https://github.com/reduxjs/redux-toolkit/issues/2228#issuecomment-1095409011
          extraArgument: ctx,
        },
      }).concat(backendApi.middleware, snackbarLogger),
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore)
