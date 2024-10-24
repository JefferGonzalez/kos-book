import { auth } from '@/auth'
import UninstallGitHubApp from '@/components/github/UninstallApp'
import { Button } from '@/components/ui/button'
import GitHubIcon from '@/icons/GitHub'
import { getReposForInstallation } from '@/lib/github'
import { getRandomColor } from '@/lib/utils'
import { getGitHubInstallation } from '@/server/actions/users'
import { Repositories } from '@/types/github'

import '@/styles/dashboard.css'

const INSTALL_APP_URL = `https://github.com/apps/${process.env.GITHUB_APP_NAME}/installations/new`

export default async function Page() {
  const session = await auth()
  const user = session?.user

  if (!session || !user || !user.id) {
    return <div>Not authenticated. Please login again.</div>
  }

  const installation = await getGitHubInstallation(user.id)

  let repos: Repositories = []

  if (installation) {
    repos = await getReposForInstallation(installation.installationId)
  }

  return (
    <section className='bg-blue-50 h-full p-6 shadow-xl rounded-lg dark:bg-[#061c33]'>
      <h1 className='text-3xl font-extrabold mb-4'>
        Connect GitHub Repository
      </h1>
      <p className='text-md'>
        To use this app, you need to install it on your repositories. Click the
        button below to install the app.
      </p>

      <div className='flex gap-x-4'>
        <Button asChild className='flex gap-x-2 mt-4'>
          <a href={INSTALL_APP_URL}>
            <GitHubIcon className='w-6 h-6' />
            {installation
              ? 'Add the app to more repositories.'
              : 'Install the app on your repositories.'}
          </a>
        </Button>

        {installation && (
          <UninstallGitHubApp installationId={installation.installationId} />
        )}
      </div>

      {repos.length > 0 && (
        <section className='masonry-grid mt-6'>
          {repos.map((repo) => {
            const cardColor = getRandomColor()

            return (
              <article
                key={repo.id}
                className='card dark:shadow-2xl'
                style={{
                  border: `2px solid ${cardColor}`,
                  backgroundColor: `${cardColor}1A`
                }}
              >
                <h3 className='text-lg font-extrabold text-gray-800 mb-2 dark:text-white'>
                  {repo.name}
                </h3>

                {repo.description && (
                  <p className='text-gray-600 mb-4 dark:text-[#e4e4e7ad] break-all'>
                    {repo.description}
                  </p>
                )}
              </article>
            )
          })}
        </section>
      )}
    </section>
  )
}
