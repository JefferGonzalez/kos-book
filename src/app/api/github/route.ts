import { auth } from '@/auth'
import { GitHubApp } from '@/lib/github'
import { prisma } from '@/server/db'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const installationId = searchParams.get('installation_id')
    const setup_action = searchParams.get('setup_action')

    if (!installationId || !setup_action) {
      return NextResponse.redirect('/auth')
    }

    const session = await auth()

    if (!session || !session.user || !session.user.id) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }

    const octokit = await GitHubApp().getInstallationOctokit(
      Number(installationId)
    )

    await octokit.rest.apps.getInstallation({
      installation_id: Number(installationId)
    })

    if (setup_action === 'install') {
      await prisma.gitHubInstallation.create({
        data: {
          installationId: Number(installationId),
          userId: session.user.id
        }
      })
    }

    return NextResponse.redirect(new URL('/dashboard/github', request.url))
  } catch {
    return NextResponse.redirect(new URL('/not-found', request.url))
  }
}
