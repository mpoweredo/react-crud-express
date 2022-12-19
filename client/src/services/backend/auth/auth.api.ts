import { EMethod } from 'src/services/services.type'
import { backendApi } from '../backend'

type TSignupData = {
  name: string
  email: string
  password: string
}

const authApi = backendApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<void, TSignupData>({
      query: ({ email, name, password }) => {
        return {
          url: '/signup',
          method: EMethod.POST,
          body: { email, name, password },
        }
      },
    }),
  }),
})

export const { useSignupMutation } = authApi
