import { FormLabel, Input as ChakraInput, Text, Stack } from '@chakra-ui/react'
import { useField } from 'formik'
import { TInputType } from './Input.type'

interface IInputProps {
  name: string
  label?: string
  type?: TInputType
  placeholder?: string
  isErrorMessageVisible?: boolean
  isDisabled?: boolean
}

const Input = ({
  placeholder,
  label,
  name,
  type = 'text',
  isErrorMessageVisible = false,
  isDisabled,
}: IInputProps) => {
  const [field, meta, { setValue }] = useField(name)

  const isError = !!meta.error && !!meta.touched

  const errorStyles = isError
    ? {
        borderColor: 'red.300',
        borderWidth: 1,
      }
    : {}

  return (
    <Stack spacing={1} direction={'column'}>
      {label && <FormLabel fontSize={'xl'}>{label}</FormLabel>}
      <ChakraInput
        isDisabled={isDisabled}
        placeholder={placeholder}
        {...errorStyles}
        type={type}
        bg='brand.neutral'
        _hover={{ bg: 'whiteAlpha.400' }}
        {...field}
        onChange={(e) => setValue(e.target.value)}
        color='white'
        variant='filled'
      />
      {isErrorMessageVisible && isError && (
        <Text color='red.400'>{meta.error}</Text>
      )}
    </Stack>
  )
}

export default Input
