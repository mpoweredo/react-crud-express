import { INewTodo } from '@/components/todos/AddTodo/AddTodo.type'
import { ITodoItem } from '@/components/todos/TodoItem/TodoItem.type'

type TAddTodoArgs = {
  newTodo: INewTodo
}

type TNewTodoData = ITodoItem

type TGetTodosData = ITodoItem[]

export type { TAddTodoArgs, TNewTodoData, TGetTodosData }
