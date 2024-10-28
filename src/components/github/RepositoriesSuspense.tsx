'use client'

import { LoaderIcon } from 'lucide-react'

export default function RepositoriesSuspense() {
  return (
    <section className='h-full flex flex-col justify-center items-center gap-y-2'>
      <LoaderIcon
        size={80}
        className='transition-all duration-1000 animate-spin'
      />
      <p>Please be patient. We are working on it.</p>
    </section>
  )
}
