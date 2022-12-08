import { INewTodo } from '@/components/todos/AddTodo/AddTodo.type'
import { ITodoItem } from '@/components/todos/TodoItem/TodoItem.type'

type TAddTodoArgs = {
  newTodo: INewTodo
}

type TNewTodoData = ITodoItem

type TDeleteTodoArgs = {
  id: number
}

type TDeletedTodoData = ITodoItem

type TGetTodosData = ITodoItem[]

export type {
  TAddTodoArgs,
  TNewTodoData,
  TGetTodosData,
  TDeletedTodoData,
  TDeleteTodoArgs,
}
