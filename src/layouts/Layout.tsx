import NavBar from '@/components/common/NavBar'
import { Fragment, PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <main className='container mx-auto px-8 max-w-[1100px]'>
        <NavBar />

        {children}
      </main>
    </Fragment>
  )
}
