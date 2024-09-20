import ChangeTheme from '@/components/common/ChangeTheme'
import { Button } from '@/components/ui/button'
import HamburgerIcon from '@/icons/Hamburger'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className='flex items-center justify-between backdrop-blur-sm sticky p-2 top-0 z-40'>
      <Link
        to='/'
        className='text-sm sm:text-base md:text-2xl font-bold flex items-center gap-1'
        title="KOS'BOOK | Documentation Tool"
      >
        <span className='sr-only'>KOS'BOOK | Documentation Tool</span>
        KOS'BOOK | Documentation Tool
      </Link>

      <section
        className={`sm:flex space-x-1 ${isMenuOpen ? 'flex' : 'hidden'}`}
      >
        {pathname !== '/auth' && (
          <Link to='/auth'>
            <Button className='rounded-xl' variant={'outline'} size={'sm'}>
              <span className='sr-only'>Sign In</span>
              Sign In
            </Button>
          </Link>
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
