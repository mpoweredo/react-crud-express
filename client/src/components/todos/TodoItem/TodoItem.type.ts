interface ITodoItem {
  id: number
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string
  tags: {
    id: number
    label: string
  }[]
}

export type { ITodoItem }
