'use client'

import { LoaderContext } from '@/context/LoaderContext'
import { CreateProjectFromRepo } from '@/server/actions/github'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { toast } from 'sonner'

interface Props {
  installationId: number
  owner: string
  repo: string
  description?: string
}

export default function CreateProjectButton({
  installationId,
  owner,
  repo,
  description
}: Props) {
  const router = useRouter()

  const { isLoading, startLoading, stopLoading } = useContext(LoaderContext)

  const handleCreateProject = async () => {
    startLoading()

    const response = await CreateProjectFromRepo(
      installationId,
      owner,
      repo,
      description
    )

    if (response.error) {
      toast.error(response.error)

      stopLoading()
      return
    }

    const projectId = response.data?.id

    if (!projectId) {
      toast.error(
        'An error occurred while creating the project. Please try again. If the issue persists, please contact support.'
      )

      stopLoading()
      return
    }

    stopLoading()

    toast.success('Project created successfully.', {
      description: 'You will be redirected to the preview page.',
      duration: 1500
    })

    setTimeout(() => {
      router.push(`/dashboard/preview/${projectId}`)
    }, 1500)
  }

  return (
    <button
      onClick={handleCreateProject}
      className='bg-blue-500 text-white px-4 py-2 rounded-2xl'
      disabled={isLoading}
    >
      Create Project
    </button>
  )
}
