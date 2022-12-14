import { isRejectedWithValue, isFulfilled } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { openSnackbar } from 'store/snackbar/snackbarSlice'

// type TSnackbarLoggerPayload = {
//   message: string
//   description?: string
// }

export const snackbarLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    console.log(action)

    if (isRejectedWithValue(action)) {
      if (action.payload.data.message) {
        api.dispatch(
          openSnackbar({
            title: action.payload.data.message,
            description: action.payload.data.description,
            type: 'error',
          })
        )
        return next(action)
      }

      api.dispatch(
        openSnackbar({
          title: 'Error!',
          description: 'Something went wrong. Try again later!',
          type: 'error',
        })
      )
    }

    if (isFulfilled(action) && action.payload.message) {
      api.dispatch(
        openSnackbar({
          title: action.payload.message,
          description: action.payload.description || '',
          type: 'success',
        })
      )
    }

    return next(action)
  }
