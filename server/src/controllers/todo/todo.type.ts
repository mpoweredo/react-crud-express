interface INewTodo {
  title: string
  completed: boolean
  tags: {
    label: string
    value: number
  }[]
}

interface ITodo {
  id: number
  title: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export type { INewTodo, ITodo }
