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
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        token.accessToken = account.access_token
      }

      return token
    },
    session: async ({ token, session }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      session.accessToken = token.accessToken as string

      return session
    }
  },
  ...authConfig
})
