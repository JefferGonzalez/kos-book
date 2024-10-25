import { VALID_EXTENSIONS } from '@/lib/docs'
import { buildTree, cloneNodesWithoutContent, sortNodes } from '@/lib/nodes'
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

const getTree = async (
  installationId: number,
  { owner, repo, tree_sha }: { owner: string; repo: string; tree_sha: string }
) => {
  try {
    const octokit = await GitHubApp().getInstallationOctokit(installationId)

    const response = await octokit.rest.git.getTree({
      owner,
      repo,
      tree_sha,
      recursive: 'true'
    })

    if (response.status !== 200) {
      throw new Error('Failed to get tree')
    }

    return response.data.tree
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }

    return 'An unknown error occurred'
  }
}

export const getRepoContent = async (
  installationId: number,
  { owner, repo }: { owner: string; repo: string }
) => {
  const octokit = await GitHubApp().getInstallationOctokit(installationId)

  const {
    data: { default_branch }
  } = await octokit.rest.repos.get({
    owner,
    repo
  })

  const {
    data: {
      commit: { sha }
    }
  } = await octokit.rest.repos.getBranch({
    owner,
    repo,
    branch: default_branch
  })

  const response = await getTree(installationId, { owner, repo, tree_sha: sha })

  if (typeof response === 'string') return response

  const paths = response
    .map((item) => item?.path)
    .filter((path): path is string => path !== undefined)
    .filter((path) => {
      const extension = path.split('.').pop() ?? ''

      return VALID_EXTENSIONS.includes(extension)
    })

  const nodes = await buildTree(paths, (path) =>
    getFileContent(installationId, { owner, repo, path })
  )

  const nodesWithoutContent = cloneNodesWithoutContent(nodes)

  return {
    nodes: sortNodes(nodes),
    nodesWithoutContent: sortNodes(nodesWithoutContent)
  }
}

const getFileContent = async (
  installationId: number,
  { owner, repo, path }: { owner: string; repo: string; path: string }
) => {
  const octokit = await GitHubApp().getInstallationOctokit(installationId)

  const response = await octokit.rest.repos.getContent({
    owner,
    repo,
    path
  })

  if ('content' in response.data) {
    const content = response.data.content

    if (response.data.encoding === 'base64') return atob(content)

    return content
  }

  return ''
}
