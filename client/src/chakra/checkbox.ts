import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const sizes = {
  xl: definePartsStyle({
    control: defineStyle({
      boxSize: 8
    }),
    label: defineStyle({
      fontSize: '2xl',
      marginLeft: 6
    })
  }),
}


export const checkboxTheme = defineMultiStyleConfig({ sizes })