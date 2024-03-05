import { useEffect } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  QueryTodoParams,
  apiTodo,
} from '@/actions/client/todoAction'


export const useCreateTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: apiTodo.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todo'],
      })
    },
  })
}

export const useUpdateTodo = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: FormData) => apiTodo.update(id!, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todo'],
      })
      // queryClient.invalidateQueries({
      //   queryKey: ['todo', id],
      // })
    },
  })
}

export const useGetTodo = ({
  enabled = true,
  params,
}: {
  enabled?: boolean
  params?: QueryTodoParams
}) =>
  useQuery({
    queryKey: ['todo'],
    queryFn: () => apiTodo.getAll(params ?? {}),
    enabled,
  })

export const useDeleteTodoById = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiTodo.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todo'],
      })
    },
  })
}

export const useGetTodoById = (id: string, params?: QueryTodoParams,) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['todo', id],
    queryFn: () => apiTodo.getOne(id, params),
    enabled: !!id && id !== 'Add',
  })
  const { isSuccess } = query

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['todo'],
      })
    }
  }, [isSuccess, queryClient])

  return query
}


