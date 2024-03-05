'use client'

import { useDeleteTodoById, useGetTodo } from '@/ahooks/useTodo'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Suspense, useEffect } from 'react'

import { IconEye, IconPencil, IconPlus } from '@tabler/icons-react'

import DialogDelete from '@/components/DialogDelete'
import WrapPagination from '@/components/WrapPagination'
import SmalCardIcon from '@/components/card/SmalCardIcon'
import ImgTodo from '@/components/imgWrap/ImgTodo'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

const TodoContent = () => {
  const searchParams = useSearchParams()

  const getResult = useGetTodo({
    enabled: true,
    params: {
      limit: '6',
      page: searchParams?.get('page') || '1',
    },
  })

  const { data: todoData, isFetched, refetch } = getResult

  const { mutate: deleteTodo } = useDeleteTodoById()

  useEffect(() => {
    refetch()
  }, [refetch, searchParams])

  return (
    <div className="container-sm">
      <div className="mb-5 flex flex-wrap items-start justify-start gap-4">
        <Button asChild variant="black_out">
          <Link href={'/Add'}>
            <IconPlus className="mr-2" />
            Add todo
          </Link>
        </Button>
      </div>
      <div className={cn('flex flex-col items-center justify-start gap-2')}>
        {todoData?.todos.map((item, idx) => (
          <SmalCardIcon
            key={idx}
            img={
              <div className="flex-[250px]">
                <ImgTodo imgData={item} />
              </div>
            }
            title={item.title}
            subTitle={item.description}
          >
            <Link href={`/view/${item.id}`}>
              <Button className="p-2">
                <IconEye />
              </Button>
            </Link>
            <Link href={`/${item.id}`}>
              <Button className="p-2">
                <IconPencil />
              </Button>
            </Link>
            <DialogDelete
              nameDelete="SomeItem"
              onClick={() => {
                deleteTodo(item.id)
              }}
            />
          </SmalCardIcon>
        ))}
      </div>
      {todoData?.totalCount === 0 && (
        <div className="paper-rounded flex justify-center"> ~list empty~</div>
      )}
      {todoData && todoData.totalCount > 6 && (
        <div className="mt-8">
          <WrapPagination totalCount={todoData?.totalCount} />
        </div>
      )}
    </div>
  )
}

export default TodoContent
