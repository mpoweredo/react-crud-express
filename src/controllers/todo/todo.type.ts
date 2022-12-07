interface INewTodo {
  title: string
  completed: boolean
}

interface ITodo {
  id: number
  title: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export type { INewTodo, ITodo }