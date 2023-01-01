import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useRefreshQuery } from '@/backend/auth/auth.api'
import { useAppSelector } from '../../../store/hooks'
import { selectUser } from '../../../store/auth/authSlice'
import { useRouter } from 'next/router'
import { Flex, Spinner } from '@chakra-ui/react'

const AUTH_PATHS = ['/signin', '/signup']

const PROTECTED_PATHS = ['/protected']

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false)

  const router = useRouter()

  const { token } = useAppSelector(selectUser)

  const { isLoading, data } = useRefreshQuery(undefined, {
    skip: !!token,
  })

  const authCheck = useCallback(() => {
    const isProtectedRoute = PROTECTED_PATHS.includes(router.pathname)
    const isAuthRoute = AUTH_PATHS.includes(router.pathname)

    if (!isLoading) {
      if (token && isAuthRoute) {
        setIsAuthorized(false)
        router.replace('/')
        return
      }

      if (!token && isAuthRoute) {
        setIsAuthorized(true)
        return
      }

      if (token && isProtectedRoute) {
        setIsAuthorized(true)
        return
      }

      if (!token && isProtectedRoute && !data) {
        setIsAuthorized(false)
        router.replace('/signin')
        return
      }

      if (!isProtectedRoute && !isAuthRoute) {
        setIsAuthorized(true)
        return
      }
    } else setIsAuthorized(false)
  }, [isLoading, token, router])

  useEffect(() => {
    authCheck()
  }, [authCheck])

  if (!isAuthorized)
    return (
      <Flex
        w={'full'}
        h={'100vh'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Spinner />
      </Flex>
    )
  return <>{children}</>
}

export default AuthProvider
