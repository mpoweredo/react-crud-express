import React from 'react'
import { wrapper } from '../store/store'
import { signout, refresh } from '@/backend/auth/auth.api'

const ProtectedPage = () => {
  // const { user } = useAppSelector(selectUser)

  // const { data } = useRefreshQuery()

  // console.log(data)

  return <div>Protected Page</div>
}

export default ProtectedPage
