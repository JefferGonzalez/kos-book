'use server'

import { auth } from '@/auth'
import { buildTreeFromZip } from '@/lib/docs'
import { findNode, TreeNode, updateNode } from '@/lib/nodes'
import { UploadProjectSchema } from '@/schemas/docs'
import { prisma } from '@/server/db'
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'
import { revalidatePath } from 'next/cache'
import { ZodError } from 'zod'

const PROMPT = `
  You are a professional technical writer. Your task is to create comprehensive documentation for the following code. Please include the following sections in your response:

  1. **Overview**: Provide a brief overview of what the code does.
  2. **Functionality**: Explain the functionality of each function or class in the code.
  3. **Parameters**: Describe the parameters for each function, including their types and what they represent.
  4. **Return Values**: Describe the return values for each function, including their types.
  5. **Examples**: Provide one or more examples of how to use the functions or classes in the code.
  6. **Error Handling**: Mention any error handling included in the code or potential errors to be aware of.
  7. **Edge Cases**: Discuss any edge cases that the code handles or should handle.
`

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
    const { nodes, nodesWithoutContent } = await buildTreeFromZip(file)

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

  if (typeof project.files_code !== 'string') {
    return { error: 'No code found in the project. Please refresh the page.' }
  }

  const code = JSON.parse(project.files_code) as TreeNode[]

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

  if (typeof project.documentation === 'string') {
    const documentation = JSON.parse(project.documentation) as TreeNode[]

    if (!updateNode(documentation, nodeId, content)) return false

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
  }

  return false
}

export const GenerateDocs = async (code: string) => {
  const stream = createStreamableValue()

  const user_message = `
    Here is the code:

    ${code}

    Now, please generate documentation for this code.
  `

  ;(async () => {
    const { textStream } = await streamText({
      model: openai('gpt-3.5-turbo'),
      messages: [
        { role: 'system', content: PROMPT },
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
