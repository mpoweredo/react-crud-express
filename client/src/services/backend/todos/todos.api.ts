import { EMethod } from '../../services.type'
import { backendApi } from '../backend'
import { TAddTodoArgs, TGetTodosData, TNewTodoData } from './todos.type'

const todosApi = backendApi.injectEndpoints({
  endpoints: (builder) => ({
    addTodo: builder.mutation<TNewTodoData, TAddTodoArgs>({
      query: ({ newTodo }) => {
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
  }),
})

export const { useAddTodoMutation, useGetTodosQuery } = todosApi
