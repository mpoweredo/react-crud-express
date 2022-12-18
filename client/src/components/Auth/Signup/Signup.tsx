import { Button, Heading, Stack, Text } from '@chakra-ui/react'
import { Form, FormikProvider, useFormik } from 'formik'
import Input from '@/components/UI/Input/Input'
import Link from 'next/link'
import {
  ESignupFields,
  SignupValidation,
  TSignupFields,
} from './Signup.validation'

const Signup = () => {
  const signinFormik = useFormik<TSignupFields>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: (values) => console.log(values),
    validationSchema: SignupValidation,
  })

  return (
    <Stack
      direction={'column'}
      maxW={'md'}
      w={'full'}
      minH={'xs'}
      height={'auto'}
      rounded={'md'}
      bg={'brand.secondary'}
      py={6}
      px={4}
      mx={3}
    >
      <Heading textAlign={'center'}>Sign up</Heading>
      <FormikProvider value={signinFormik}>
        <Stack spacing={6} as={Form}>
          <Stack spacing={3}>
            <Input
              name={ESignupFields.NAME}
              isErrorMessageVisible={true}
              label={'Name'}
            />
            <Input
              name={ESignupFields.EMAIL}
              isErrorMessageVisible={true}
              label={'Email'}
              type={'email'}
            />
            <Input
              name={ESignupFields.PASSWORD}
              isErrorMessageVisible={true}
              label={'Password'}
              type={'password'}
            />
            <Text>
              Already have an account?{' '}
              <Text fontWeight={'medium'} color={'teal.300'} as={'span'}>
                <Link href={'/signin'}>Sign in here</Link>
              </Text>
            </Text>
          </Stack>
          <Button type='submit' colorScheme={'teal'}>
            Sign up
          </Button>
        </Stack>
      </FormikProvider>
    </Stack>
  )
}

export default Signup
