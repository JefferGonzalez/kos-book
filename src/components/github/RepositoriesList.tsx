'use client'

import { getRandomColor } from '@/lib/utils'
import { CreateProjectFromRepo } from '@/server/actions/github'
import { Repositories } from '@/types/github'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  installationId: number
  repositories: Repositories
}

export default function RepositoriesList({
  repositories,
  installationId
}: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCreateProject = async (repo: string, description?: string) => {
    setLoading(true)
    const response = await CreateProjectFromRepo(
      installationId,
      repo,
      description
    )

    if (response.error) {
      toast.error(response.error)

      setLoading(false)
      return
    }

    const projectId = response.data?.id

    if (!projectId) {
      toast.error(
        'An error occurred while creating the project. Please try again. If the issue persists, please contact support.'
      )

      setLoading(false)
      return
    }

    toast.success('Project created successfully.', {
      description: 'You will be redirected to the preview page.',
      duration: 1000
    })

    setLoading(false)

    setTimeout(() => {
      router.push(`/dashboard/preview/${projectId}`)
    }, 1000)
  }

  return (
    <>
      {repositories.length > 0 && (
        <section className='masonry-grid mt-6'>
          {repositories.map((repo) => {
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

                <div className='flex justify-between'>
                  <button
                    onClick={() =>
                      handleCreateProject(
                        repo.name,
                        repo.description ?? undefined
                      )
                    }
                    className='preview-button'
                    disabled={loading}
                  >
                    <span className='sr-only'>Create Project</span>
                    Create Project
                  </button>
                </div>
              </article>
            )
          })}
        </section>
      )}
    </>
  )
}
