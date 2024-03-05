'use client'

import { useGetTodoById } from '@/ahooks/useTodo'

import { useParams } from 'next/navigation'

import { HigherTodoForm } from './_components/HigherTodoForm'
import { SectionGlobalTodo } from './_components/SectionGlobalTodo'

const TodoEditPage = () => {
  const { id } = useParams<{ id: string }>() ?? { id: '' }
  const { data: todo, isFetched } = useGetTodoById(id as string)

  return (
    <div className="container">
      <div className="paper-rounded">
        <h1 className="text-h1">Global Todo {id === 'Add' ? 'Create' : 'Edit'}:</h1>
      </div>
      {id === 'Add' ? (
        <HigherTodoForm formSection={<SectionGlobalTodo />} />
      ) : (
        isFetched && <HigherTodoForm formSection={<SectionGlobalTodo />} todo={todo?.todo} />
      )}
    </div>
  )
}

export default TodoEditPage
