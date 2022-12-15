import {
  useDeleteTodoMutation,
  useGetTodoQuery,
} from '@/backend/todos/todos.api'
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import React from 'react'
import { ITodoItem } from './TodoItem.type'
import TodoItemEdit from './TodoItemEdit'

const TodoItem = ({ id, completed, title, createdAt }: ITodoItem) => {
  const { onOpen, isOpen, onClose } = useDisclosure()

  const [deleteTodo, { isLoading: isDeletingTodo }] = useDeleteTodoMutation()

  const deleteTodoHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    deleteTodo({ id })
  }

  return (
    <>
      <Flex
        rounded={'md'}
        h='135px'
        bg='brand.secondary'
        p={3}
        onClick={onOpen}
        cursor={'pointer'}
      >
        <Stack direction={'column'} w={'full'}>
          <Heading noOfLines={1} size={'md'}>
            {title}
          </Heading>
          <Text color={completed ? 'green.300' : 'red.300'}>
            {completed ? 'completed' : 'uncompleted'}
          </Text>
          <Flex
            flexGrow={1}
            justifyContent={'space-between'}
            alignItems={'end'}
          >
            <Flex gap={3}>
              <Button
                isLoading={isDeletingTodo}
                onClick={deleteTodoHandler}
                size='sm'
                colorScheme='red'
              >
                Delete
              </Button>
            </Flex>
            <Text color='whiteAlpha.400'>
              created {format(parseISO(createdAt), 'dd MMM yyyy')}
            </Text>
          </Flex>
        </Stack>
      </Flex>
      <TodoItemEdit
        isOpen={isOpen}
        onClose={onClose}
        todo={{ completed, title, id }}
      />
    </>
  )
}

export default TodoItem
