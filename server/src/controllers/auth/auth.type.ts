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
  name: string
  email: string
}

export type { TSignup, TSignin, TUserData }
