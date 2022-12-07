import {
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  Text,
} from '@chakra-ui/react'
import { useField } from 'formik'
import { EInputKeys, TInputType } from './Input.type'

interface IInputProps {
  name: string;
  label?: string;
  type?: TInputType;
  placeholder?: string;
  isErrorMessageVisible?: boolean;
  isDisabled?: boolean;
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
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <ChakraInput
        isDisabled={isDisabled}
        placeholder={placeholder}
        {...errorStyles}
        type={type}
        bg="brand.neutral"
        _hover={{ bg: 'whiteAlpha.400' }}
        {...field}
        onChange={(e) => setValue(e.target.value)}
        color="white"
        variant="filled"
      />
      {isErrorMessageVisible && isError && (
        <FormErrorMessage color="red.400">{meta.error}</FormErrorMessage>
      )}
    </>
  )
}

export default Input
