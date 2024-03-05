import React from 'react'

import { ITask } from '@/types/todo'

interface TodoCardProps {
  item: ITask
}

const TodoCard = ({ item }: TodoCardProps) => {
  return (
    <div className="paper-rounded flex flex-col gap-4">
      <div className="flex justify-between ">
        <h3 className="text-h3">Title:</h3>
        <p>{item.title}</p>
      </div>
      <div className="flex justify-between ">
        <h3 className="text-h3">Status:</h3>
        <p>{item.status === true ? 'true' : 'false'}</p>
      </div>
      <div className="flex flex-col justify-between ">
        <h3 className="text-h3">description:</h3>
        <p>{item.description}</p>
      </div>
    </div>
  )
}

export default TodoCard
