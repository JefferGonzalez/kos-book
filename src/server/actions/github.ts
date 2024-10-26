'use server'

import { auth } from '@/auth'
import { getRepoContent, GitHubApp } from '@/lib/github'
import { prisma } from '@/server/db'
import { revalidatePath } from 'next/cache'

export const CreateProjectFromRepo = async (
  installationId: number,
  owner: string,
  repo: string,
  description?: string
) => {
  try {
    const session = await auth()
    const user = session?.user

    if (!session || !user || !user.id) {
      return { error: 'Not authenticated. Please login again.' }
    }

    const response = await getRepoContent(installationId, {
      owner,
      repo
    })

    if (typeof response === 'string') {
      return { error: response }
    }

    const projectId = await prisma.project.create({
      data: {
        name: repo,
        description: description,
        files_code: JSON.stringify(response.nodes),
        documentation: JSON.stringify(response.nodesWithoutContent),
        userId: user.id
      },
      select: {
        id: true
      }
    })

    revalidatePath('/dashboard')

    return { data: projectId }
  } catch {
    return {
      error:
        'An error occurred while creating the project. Please try again. If the issue persists, please contact support.'
    }
  }
}

export const UninstallApp = async (installationId: number) => {
  try {
    const session = await auth()
    const user = session?.user

    if (!session || !user || !user.id) {
      return { error: 'Not authenticated. Please login again.' }
    }

    const octokit = await GitHubApp().getInstallationOctokit(installationId)

    const response = await octokit.rest.apps.deleteInstallation({
      installation_id: installationId
    })

    if (response.status !== 204) {
      return {
        error:
          'An error occurred while uninstalling the app. Please try again. If the issue persists, please contact support.'
      }
    }

    return await DeleteGitHubInstallation(installationId, user.id)
  } catch {
    return {
      error:
        'An error occurred while uninstalling the app. Please try again. If the issue persists, please contact support.'
    }
  }
}

export const DeleteGitHubInstallation = async (
  installationId: number,
  userId: string
) => {
  try {
    const installation = await prisma.gitHubInstallation.findFirst({
      where: {
        installationId,
        userId
      }
    })

    if (!installation) {
      return {
        error:
          'An error occurred while deleting the installation. Please try again. If the issue persists, please contact support.'
      }
    }

    await prisma.gitHubInstallation.delete({
      where: {
        id: installation.id
      }
    })

    revalidatePath('/dashboard/github')

    return true
  } catch {
    return {
      error:
        'An error occurred while deleting the installation. Please try again. If the issue persists, please contact support.'
    }
  }
}
