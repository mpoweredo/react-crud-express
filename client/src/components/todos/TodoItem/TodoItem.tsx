import { useDeleteTodoMutation } from '@/backend/todos/todos.api'
import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import { ITodoItem } from './TodoItem.type'

const TodoItem = ({
  id,
  completed,
  title,
  createdAt,
  updatedAt,
}: ITodoItem) => {
  const [deleteTodo] = useDeleteTodoMutation()

  const deleteTodoHandler = () => {
    deleteTodo({ id })
  }

  return (
    <Flex rounded={'md'} h='135px' bg='brand.secondary' p={3}>
      <Stack direction={'column'} w={'full'}>
        <Heading noOfLines={1} size={'md'}>
          {title}
        </Heading>
        <Text color={completed ? 'red.300' : 'green.300'}>completed</Text>
        <Flex flexGrow={1} justifyContent={'space-between'} alignItems={'end'}>
          <Button onClick={deleteTodoHandler} size='sm' colorScheme='red'>
            Delete
          </Button>
          <Text color='whiteAlpha.400'>
            created {format(parseISO(createdAt), 'MM/dd/yyyy')}
          </Text>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default TodoItem
