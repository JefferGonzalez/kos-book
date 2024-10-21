import authConfig from '@/auth.config'
import {
  API_AUTH_URL,
  AUTH_PATHS,
  DEFAULT_LOGIN_REDIRECT_URL,
  PROTECTED_PATHS
} from '@/routes'
import NextAuth from 'next-auth'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const { pathname } = nextUrl

  const isApiAuthRoute = pathname.startsWith(API_AUTH_URL)

  if (isApiAuthRoute) return

  const isAuthenticated = !!req.auth
  const isAuthRoute = AUTH_PATHS.includes(pathname)

  if (isAuthRoute) {
    if (isAuthenticated) {
      const newUrl = new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl.origin)

      return Response.redirect(newUrl)
    }

    return
  }

  const isProtectedRoute = PROTECTED_PATHS.some((p) => pathname.startsWith(p))

  if (!isAuthenticated && isProtectedRoute) {
    return Response.redirect(new URL('/auth', nextUrl.origin))
  }
})

export const config = {
  matcher: [
    '/((?!_next/|images/|docs/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)'
  ]
}
