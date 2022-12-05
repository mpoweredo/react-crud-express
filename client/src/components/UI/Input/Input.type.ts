enum EInputKeys {
  checkbox = 'checkbox',
  text = 'text',
  password = 'password'
}

type TInputType = keyof typeof EInputKeys

export type { TInputType }
export { EInputKeys }