import authConfig from '@/auth.config'
import { prisma } from '@/server/db'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  pages: { signIn: '/auth' },
  ...authConfig
})
