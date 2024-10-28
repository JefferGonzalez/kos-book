import { Endpoints } from '@octokit/types'

export type Repositories =
  Endpoints['GET /installation/repositories']['response']['data']['repositories']

interface RepoProject {
  repoId: string
  projectId: string
}
