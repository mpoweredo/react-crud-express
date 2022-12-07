import { Button, Center, Flex, Stack } from '@chakra-ui/react'
import { Form, FormikProvider, useFormik } from 'formik'
import { useAddTodoMutation } from 'src/services/backend/todos/todos.api'
import Checkbox from '../../UI/Checkbox/Checkbox'
import Input from '../../UI/Input/Input'
import {
  AddTodoValidation,
  EAddTodoFields,
  TAddTodoFields,
} from './AddTodo.validation'

const AddTodo = () => {
  const [addTodo, { isLoading }] = useAddTodoMutation()

  const addTodoFormik = useFormik<TAddTodoFields>({
    initialValues: {
      title: '',
      completed: false,
    },
    onSubmit: ({ title, completed }) => {
      if (completed === undefined) return

      const newTodo = {
        title,
        completed,
      }
      addTodo({ newTodo })
    },
    validationSchema: AddTodoValidation,
  })

  return (
    <FormikProvider value={addTodoFormik}>
      <Form>
        <Flex>
          <Center mt={'10'} w={'full'} px={[3, 5]}>
            <Stack
              direction={['column', 'row']}
              minH={'90px'}
              maxW={'33rem'}
              w={'full'}
              bg={'brand.secondary'}
              rounded={'lg'}
              p={3}
              alignItems={'center'}
            >
              <Center w="full" gap={'.65rem'}>
                <Flex gap={'1.2rem'} w={'full'}>
                  <Checkbox size={'xl'} name={EAddTodoFields.COMPLETED} />
                  <Input
                    isDisabled={false}
                    isErrorMessageVisible={false}
                    type={'text'}
                    name={EAddTodoFields.TITLE}
                  />
                </Flex>
              </Center>
              <Button
                type={'submit'}
                size={'md'}
                w={['full', 'auto']}
                colorScheme={'green'}
              >
                Add
              </Button>
            </Stack>
          </Center>
        </Flex>
      </Form>
    </FormikProvider>
  )
}

export default AddTodo
