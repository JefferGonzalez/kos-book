'use client'

import LateralBar from '@/components/common/LateralBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-[calc(100vh-5rem)] gap-2 p-2 md:flex-row md:overflow-hidden'>
      <div className='w-full flex-none md:w-60'>
        <LateralBar />
      </div>
      <div className='flex-grow'>{children}</div>
    </div>
  )
}
