'use client'

import { Button } from '@/components/ui/button'
import { DEFAULT_LOGIN_REDIRECT_URL } from '@/routes'
import GitHubIcon from '@/icons/GitHub'
import GoogleIcon from '@/icons/Google'
import { Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { toast } from 'sonner'

import '@/styles/Button.css'

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

function SocialLoginContent() {
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
    <section className='auth-buttons'>
      {social.map((social) => (
        <Button
          key={social.name}
          title={social.title}
          className='button dark:text-white'
          variant={'outline'}
          onClick={() => handleSocialLogin(social.name)}
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

export default function SocialLogin() {
  return (
    <Suspense fallback={<div></div>}>
      <SocialLoginContent />
    </Suspense>
  )
}
