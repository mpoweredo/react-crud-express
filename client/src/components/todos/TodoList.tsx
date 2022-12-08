import { useGetTodosQuery } from '@/backend/todos/todos.api'
import { Center, Flex, Spinner, Stack } from '@chakra-ui/react'
import React from 'react'
import TodoItem from './TodoItem/TodoItem'

const TodoList = () => {
  const { data: todosData, isLoading, isFetching } = useGetTodosQuery()

  return (
    <Flex mt={5} p={0} h='auto'>
      <Center flexGrow={1} px={[3, 5]}>
        <Stack direction={'column'} w='full' maxW={'33rem'} spacing={3}>
          {isLoading || isFetching ? (
            <Spinner mx={'auto'} />
          ) : (
            todosData?.map((todo) => <TodoItem key={todo.id} {...todo} />)
          )}
        </Stack>
      </Center>
    </Flex>
  )
}

export default TodoList
