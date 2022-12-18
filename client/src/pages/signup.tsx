import Signup from '@/components/Auth/Signup/Signup'
import { Flex, Center } from '@chakra-ui/react'

const signup = () => {
  return (
    <Flex h={'100vh'}>
      <Center flexGrow={1}>
        <Signup />
      </Center>
    </Flex>
  )
}

export default signup
