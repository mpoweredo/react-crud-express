import { EMethod } from '../../services.type'
import { backendApi } from '../backend'
import {
  TAddTodoArgs,
  TDeletedTodoData,
  TDeleteTodoArgs,
  TGetTodoArgs,
  TGetTodoData,
  TGetTodosData,
  TNewTodoData,
} from './todos.type'
import { v4 as uuidv4 } from 'uuid'
import { ITodoItem } from '@/components/todos/TodoItem/TodoItem.type'

const todosApi = backendApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<TGetTodosData, void>({
      query: () => {
        return {
          url: '/todo',
        }
      },
      providesTags: ['Todos'],
    }),

    getTodo: builder.query<TGetTodoData, TGetTodoArgs>({
      query: ({ id }) => {
        return {
          url: `/todo/${id}`,
        }
      },
      providesTags: ['Todos'],
    }),

    addTodo: builder.mutation<TNewTodoData, Partial<TAddTodoArgs>>({
      query: ({ newTodo }) => {
        return {
          url: '/todo',
          method: EMethod.POST,
          body: newTodo,
        }
      },

      // async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     backendApi.util.updateQueryData(
      //       'getTodos',
      //       uuidv4(),
      //       (draft: ITodoItem[]) => {
      //         Object.assign(draft, patch)
      //       }
      //     )
      //   )
      //   try {
      //     await queryFulfilled
      //   } catch {
      //     patchResult.undo()

      //     /**
      //      * Alternatively, on failure you can invalidate the corresponding cache tags
      //      * to trigger a re-fetch:
      //      * dispatch(api.util.invalidateTags(['Post']))
      //      */
      //   }
      // },
      invalidatesTags: ['Todos'],
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

export const {
  useAddTodoMutation,
  useGetTodosQuery,
  useDeleteTodoMutation,
  useGetTodoQuery,
} = todosApi
