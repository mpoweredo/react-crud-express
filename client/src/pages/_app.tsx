import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../chakra/chakra'
import { Provider } from 'react-redux'
import { store } from 'store/store'

export default function App({ Component, pageProps }: AppProps) {

  return <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </Provider>
}
