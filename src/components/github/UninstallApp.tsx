'use client'

import DeleteGitHubInstallationForm from '@/components/github/DeleteGitHubInstallationForm'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import {
  DeleteGitHubInstallation,
  DeleteGitHubInstallationSchema
} from '@/schemas/github'
import { UninstallApp } from '@/server/actions/github'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface Props {
  installationId: number
}

export default function UninstallGitHubApp({ installationId }: Props) {
  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<DeleteGitHubInstallation>({
    resolver: zodResolver(DeleteGitHubInstallationSchema)
  })

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const response = await UninstallApp(installationId)

      if (typeof response === 'object') {
        toast.error(response.error)
        setLoading(false)

        return
      }

      toast.success('The app has been uninstalled successfully.')
      setLoading(false)
    } catch {
      toast.error(
        'An error occurred while uninstalling the app. Please try again.'
      )
    }
  }

  const handleCancel = () => {
    form.clearErrors()
    form.reset()

    setShowDisclaimer(false)
  }

  const handleShowDisclaimer = (boolean: boolean) => {
    if (loading) return

    form.clearErrors()
    form.reset()

    setShowDisclaimer(boolean)
  }

  return (
    <>
      <Button
        onClick={() => setShowDisclaimer(true)}
        variant={'destructive'}
        className='flex gap-x-2 mt-4'
      >
        Uninstall the app
      </Button>

      <Dialog open={showDisclaimer} onOpenChange={handleShowDisclaimer}>
        <DialogContent
          className='overflow-hidden p-0 shadow-lg border-neutral-700'
          onInteractOutside={(e) => e.preventDefault()}
        >
          <section className='p-8'>
            <DialogTitle className='text-2xl font-bold mb-4'>
              Delete the GitHub installation
            </DialogTitle>
            <p className='text-pretty p-2 rounded-md bg-red-500'>
              This action is not reversible. Please be sure.
            </p>

            <Separator className='my-4 bg-neutral-500' />

            <DeleteGitHubInstallationForm
              form={form}
              loading={loading}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
            />
          </section>
        </DialogContent>
      </Dialog>
    </>
  )
}
