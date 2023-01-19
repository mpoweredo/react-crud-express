import { EMethod } from '../../services.type'
import { backendApi } from '../backend'
import { ITodoItem } from '@/components/todos/TodoItem/TodoItem.type'
import { INewTodo } from '@/components/todos/AddTodo/AddTodo.type'

type TUpdateTodoArgs = {
  updatedTodo: Pick<ITodoItem, 'title' | 'completed' | 'id'>
}

export const todosApi = backendApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<ITodoItem[], void>({
      query: () => {
        return {
          url: '/todo',
        }
      },
      providesTags: ['Todos'],
    }),

    getTodo: builder.query<ITodoItem, { id: number }>({
      query: ({ id }) => {
        return {
          url: `/todo/${id}`,
        }
      },
      providesTags: ['Todos'],
    }),

    addTodo: builder.mutation<void, { newTodo: INewTodo }>({
      query: ({ newTodo }) => {
        console.log(newTodo)

        return {
          url: '/todo',
          method: EMethod.POST,
          body: newTodo,
        }
      },
      invalidatesTags: ['Todos'],
    }),

    deleteTodo: builder.mutation<void, { id: number }>({
      query: ({ id }) => {
        return {
          url: '/todo',
          method: EMethod.DELETE,
          body: { id },
        }
      },
      invalidatesTags: ['Todos'],
    }),

    editTodo: builder.mutation<void, TUpdateTodoArgs>({
      query: ({ updatedTodo }) => {
        return {
          url: '/todo',
          method: EMethod.PATCH,
          body: updatedTodo,
        }
      },
      invalidatesTags: ['Todos'],
    }),

    getTodoTags: builder.query<{ id: number; label: string }[], void>({
      query: () => {
        return {
          url: '/todo/tags',
        }
      },
    }),
  }),
})

export const {
  useAddTodoMutation,
  useGetTodosQuery,
  useDeleteTodoMutation,
  useGetTodoQuery,
  useEditTodoMutation,
  useGetTodoTagsQuery,
} = todosApi

export const { getTodos } = todosApi.endpoints
