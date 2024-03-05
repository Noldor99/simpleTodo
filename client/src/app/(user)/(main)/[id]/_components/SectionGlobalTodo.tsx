'use client'

import Link from 'next/link'

import FormDropImg from '@/components/form/FormDropImg'
import FormInput from '@/components/form/FormInput'
import { FormTextarea } from '@/components/form/FormTextarea'
import ImgTodo from '@/components/imgWrap/ImgTodo'
import { Button } from '@/components/ui/button'

import FormTasks from './FormTask'

interface FormSectionProps {
  onSubmit?: (data: Record<string, any>) => void
  isPending?: boolean
  formState?: any
}

export const SectionGlobalTodo: React.FC<FormSectionProps> = ({
  onSubmit,
  isPending,
  formState,
}) => {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <FormInput name="title" placeholder="Todo title" />
      </div>
      <FormTextarea name="description" placeholder="Todo description" />
      <div>
        <div className="max-w-[300px]">
          <FormDropImg textButton="Add" name="todoImg" imgRender={<ImgTodo />} />
        </div>
        <FormTasks />
      </div>

      <div className="flex  justify-between">
        <Button
          type="submit"
          className="mt-6"
          onClick={onSubmit}
          disabled={isPending || !formState.isValid ? true : formState.isDirty ? false : true}
        >
          Save todo
        </Button>
        <Link href={`/`}>
          <Button variant="black_out">Back</Button>
        </Link>
      </div>
    </>
  )
}
