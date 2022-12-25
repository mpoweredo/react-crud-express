import { Button, Heading, Stack, Text } from '@chakra-ui/react'
import { Form, FormikProvider, useFormik } from 'formik'
import {
  ESigninFields,
  SigninValidation,
  TSigninFields,
} from './Signin.validation'
import Input from '@/components/UI/Input/Input'
import Link from 'next/link'
import { useSigninMutation } from '@/backend/auth/auth.api'
import { useRouter } from 'next/router'

const Signin = () => {
  const [signin, { isLoading }] = useSigninMutation()

  const { push } = useRouter()

  const signinFormik = useFormik<TSigninFields>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, { setFieldValue, setFieldTouched }) => {
      const response = await signin(values)

      const isError = 'error' in response

      if (isError) {
        setFieldValue('password', '')
        setFieldTouched('password', false)

        return
      }

      push('/')
    },
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
          <Button isLoading={isLoading} type='submit' colorScheme={'teal'}>
            Sign in
          </Button>
        </Stack>
      </FormikProvider>
    </Stack>
  )
}

export default Signin
