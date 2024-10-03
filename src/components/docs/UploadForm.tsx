'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { UploadProject, UploadProjectSchema } from '@/schemas/docs'
import { CreateProject } from '@/server/actions/docs'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '../ui/button'

export default function UploadForm() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const form = useForm<UploadProject>({
    resolver: zodResolver(UploadProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      file: undefined
    }
  })

  const onSubmit = async (data: UploadProject) => {
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('description', data.description ?? '')
      formData.append('file', data.file)

      const response = await CreateProject(formData)

      if (response.error) {
        if (Array.isArray(response.error)) {
          for (const error of response.error) {
            const name = error.field as keyof UploadProject

            form.setError(name, { message: error.message })
          }
        }

        if (typeof response.error === 'string') {
          toast.error(response.error)
        }

        setLoading(false)
        return
      }

      const projectId = response.data?.id

      if (!projectId) {
        toast.error('An error occurred while creating the project.')
      }

      toast.success('Project created successfully.', {
        description: 'You will be redirected to the preview page.',
        duration: 1500
      })

      setTimeout(() => {
        router.push(`/docs/preview/${projectId}`)
      }, 1500)

      form.reset()
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while creating the project.')
    }
  }

  return (
    <Form {...form}>
      <form
        className='bg-zinc-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 min-w-[334px]'
        method='post'
        encType='multipart/form-data'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='mb-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field, fieldState }) => (
              <FormItem className='w-full'>
                <FormLabel className='block text-gray-900 text-sm font-bold mb-2'>
                  Project&apos;s name:
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Write the name of the project'
                    className='bg-zinc-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>

                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div className='mb-4'>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='block text-gray-900 text-sm font-bold mb-2'>
                  Description (optional):
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Write the project description'
                    className='bg-zinc-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className='mb-4'>
          <FormField
            name='file'
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem className='w-full'>
                <FormLabel className='block text-gray-900 text-sm font-bold mb-2'>
                  Code
                </FormLabel>
                <FormControl>
                  <Input
                    type='file'
                    accept='.zip'
                    className='bg-zinc-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    onChange={(e) => {
                      const file = e.target.files?.[0]

                      if (file) field.onChange(file)
                    }}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div className='flex items-center justify-center'>
          <Button
            className='flex gap-x-2 bg-zinc-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
            disabled={loading}
          >
            {loading && (
              <LoaderIcon className='transition-all duration-1000 animate-spin' />
            )}
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}
