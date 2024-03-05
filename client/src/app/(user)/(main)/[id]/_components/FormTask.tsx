'use client'

import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { IconPlus, IconX } from '@tabler/icons-react'

import FormInput from '@/components/form/FormInput'
import { FormSwitch } from '@/components/form/FormSwitch'
import { Button } from '@/components/ui/button'
import { FormMessage } from '@/components/ui/form'

import { cn } from '@/lib/utils'

const FormTasks = () => {
  const form = useFormContext()

  const { fields, append, remove } = useFieldArray({
    name: 'tasks',
  })

  return (
    <>
      <div className={cn('grid grid-cols-1 gap-6', 'sm:grid-cols-2 md:grid-cols-3 ')}>
        {fields.map((item, index) => (
          <div>
            <div key={item.id}>
              <div className="paper-rounded mb-[10px] flex w-full flex-col items-center gap-[20px] bg-white">
                <div className="flex w-full  gap-5">
                  <FormInput name={`tasks.${index}.title`} />
                  <div>
                    <IconX
                      className="!h-6 !w-6 cursor-pointer text-inherit"
                      onClick={() => remove(index)}
                    />
                  </div>
                </div>
                <FormInput name={`tasks.${index}.description`} />

                <FormSwitch name={`tasks.${index}.status`} label="switch" />
              </div>
            </div>

            {!form.watch(`tasks.${index}.title`) && (
              <FormMessage className="float">Task name is required.</FormMessage>
            )}
            {/* @ts-ignore */}
            {form.formState.errors.tasks?.[index]?.text && (
              <FormMessage className="float">
                {/* @ts-ignore */}
                {form.formState.errors.tasks[index].text.message}
              </FormMessage>
            )}
          </div>
        ))}
      </div>
      <Button
        onClick={() =>
          append({
            name: '',
            task: 'https://www.youtube.com/',
          })
        }
      >
        <IconPlus />
      </Button>
      {form.formState.errors.tasks && (
        <p className={cn('text-sm font-medium text-destructive')}>
          {form.formState.errors.tasks.message as keyof typeof form.formState.errors}
        </p>
      )}
    </>
  )
}

export default FormTasks
