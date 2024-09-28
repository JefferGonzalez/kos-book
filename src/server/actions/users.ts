'use server'

import { prisma } from '@/server/db'

export const getUsers = async () => {
  const users  = prisma.user.findMany()

  return users
}
