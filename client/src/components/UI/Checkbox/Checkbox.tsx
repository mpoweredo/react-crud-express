import { Checkbox as ChakraCheckbox } from '@chakra-ui/react'
import { useField } from 'formik'
import { TCheckboxSize } from './Checkbox.type'

interface ICheckboxProps {
  name: string,
  label?: string,
  size?: TCheckboxSize
}

const Checkbox = ({ name, label, size = 'md' }: ICheckboxProps) => {
  const [field, meta, { setValue }] = useField(name)

  return (
    <ChakraCheckbox borderColor={'gray.600'} size={size} colorScheme='green' onChange={(e) => setValue(e.target.checked)}>
      {label}
    </ChakraCheckbox>
  )
}

export default Checkbox