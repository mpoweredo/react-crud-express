import { Center, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import React from 'react'
import { ITodoItem } from './TodoItem.type'

const TodoItem = ({
  id,
  completed,
  title,
  createdAt,
  updatedAt,
}: ITodoItem) => {
  return (
    <Flex rounded={'md'} h='115px' bg='brand.secondary' p={3}>
      <Stack direction={'column'} w={'full'}>
        <Heading noOfLines={1} size={'md'}>
          {title}
        </Heading>
        <Text color={completed ? 'red.300' : 'green.300'}>completed</Text>
        <Text color='whiteAlpha.400' alignSelf={'end'}>
          created {format(parseISO(createdAt), 'MM/dd/yyyy')}
        </Text>
      </Stack>
    </Flex>
  )
}

export default TodoItem
