import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/server/db'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import {
  GITHUB_CLIENT_SECRET,
  GITHUB_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_ID
} from '@/config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT_SECRET
    }),
    Github({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_CLIENT_SECRET
    })
  ]
})
