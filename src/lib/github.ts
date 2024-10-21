import { createAppAuth } from '@octokit/auth-app'
import { Octokit, RestEndpointMethodTypes } from '@octokit/rest'

export type RepoContent =
  RestEndpointMethodTypes['repos']['getContent']['response']['data']

export type Repositories =
  RestEndpointMethodTypes['apps']['listReposAccessibleToInstallation']['response']['data']['repositories']

export const GitHubApp = (installationId: number) =>
  new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: process.env.GITHUB_APP_ID,
      privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
      installationId
    }
  })

export const getRepos = async (installationId: number) => {
  const octokit = GitHubApp(installationId)

  const response = await octokit.apps.listReposAccessibleToInstallation()

  return response.data.repositories
}
