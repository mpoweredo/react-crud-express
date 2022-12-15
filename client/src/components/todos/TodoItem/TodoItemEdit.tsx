import { useEditTodoMutation } from '@/backend/todos/todos.api'
import Checkbox from '@/components/UI/Checkbox/Checkbox'
import Input from '@/components/UI/Input/Input'
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { Form, FormikProvider, useFormik } from 'formik'
import {
  AddTodoValidation,
  EAddTodoFields,
  TAddTodoFields,
} from '../AddTodo/AddTodo.validation'
import { ITodoItem } from './TodoItem.type'

interface ITodoItemProps {
  isOpen: boolean
  onClose: () => void
  todo: Pick<ITodoItem, 'title' | 'completed' | 'id'>
}

const TodoItemEdit = ({ isOpen, onClose, todo }: ITodoItemProps) => {
  const [editTodo, { isLoading }] = useEditTodoMutation()

  const editTodoFormik = useFormik<TAddTodoFields>({
    initialValues: {
      title: todo.title,
      completed: todo.completed,
    },
    onSubmit: async ({ completed, title }, { resetForm }) => {
      if (completed === undefined) return

      const updatedTodo = {
        completed,
        title,
        id: todo.id,
      }

      await editTodo({ updatedTodo })
        .unwrap()
        .then(() => {
          resetForm()
          onClose()
        })
    },
    validationSchema: AddTodoValidation,
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg='brand.secondary' mx={'3'}>
          <ModalHeader>Edit Todo</ModalHeader>
          <ModalCloseButton />
          <FormikProvider value={editTodoFormik}>
            <Form>
              <ModalBody>
                <Flex gap={'1.2rem'} w={'full'}>
                  <Checkbox size={'xl'} name={EAddTodoFields.COMPLETED} />
                  <Input
                    isDisabled={isLoading}
                    isErrorMessageVisible={false}
                    type={'text'}
                    name={EAddTodoFields.TITLE}
                  />
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme={'green'} type='submit'>
                  Save
                </Button>
              </ModalFooter>
            </Form>
          </FormikProvider>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TodoItemEdit
