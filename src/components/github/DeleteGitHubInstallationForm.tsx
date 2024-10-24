'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DeleteGitHubInstallation } from '@/schemas/github'
import { UseFormReturn } from 'react-hook-form'

interface Props {
  form: UseFormReturn<DeleteGitHubInstallation>
  loading: boolean
  handleSubmit: (values: DeleteGitHubInstallation) => void
  handleCancel: (value: boolean) => void
}

export default function DeleteGitHubInstallationForm({
  form,
  loading,
  handleSubmit,
  handleCancel
}: Props) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        <FormField
          name='text'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormItem className='w-full'>
              <FormLabel className='font-normal'>
                To verify, type{' '}
                <span className='font-bold'>delete the installation</span>{' '}
                below:
              </FormLabel>
              <FormControl>
                <Input disabled={loading} {...field} />
              </FormControl>

              <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
          )}
        />

        <footer className='flex justify-between gap-x-4 rounded-b-md p-4'>
          <Button
            title='Cancel'
            variant='secondary'
            type='button'
            disabled={loading}
            onClick={() => handleCancel(false)}
          >
            Cancel
          </Button>

          <Button
            title='Delete Installation'
            variant='destructive'
            type='submit'
            disabled={loading}
          >
            Delete Installation
          </Button>
        </footer>
      </form>
    </Form>
  )
}
