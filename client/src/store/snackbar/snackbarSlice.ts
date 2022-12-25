import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { TSnackbarPayload, TSnackbarState } from './snackbarSlice.type'

const initialState: TSnackbarState = {
  isSnackbarOpen: false,
  snackbarTitle: null,
  snackbarDescription: null,
  type: 'info',
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<TSnackbarPayload>) => {
      const { title, description, type } = action.payload
      state.isSnackbarOpen = true
      state.snackbarTitle = title
      state.type = type
      if (description) state.snackbarDescription = description
    },
    closeSnackbar: () => initialState,
  },
})

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions

export const selectSnackbar = (state: RootState) => {
  return {
    title: state.snackbar.snackbarTitle,
    description: state.snackbar.snackbarDescription,
    type: state.snackbar.type,
    isOpen: state.snackbar.isSnackbarOpen,
  }
}

export default snackbarSlice.reducer
