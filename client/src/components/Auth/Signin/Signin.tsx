import { Button, Heading, Stack, Text } from '@chakra-ui/react'
import { Form, FormikProvider, useFormik } from 'formik'
import {
  ESigninFields,
  SigninValidation,
  TSigninFields,
} from './Signin.validation'
import Input from '@/components/UI/Input/Input'
import Link from 'next/link'

const Signin = () => {
  const signinFormik = useFormik<TSigninFields>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => console.log(values),
    validationSchema: SigninValidation,
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
      <Heading textAlign={'center'}>Sign in</Heading>
      <FormikProvider value={signinFormik}>
        <Stack spacing={6} as={Form}>
          <Stack spacing={3}>
            <Input
              name={ESigninFields.EMAIL}
              isErrorMessageVisible={true}
              label={'Email'}
              type={'email'}
            />
            <Input
              name={ESigninFields.PASSWORD}
              isErrorMessageVisible={true}
              label={'Password'}
              type={'password'}
            />
            <Text>
              Don't have an account?{' '}
              <Text fontWeight={'medium'} color={'teal.300'} as={'span'}>
                <Link href={'/signup'}>Sign up here</Link>
              </Text>
            </Text>
          </Stack>
          <Button type='submit' colorScheme={'teal'}>
            Sign in
          </Button>
        </Stack>
      </FormikProvider>
    </Stack>
  )
}

export default Signin
