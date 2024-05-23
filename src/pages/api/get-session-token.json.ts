import type { APIRoute } from 'astro'
import { getSession } from 'auth-astro/server'

export const GET: APIRoute = async ({ request }) => {
  const session = await getSession(request)

  if (session?.user) {
    const API_URL = import.meta.env.PUBLIC_API_URL

    try {
      const response = await fetch(`${API_URL}/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: session.user.name,
          email: session.user.email,
          provider_id: session.user.id
        })
      })

      if (response.ok) {
        const data = await response.json()

        return new Response(
          JSON.stringify({
            token: data.token,
            refresh: data.refresh
          }),
          {
            status: 200,
            statusText: 'OK'
          }
        )
      } else {
        const response = await fetch(`${API_URL}/auth/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: session.user.email,
            password: session.user.id
          })
        })

        const data = await response.json()

        return new Response(
          JSON.stringify({
            token: data.access,
            refresh: data.refresh
          }),
          {
            status: 200,
            statusText: 'OK'
          }
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  return new Response(
    JSON.stringify({
      error: 'Unauthorized'
    }),
    {
      status: 401,
      statusText: 'Unauthorized'
    }
  )
}
