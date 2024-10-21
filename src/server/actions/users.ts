'use server'

import { prisma } from '@/server/db'

export const getUsers = async () => {
  const users = prisma.user.findMany()

  return users
}

export const getGitHubInstallation = async (userId: string) => {
  const installation = await prisma.gitHubInstallation.findFirst({
    where: {
      userId
    }
  })

  return installation
}
