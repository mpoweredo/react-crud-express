type TSignup = {
  name: string
  email: string
  password: string
}

type TSignin = {
  email: string
  password: string
}

type TUserData = {
  id: number
  name: string
  email: string
}

export type { TSignup, TSignin, TUserData }
