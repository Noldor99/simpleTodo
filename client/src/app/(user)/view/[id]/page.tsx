'use client'

import { useGetTodoById } from '@/ahooks/useTodo'

import { useParams, useSearchParams } from 'next/navigation'

import { useEffect, useState } from 'react'

import { Switch } from '@/components/ui/switch'

import { cn } from '@/lib/utils'

 
import FilterSelect from './_components/FilterSelect'
import { SectionTask } from './_components/SectionTask'
import TodoCard from './_components/TodoCard'
import { HigherTodoForm } from '../../(main)/[id]/_components/HigherTodoForm'

const arrSort = ['all', 'completed', 'notcompleted']

const ViewPage = () => {
  const searchParams = useSearchParams()

  const { id } = useParams<{ id: string }>() ?? { id: '' }

  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(true)
  const {
    data: todo,
    isFetched,
    refetch,
  } = useGetTodoById(id, {
    sort: searchParams?.get('sort') as 'all' | 'completed' | 'notcompleted',
  })

  console.log(isSwitchOn)
  useEffect(() => {
    refetch()
  }, [refetch, searchParams])

  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn)
  }
  const completedTasksCount = todo?.todo.tasks.filter((task) => task.status).length || 0
  console.log(todo)
  return (
    <div className="container">
      <div className="paper-rounded flex items-center justify-between gap-6">
        <h1 className="text-h1">Todo List {isSwitchOn ? 'view:' : 'edit:'}</h1>
        <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} />
      </div>
      {isSwitchOn === true ? (
        <>
          <div className="paper-rounded mt-3 flex justify-between">
            <div>
              <p>Total tasks: {todo?.totalTasks}</p>
              <p>Completed tasks: {completedTasksCount}</p>
            </div>
            <FilterSelect arrValue={arrSort} paramName="sort" goToFirstPage={false} />
          </div>
          <div className={cn('grid grid-cols-1 gap-6', 'mt-4 sm:grid-cols-2 md:grid-cols-3')}>
            {todo?.todo.tasks?.map((item) => <TodoCard item={item} />)}
          </div>
        </>
      ) : (
        isFetched && <HigherTodoForm formSection={<SectionTask />} todo={todo?.todo} />
      )}
    </div>
  )
}

export default ViewPage
