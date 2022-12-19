import { InferType, object, string } from 'yup'

enum ESignupFields {
  NAME = 'name',
  EMAIL = 'email',
  PASSWORD = 'password',
}

const SignupValidation = object({
  [ESignupFields.NAME]: string()
    .min(3, 'Name should have atleast 3 characters!')
    .required('Name is required!'),
  [ESignupFields.EMAIL]: string()
    .email('Thats not an email!')
    .required('Email is required!'),
  [ESignupFields.PASSWORD]: string()
    .min(8, 'Password should have atleast 8 characters!')
    .required('Password is required!'),
})

type TSignupFields = InferType<typeof SignupValidation>

export type { TSignupFields }
export { ESignupFields, SignupValidation }
