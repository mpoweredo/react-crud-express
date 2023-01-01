import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../chakra/chakra'
import { Provider } from 'react-redux'
import { wrapper } from 'src/store/store'
import SnackbarProvider from '@/components/SnackbarProvider/SnackbarProvider'
import AuthProvider from '@/components/Auth/AuthProvider/AuthProvider'

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Component {...props.pageProps} />
        </AuthProvider>
        <SnackbarProvider />
      </ChakraProvider>
    </Provider>
  )
}
