import TodoList from '@/components/todos/TodoList'
import AddTodo from '../components/todos/AddTodo/AddTodo'

const HomePage = () => {
  return (
    <>
      <AddTodo />
      <TodoList />
    </>
  )
}

export default HomePage
