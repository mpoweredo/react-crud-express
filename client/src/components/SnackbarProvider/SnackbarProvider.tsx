import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { closeSnackbar, selectSnackbar } from 'store/snackbar/snackbarSlice'
import { SNACKBAR_DURATION } from './SnackbarProvider.const'

const SnackbarProvider = () => {
  const toast = useToast()
  const dispatch = useAppDispatch()

  const { description, isOpen, title, type } = useAppSelector(selectSnackbar)

  let timer = 0

  const handleTimeout = () => {
    timer = window.setTimeout(() => {
      dispatch(closeSnackbar())
    }, SNACKBAR_DURATION)
  }

  useEffect(() => {
    if (isOpen) {
      toast({
        title,
        description,
        status: type,
        duration: SNACKBAR_DURATION,
      })
      handleTimeout()
    }

    return () => clearTimeout(timer)
  }, [isOpen, timer])

  return null
}

export default SnackbarProvider
