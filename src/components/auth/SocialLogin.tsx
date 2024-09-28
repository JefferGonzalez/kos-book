'use client'

import { Button } from '@/components/ui/button'
import GitHubIcon from '@/icons/GitHub'
import GoogleIcon from '@/icons/Google'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT_URL } from '@/constants'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'

const social = [
  {
    title: 'Continue with Google',
    icon: <GoogleIcon className='size-8' />,
    name: 'Google'
  },
  {
    title: 'Continue with GitHub',
    icon: <GitHubIcon className='size-8' />,
    name: 'Github'
  }
]

export default function SocialLogin() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const [loading, setLoading] = useState<boolean>(false)
  const [provider, setProvider] = useState<string | null>()

  const handleSocialLogin = async (provider: string) => {
    try {
      setLoading(true)
      setProvider(provider)
      await signIn(provider.toLowerCase(), {
        callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT_URL
      })
    } catch {
      toast.error('An error occurred while trying to sign in')
    }
  }

  return (
    <section className='flex justify-center space-x-6'>
      {social.map((social) => (
        <Button
          key={social.name}
          title={social.title}
          className='flex gap-2 h-12 rounded-xl text-2xl px-4 py-1'
          variant={'outline'}
          onClick={() => handleSocialLogin('google')}
          disabled={loading}
        >
          {provider === social.name ? (
            <Loader className='animate-spin' size={18} />
          ) : (
            social.icon
          )}
          <span className='sr-only'>{social.name}</span>
          {social.name}
        </Button>
      ))}
    </section>
  )
}
