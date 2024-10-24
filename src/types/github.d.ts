import { RestEndpointMethodTypes } from '@octokit/rest'

export type Repositories =
  RestEndpointMethodTypes['apps']['listReposAccessibleToInstallation']['response']['data']['repositories']
