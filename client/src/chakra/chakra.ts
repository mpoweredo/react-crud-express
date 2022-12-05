import { extendTheme } from '@chakra-ui/react'
import { checkboxTheme } from './checkbox'

const colors = {
  brand: {
    primary: '#0D120E',
    secondary: '#232826',
    neutral: '#3c413f',
    accent: '#1da756'
  }
}

const theme = extendTheme({
  colors,
  components: { Checkbox: checkboxTheme },
  styles: {
    global: () => ({
      body: {
        bg: 'brand.primary',
        color: 'white'
      },
    }),
  },
})

export { theme }