enum EInputKeys {
  checkbox = 'checkbox',
  text = 'text',
  password = 'password',
  email = 'email',
}

type TInputType = keyof typeof EInputKeys

export type { TInputType }
export { EInputKeys }
