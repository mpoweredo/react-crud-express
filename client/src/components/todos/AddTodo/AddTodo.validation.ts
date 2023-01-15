import { object, string, boolean, InferType, array } from 'yup'

enum EAddTodoFields {
  TITLE = 'title',
  COMPLETED = 'completed',
  TAGS = 'tags',
}

const AddTodoValidation = object({
  [EAddTodoFields.TITLE]: string()
    .min(1, 'Title is too short!')
    .required('Field cannot be empty!'),
  [EAddTodoFields.COMPLETED]: boolean(),
  [EAddTodoFields.TAGS]: array().max(3),
})

type TAddTodoFields = InferType<typeof AddTodoValidation>

export type { TAddTodoFields }
export { EAddTodoFields, AddTodoValidation }
