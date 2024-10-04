'use server'

import { auth } from '@/auth'
import { readZip } from '@/lib/docs'
import { UploadProjectSchema } from '@/schemas/docs'
import { prisma } from '@/server/db'
import { ZodError } from 'zod'

export const CreateProject = async (values: FormData) => {
  try {
    const session = await auth()
    const user = session?.user

    if (!session || !user || !user.id) {
      return { error: 'Not authenticated. Please login again.' }
    }

    const data = Object.fromEntries(values)

    UploadProjectSchema.parse(data)

    const file = data.file as File
    const files_content = await readZip(file)

    const projectId = await prisma.project.create({
      data: {
        name: data.name as string,
        description: data.description as string,
        files_code: JSON.stringify(files_content),
        userId: user.id
      },
      select: {
        id: true
      }
    })

    return { data: projectId }
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors = error.errors.map((err) => ({
        field: err.path.at(0),
        message: err.message
      }))

      return { error: fieldErrors }
    }
    return { error: 'An error occurred while creating the project.' }
  }
}

export const ViewProject = async (projectId : string) => {
  return await prisma.project.findUnique({
    where: {
      id: projectId
    }
  })
}