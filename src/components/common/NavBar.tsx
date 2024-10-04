'use client'

import ChangeTheme from '@/components/common/ChangeTheme'
import { Button } from '@/components/ui/button'
import HamburgerIcon from '@/icons/Hamburger'
import { handleSignOut } from '@/server/actions/auth'
import { LoaderIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'


import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function NavBar() {
  const { status } = useSession()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isSessionLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated'

  const signOut = async () => {
    await handleSignOut()
  }

  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <nav className='flex items-center justify-between backdrop-blur-sm sticky p-2 top-0 z-40'>
      <Link
        href='/'
        className='text-sm sm:text-base md:text-2xl font-bold flex items-center gap-1'
        title="KOS'BOOK"
      >
        <span className='sr-only'>KOS&apos;BOOK | Documentation Tool</span>
        KOS&apos;BOOK | Documentation Tool
      </Link>

      <section
        className={`sm:flex space-x-1 ${isMenuOpen ? 'flex' : 'hidden'}`}
      >
        
        {pathname !== '/auth' && !isAuthenticated && (
          <Link href='/auth'>
            <Button className='rounded-xl flex gap-x-2' variant={'outline'} size={'sm'}>
              <span className='sr-only'>Sign In</span>
              Sign In
              {isSessionLoading && (
                <LoaderIcon className='transition-all duration-1000 animate-spin' />
              )}
            </Button>
          </Link>
        )}
        {isAuthenticated && (
          <Button className='flex gap-x-2' variant={'outline'} onClick={signOut}>
            <span className='sr-only'>Cerrar sesión</span>
            Cerrar sesión
          </Button>
        )}

        <ChangeTheme />
      </section>
   

      <Button
        className='sm:hidden rounded-xl ml-2'
        variant={'outline'}
        size={'sm'}
        onClick={onToggleMenu}
      >
        <span className='sr-only'>Menu</span>
        <HamburgerIcon />
      </Button>
    </nav>
  )
}
