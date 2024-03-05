'use client'

import Link from 'next/link'

import FormTasks from '@/app/(user)/(main)/[id]/_components/FormTask'

import { Button } from '@/components/ui/button'

interface FormSectionProps {
  onSubmit?: (data: Record<string, any>) => void
  isPending?: boolean
  formState?: any
}

export const SectionTask: React.FC<FormSectionProps> = ({ onSubmit, isPending, formState }) => {
  return (
    <>
      <FormTasks />

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
