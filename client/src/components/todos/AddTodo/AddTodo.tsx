import { Button, Center, Flex, Stack } from '@chakra-ui/react'
import { Form, FormikProvider, useFormik } from 'formik'
import {
  useAddTodoMutation,
  useGetTodoTagsQuery,
} from 'src/services/backend/todos/todos.api'
import Checkbox from '../../UI/Checkbox/Checkbox'
import Input from '../../UI/Input/Input'
import {
  AddTodoValidation,
  EAddTodoFields,
  TAddTodoFields,
} from './AddTodo.validation'
import MultiSelect from '@/components/UI/MultiSelect/MultiSelect'
import { useMemo } from 'react'
import { TMultiSelectOption } from '@/components/UI/MultiSelect/MultiSelect.type'
const AddTodo = () => {
  const [addTodo, { isLoading }] = useAddTodoMutation()

  const { data: tagsData } = useGetTodoTagsQuery()

  console.log(tagsData)

  const tags = useMemo<TMultiSelectOption[]>(() => {
    if (!tagsData) return []

    return tagsData.map(({ id, label }) => {
      return {
        value: id,
        label,
      }
    })
  }, [tagsData])

  const addTodoFormik = useFormik<TAddTodoFields>({
    initialValues: {
      title: '',
      completed: false,
      tags: [],
    },
    onSubmit: async ({ title, completed, tags }, { resetForm }) => {
      if (completed === undefined) return

      const newTodo = {
        title,
        completed,
        tags,
      }

      await addTodo({ newTodo })
        .unwrap()
        .then(() => resetForm())
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
              maxW={'40rem'}
              w={'full'}
              bg={'brand.secondary'}
              rounded={'lg'}
              p={3}
              alignItems={'center'}
            >
              <Center w='full' gap={'.65rem'}>
                <Flex gap={'1.2rem'} w={'full'}>
                  <Checkbox size={'xl'} name={EAddTodoFields.COMPLETED} />
                  <Input
                    isDisabled={isLoading}
                    isErrorMessageVisible={false}
                    type={'text'}
                    name={EAddTodoFields.TITLE}
                  />
                </Flex>
              </Center>
              <MultiSelect
                width={['100%', '16rem']}
                values={tags}
                name={EAddTodoFields.TAGS}
                isLoading={isLoading}
              />
              <Button
                isLoading={isLoading}
                type={'submit'}
                size={'md'}
                minW={'6rem'}
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
