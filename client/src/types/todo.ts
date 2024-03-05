export interface ITodos {
  totalCount: number
  todos: ITodo[],

}

export interface ITodo {
  id: string
  title: string
  description: string
  todoImg: string
  createdAt: string
  updatedAt: string
  tasks: ITask[]
}

export interface ITask {
  id: string
  title: string
  description: string
  status: boolean
}


export interface ITodoId {
  todo: ITodo
  totalTasks: number
  completedTasks: number
}

