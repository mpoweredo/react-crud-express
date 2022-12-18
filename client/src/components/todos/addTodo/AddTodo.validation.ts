import { object, string, boolean, InferType } from 'yup'

enum EAddTodoFields {
  TITLE = 'title',
  COMPLETED = 'completed',
}

const AddTodoValidation = object({
  [EAddTodoFields.TITLE]: string()
    .min(1, 'Title is too short!')
    .required('Field cannot be empty!'),
  [EAddTodoFields.COMPLETED]: boolean(),
})

type TAddTodoFields = InferType<typeof AddTodoValidation>

export type { TAddTodoFields }
export { EAddTodoFields, AddTodoValidation }
