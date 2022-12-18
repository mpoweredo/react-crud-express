import { InferType, object, string } from 'yup'

enum ESigninFields {
  EMAIL = 'email',
  PASSWORD = 'password',
}

const SigninValidation = object({
  [ESigninFields.EMAIL]: string()
    .email('Thats not an email!')
    .required('Email is required!'),
  [ESigninFields.PASSWORD]: string()
    .min(8, 'Password should have atleast 8 characters!')
    .required('Password is required!'),
})

type TSigninFields = InferType<typeof SigninValidation>

export type { TSigninFields }
export { ESigninFields, SigninValidation }
