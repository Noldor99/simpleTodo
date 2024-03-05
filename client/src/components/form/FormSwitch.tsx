'use client'

import { useFormContext } from 'react-hook-form'

import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'

interface FormSwitchProps {
  name: string
  label: string
}

export function FormSwitch({ name, label }: FormSwitchProps) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-row items-center justify-between gap-3 rounded-lg border p-3 shadow-sm">
          <div>
            <FormLabel>{label}</FormLabel>
            {/* <FormDescription>
                  Receive emails about your account security.
                </FormDescription> */}
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} aria-readonly />
          </FormControl>
        </FormItem>
      )}
    />
  )
}
