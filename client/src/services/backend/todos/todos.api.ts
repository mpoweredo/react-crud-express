import { EMethod } from '../../services.type'
import { backendApi } from '../backend'
import {
  TAddTodoArgs,
  TDeletedTodoData,
  TDeleteTodoArgs,
  TGetTodosData,
  TNewTodoData,
} from './todos.type'

const todosApi = backendApi.injectEndpoints({
  endpoints: (builder) => ({
    addTodo: builder.mutation<TNewTodoData, TAddTodoArgs>({
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
    getTodos: builder.query<TGetTodosData, void>({
      query: () => {
        return {
          url: '/todo',
        }
      },
      providesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation<TDeletedTodoData, TDeleteTodoArgs>({
      query: ({ id }) => {
        return {
          url: '/todo',
          method: EMethod.DELETE,
          body: { id },
        }
      },
      invalidatesTags: ['Todos'],
    }),
  }),
})

export const { useAddTodoMutation, useGetTodosQuery, useDeleteTodoMutation } =
  todosApi
