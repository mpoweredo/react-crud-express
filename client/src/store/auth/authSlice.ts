import { TAuthState } from './authSlice.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { HYDRATE } from 'next-redux-wrapper'

const initialState: TAuthState = {
  user: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<TAuthState>) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout: (state) => {
      state.user = null
      state.token = null
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export const selectUser = (state: RootState) => {
  return state.auth
}

export default authSlice.reducer
