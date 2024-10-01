'use client'

import ChangeTheme from '@/components/common/ChangeTheme'
import { Button } from '@/components/ui/button'
import HamburgerIcon from '@/icons/Hamburger'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import "@/styles/NavBar.css"

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className='flex items-center justify-between sticky p-4 px-11 top-0 z-40 backdrop-blur-lg bg-gray-800/80 text-white shadow-md'>
      <Link href='/' >
        <span className='navbar-title'>KOS&apos;BOOK | Documentation Tool</span>
      </Link>

      <section className={`menu ${isMenuOpen ? 'menu-open' : ''}  `}>
        {pathname !== '/auth' && (
          <Link href='/auth'>
            <Button className="bg-white text-gray-900 0 hover:bg-gray-200 font-bold rounded-lg ">
              Sign In
            </Button>
          </Link>
        )}
        <ChangeTheme />
      </section>

      <Button
        className={`sm:hidden rounded-full ml-2 hamburger-icon transition-transform duration-300 ${isMenuOpen ? 'menu-open' : ''}`}
        variant={'outline'}
        size={'sm'}
        onClick={onToggleMenu}
      >
        <HamburgerIcon />
      </Button>
    </nav>
  )
}
