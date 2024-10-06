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

import '@/styles/NavBar.css'

export default function NavBar() {
  const { status } = useSession()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isSessionLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated'

  const signOut = async () => {
    await handleSignOut()
  }

  const MenuClass = isMenuOpen ? 'menu-open' : ''

  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className='flex items-center justify-between sticky p-4 px-11 top-0 z-40 backdrop-blur-lg bg-gray-800/80 text-white shadow-md'>
      <Link href='/'>
        <span className='navbar-title'>KOS&apos;BOOK | Documentation Tool</span>
      </Link>

      <section className={`menu ${MenuClass}`}>
        {pathname !== '/auth' && !isAuthenticated && (
          <Link href='/auth'>
            <Button
              className='flex gap-x-2 bg-white text-gray-900 0 hover:bg-gray-200 font-bold rounded-lg'
              disabled={isSessionLoading}
            >
              <span className='sr-only'>Sign In</span>
              Sign In
              {isSessionLoading && (
                <LoaderIcon className='transition-all duration-1000 animate-spin' />
              )}
            </Button>
          </Link>
        )}

        {isAuthenticated && (
          <Button
            className='flex gap-x-2'
            variant={'outline'}
            onClick={signOut}
          >
            <span className='sr-only'>Log out</span>
            Log out
          </Button>
        )}

        <ChangeTheme />
      </section>

      <Button
        className={`sm:hidden rounded-full ml-2 hamburger-icon transition-transform duration-300 ${MenuClass}`}
        variant={'outline'}
        size={'sm'}
        onClick={onToggleMenu}
      >
        <HamburgerIcon />
      </Button>
    </nav>
  )
}
