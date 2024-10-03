import z from 'zod'

const MAX_UPLOAD_SIZE = 100000000 // 100MB
const ACCEPTED_FILE_TYPE = ['application/zip', 'application/x-zip-compressed']

export const UploadProjectSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Project name must be a string.',
      required_error: 'Project name is required.'
    })
    .min(1, { message: 'Please enter a project name.' }),
  description: z.string().optional(),
  file: z
    .instanceof(File, {
      message: 'Please upload a file.'
    })
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, {
      message: `File size must be less than ${MAX_UPLOAD_SIZE / 1000000}MB.`
    })
    .refine((file) => file.type && ACCEPTED_FILE_TYPE.includes(file.type), {
      message: `File must be a zip file.`
    })
})

export type UploadProject = z.TypeOf<typeof UploadProjectSchema>
