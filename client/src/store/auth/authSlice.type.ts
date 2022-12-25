type TUserData = {
  name: string
  email: string
}

type TAuthState = {
  user: TUserData | null
  token: string | null
}

export type { TAuthState, TUserData }
