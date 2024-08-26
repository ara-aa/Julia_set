import clsx from 'clsx'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './form'
import { Input } from './input'

import type { UseFormReturn } from 'react-hook-form'

type Props = {
  // biome-ignore lint: <explanation>
  form: UseFormReturn<any>
  name: string
  label: string
  description?: string
}
export const FormInput = (props: Props) => {
  const { form, name, label, description } = props
  const { errors } = form.formState

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              className={clsx(errors[name] && 'border-red-500')}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
