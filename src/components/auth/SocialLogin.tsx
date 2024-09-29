'use client'

import { Suspense, useState } from 'react'
import { Button } from '@/components/ui/button'
import GitHubIcon from '@/icons/GitHub'
import GoogleIcon from '@/icons/Google'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT_URL } from '@/constants'
import { useSearchParams } from 'next/navigation'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import "../../styles/Button.css"

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
          className='button'
          variant={'outline'}
         
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
