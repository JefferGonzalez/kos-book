import { createAppAuth } from '@octokit/auth-app'
import { Octokit } from '@octokit/rest'

export const GitHubApp = (installationId: number) =>
  new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: process.env.GITHUB_APP_ID,
      privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
      installationId
    }
  })

export const getReposForInstallation = async (installationId: number) => {
  const octokit = GitHubApp(installationId)

  const response = await octokit.apps.listReposAccessibleToInstallation()

  return response.data.repositories
}
