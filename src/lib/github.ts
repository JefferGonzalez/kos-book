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
