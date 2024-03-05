'use client'

import { useCreateTodo, useUpdateTodo } from '@/ahooks/useTodo'

import { FC, ReactElement, useId } from 'react'
import React from 'react'
import { useForm } from 'react-hook-form'

import { AxiosError } from 'axios'

import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'

import { ITodoSchema, TodoSchema } from '@/actions/client/todoAction'

import { zodResolver } from '@hookform/resolvers/zod'

import { ITodo } from '@/types/todo'

type TodoFormPropsType = {
  todo?: ITodo
  formSection: ReactElement
}

export const HigherTodoForm: FC<TodoFormPropsType> = ({ todo, formSection }: TodoFormPropsType) => {
  const form = useForm<ITodoSchema>({
    mode: 'onChange',
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: todo?.title || '',
      description: todo?.description || '',
      todoImg: todo?.todoImg || '',
      tasks: todo?.tasks || [],
    },
  })

  const { formState, handleSubmit } = form
  const { mutateAsync: createTodo, isPending: pendingTodo } = useCreateTodo()
  const { mutateAsync: updateTodos, isPending: pendingUpdate } = useUpdateTodo(todo?.id || '')
  const isPending = pendingTodo || pendingUpdate

  const onSubmit = (data: ITodoSchema) => {
    const formData = new FormData()

    for (const key in data) {
      const value = data[key as keyof ITodoSchema]

      if (formState.dirtyFields[key as keyof ITodoSchema]) {
        if (key === 'tasks') {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, value as string | Blob)
        }
      }
    }

    const mutation = todo ? updateTodos : createTodo

    mutation(formData, {
      onSuccess: () => {
        toast({ title: 'Success', description: 'Update success' })
      },
      onError: (error) => {
        const errorMessage =
          ((error as AxiosError)?.response?.data as { message: string })?.message || 'Unknown error'

        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        })
      },
    })
  }

  const formId = useId()

  return (
    <div>
      <div className="my-2 mb-[40px] flex items-center justify-center gap-2">
        <Form {...form}>
          <form className="w-full space-y-2" onSubmit={handleSubmit(onSubmit)} id={formId}>
            {React.cloneElement(formSection, { onSubmit, isPending, formState })}
          </form>
        </Form>
      </div>
    </div>
  )
}
