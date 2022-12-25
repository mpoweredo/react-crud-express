import { AlertStatus } from '@chakra-ui/react'

type TSnackbarState = {
  isSnackbarOpen: boolean
  snackbarTitle: null | string
  snackbarDescription: null | string
  type: AlertStatus
}

type TSnackbarPayload = {
  title: string
  description?: string
  type: AlertStatus
}

export type { TSnackbarPayload, TSnackbarState }
