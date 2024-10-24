import { Endpoints } from '@octokit/types'

export type Repositories =
  Endpoints['GET /installation/repositories']['response']['data']['repositories']
