import Signin from '@/components/Auth/Signin/Signin'
import { Center, Flex } from '@chakra-ui/react'

const SigninPage = () => {
  return (
    <Flex h={'100vh'}>
      <Center flexGrow={1}>
        <Signin />
      </Center>
    </Flex>
  )
}

export default SigninPage
