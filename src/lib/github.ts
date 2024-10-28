import { buildTreeFromZip } from '@/lib/docs'
import { App } from 'octokit'

export const GitHubApp = () =>
  new App({
    appId: process.env.GITHUB_APP_ID ?? '',
    privateKey: process.env.GITHUB_APP_PRIVATE_KEY ?? ''
  })

export const getReposForInstallation = async (installationId: number) => {
  try {
    const octokit = await GitHubApp().getInstallationOctokit(installationId)

    const response = await octokit.rest.apps.listReposAccessibleToInstallation()

    return response.data.repositories
  } catch {
    return []
  }
}

export const getRepoContent = async (
  installationId: number,
  { owner, repo }: { owner: string; repo: string }
) => {
  const octokit = await GitHubApp().getInstallationOctokit(installationId)

  const {
    data: { default_branch, id }
  } = await octokit.rest.repos.get({
    owner,
    repo
  })

  const response = await getZippedContent(installationId, {
    owner,
    repo,
    branch: default_branch
  })

  if (typeof response === 'string') return response

  const { nodes, nodesWithoutContent } = await buildTreeFromZip(response)

  return {
    repoId: id,
    nodes,
    nodesWithoutContent
  }
}

const getZippedContent = async (
  installationId: number,
  { owner, repo, branch }: { owner: string; repo: string; branch: string }
) => {
  try {
    const octokit = await GitHubApp().getInstallationOctokit(installationId)

    const response = await octokit.rest.repos.downloadZipballArchive({
      owner,
      repo,
      ref: branch,
      headers: {
        accept: 'application/vnd.github.v3.raw'
      }
    })

    const statusCode = response.status

    if (Number(statusCode) !== 200 && Number(statusCode) !== 302) {
      throw new Error(
        'Failed to get repository information. Please try again. If the issue persists, please contact support.'
      )
    }

    if (response.data instanceof ArrayBuffer) {
      const buffer = Buffer.from(new Uint8Array(response.data))

      return buffer
    } else {
      throw new Error(
        'Failed to convert repository information. Please try again. If the issue persists, please contact support.'
      )
    }
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }

    return 'An unknown error occurred'
  }
}
