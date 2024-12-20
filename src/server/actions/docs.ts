'use server'

import { auth } from '@/auth'
import { buildTreeFromZip } from '@/lib/docs'
import { findNode, TreeNode, updateNode } from '@/lib/nodes'
import { UploadProjectSchema } from '@/schemas/docs'
import { prisma } from '@/server/db'
import { openai } from '@ai-sdk/openai'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'
import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'
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
    const buffer = Buffer.from(await file.arrayBuffer())

    const { nodes, nodesWithoutContent } = await buildTreeFromZip(buffer)

    const projectId = await prisma.project.create({
      data: {
        name: data.name as string,
        description: data.description as string,
        files_code: JSON.stringify(nodes),
        documentation: JSON.stringify(nodesWithoutContent),
        userId: user.id
      },
      select: {
        id: true
      }
    })

    revalidatePath('/dashboard')

    return { data: projectId }
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors = error.errors.map((err) => ({
        field: err.path.at(0),
        message: err.message
      }))

      return { error: fieldErrors }
    }

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const fieldErrors = [
          {
            field: 'name',
            message:
              'The name already exists. Please choose a different name for the project.'
          }
        ]

        return { error: fieldErrors }
      }
    }

    return { error: 'An error occurred while creating the project.' }
  }
}

export const ListProjects = async () => {
  const session = await auth()
  const user = session?.user

  if (!session || !user || !user.id) {
    return { error: 'Not authenticated. Please login again.' }
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: user.id
    }
  })

  return { data: projects }
}

export const ViewProject = async (projectId: string) => {
  const session = await auth()
  const user = session?.user

  if (!session || !user || !user.id) {
    return { error: 'Not authenticated. Please login again.' }
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      userId: user.id
    }
  })

  return { project }
}

export const GetProjectByName = async (name: string) => {
  const project = await prisma.project.findFirst({
    where: {
      name
    },
    select: {
      id: true,
      documentation: true
    }
  })

  if (!project) {
    return notFound()
  }

  return { project }
}

export const getContentNode = async (projectId: string, nodeId: string) => {
  const project = await prisma.project.findUnique({
    select: {
      files_code: true
    },
    where: {
      id: projectId
    }
  })

  if (!project) {
    return { error: 'Project not found. Please refresh the page.' }
  }

  let code: TreeNode[] = []

  if (typeof project.files_code === 'string') {
    code = JSON.parse(project.files_code) as TreeNode[]
  } else if (typeof project.files_code === 'object') {
    code = JSON.parse(JSON.stringify(project.files_code)) as TreeNode[]
  } else {
    return { error: 'No code found in the project. Please refresh the page.' }
  }

  const node = findNode(code, nodeId)

  if (!node || !node.content) {
    return { error: 'No code found in the project. Please refresh the page.' }
  }

  return { code: node.content }
}

export const updateDocumentation = async (
  projectId: string,
  nodeId: string,
  content: string
) => {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId
    }
  })

  if (!project) return false

  let documentation: TreeNode[] = []

  if (typeof project.documentation === 'string') {
    documentation = JSON.parse(project.documentation) as TreeNode[]
  } else if (typeof project.documentation === 'object') {
    documentation = JSON.parse(JSON.stringify(project.documentation)) as TreeNode[]
  } else {
    return false
  }

  if (!updateNode(documentation, nodeId, content)) return false

  try {
    await prisma.project.update({
      where: {
        id: projectId
      },
      data: {
        documentation: JSON.stringify(documentation)
      }
    })

    revalidatePath(`/dashboard/preview/${projectId}`)

    return true
  } catch {
    return false
  }
}

export const deleteProject = async (projectId: string) => {
  try {
    const session = await auth()
    const user = session?.user

    if (!session || !user || !user.id) {
      return { error: 'Not authenticated. Please login again.' }
    }

    await prisma.project.delete({
      where: {
        id: projectId,
        userId: user.id
      }
    })

    revalidatePath('/dashboard')

    return { data: true }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2003' || error.code === 'P2023') {
        return { error: 'Not authenticated. Please login again.' }
      } else if (error.code === 'P2025') {
        return { error: 'Project not found, please refresh the page.' }
      }
    }

    return { error: 'An error occurred while deleting the project.' }
  }
}

export const GenerateDocs = async (code: string) => {
  const model = process.env.GPT_MODEL
  const prompt = process.env.GPT_PROMPT
  let user_message = process.env.GPT_USER_MESSAGE

  if (!model || !prompt || !user_message) {
    return { output: 'Configuration error. Please contact support.' }
  }

  user_message = user_message.replace('{code}', code)

  const stream = createStreamableValue()

  ;(async () => {
    const { textStream } = await streamText({
      model: openai(model),
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: user_message }
      ]
    })

    for await (const delta of textStream) {
      stream.update(delta)
    }

    stream.done()
  })()

  return { output: stream.value }
}

export const getProjectsByRepoIds = async (
  repoIds: string[],
  userId: string
) => {
  const projects = await prisma.project.findMany({
    where: {
      repoId: {
        in: repoIds
      },
      userId
    },
    select: {
      repoId: true,
      id: true
    }
  })

  return projects
    .filter(
      (item): item is { repoId: string; id: string } => item.repoId !== null
    )
    .map((item) => ({
      repoId: item.repoId,
      projectId: item.id
    }))
}
