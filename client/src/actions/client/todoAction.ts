import { z } from 'zod'
import { api } from '@/lib/axios'

import { AxiosResponse } from 'axios'
import { ITodos, ITodo, ITodoId } from '@/types/todo';

export const TodoSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .trim()
    .min(3, {
      message: 'Title must be at least 3 characters long',
    })
    .max(100, {
      message: 'Title must be less than 100 characters long',
    }),
  description: z
    .string()
    .trim()
    .min(3, {
      message: 'Description must be at least 3 characters long',
    })
    .max(255, {
      message: 'Description must be less than 255 characters long',
    }),
  todoImg: z
    .custom<File>()
    .refine((files) => files, 'Image is required and must be a valid image format.')
    .refine((files) => files?.size <= 5000000, `Max file size is 5MB.`)
    .or(z.string()),

  tasks: z
    .array(
      z.object({
        title: z
          .string()
          .trim()
          .min(3, {
            message: 'task must be at least 3 characters long',
          })
          .max(100, {
            message: 'task must be less than 100 characters long',
          })
          .refine((value) => value.trim().length > 0, { message: 'Task name is required.' }),
        description: z
          .string()
          .trim()
          .min(3, {
            message: 'Description must be at least 3 characters long',
          })
          .max(255, {
            message: 'Description must be less than 255 characters long',
          }),
        status: z.boolean()
      }),
      {
        required_error: 'Tasks is required.',
      }
    )
    .refine((tasks) => tasks !== undefined && tasks !== null && tasks.length > 0, {
      message: 'At least one task is required.',
    }),
});

export type ITodoSchema = z.infer<typeof TodoSchema>

export interface QueryTodoParams {
  page?: string;
  limit?: string;
  sort?: 'all' | 'completed' | 'notcompleted';
}

export interface ApiTodo {
  create: (body: FormData | ITodoSchema) => Promise<ITodo>;
  getAll: (params: QueryTodoParams) => Promise<ITodos>;
  getOne: (id: string, params?: QueryTodoParams) => Promise<ITodoId>;
  update: (todoId: string, body: FormData | ITodoSchema) => Promise<ITodo>;
  remove: (id: string) => Promise<void>;
}

export const apiTodo: ApiTodo = {
  create: (body) => api.post('/todo', body).then(qw),
  getAll: (params) => api.get('/todo', { params }).then(qw),
  getOne: (id, params) => api.get(`/todo/${id}`, { params }).then(qw),
  update: (todoId, body) => api.patch(`/todo/${todoId}`, body).then(qw),
  remove: (id) => api.delete(`/todo/${id}`).then(qw),
};


const qw = <T>(response: AxiosResponse<T>): T => response.data;