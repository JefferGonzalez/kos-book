'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function NotFoundPage() {
  const router = useRouter()

  return (
    <section className='flex flex-col items-center space-y-3 py-20'>
      <p>404 | This page could not be found.</p>
      <picture>
        <Image
          src='/images/this-is-fine-404.gif'
          alt='This is fine.'
          title='This is fine.'
          loading='lazy'
          width={640}
          height={360}
          unoptimized
        />
      </picture>

      <Button onClick={() => router.back()} title='Go back'>
        <span className='sr-only'>Go back</span>
        Go back
      </Button>
    </section>
  )
}
