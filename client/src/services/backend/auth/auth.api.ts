import { EMethod } from 'src/services/services.type'
import { backendApi } from '../backend'
import { setCredentials } from '../../../store/auth/authSlice'
import { TAuthState } from '../../../store/auth/authSlice.type'
import { TSigninData, TSignupData } from '@/backend/auth/auth.type'

const authApi = backendApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<TAuthState, TSignupData>({
      query: ({ email, name, password }) => {
        return {
          url: '/signup',
          method: EMethod.POST,
          body: { email, name, password },
        }
      },

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { token, user } = data
          console.log(token, user)
          dispatch(setCredentials({ token, user }))
        } catch (error) {
          console.log(error)
        }
      },
    }),

    signin: builder.mutation<TAuthState, TSigninData>({
      query: ({ email, password }) => {
        return {
          url: '/signin',
          method: EMethod.POST,
          body: { email, password },
        }
      },

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { token, user } = data

          dispatch(setCredentials({ token, user }))
        } catch (error) {}
      },
    }),

    refresh: builder.mutation<TAuthState, void>({
      query: () => ({
        url: '/refresh',
        method: 'GET',
        credentials: 'include',
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { token, user } = data
          dispatch(setCredentials({ token, user }))
        } catch (error) {
          console.log(error)
        }
      },
    }),
  }),
})

export const { useSignupMutation, useSigninMutation } = authApi
