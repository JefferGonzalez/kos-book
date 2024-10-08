import { BlindsIcon, FolderUpIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    title: 'Dashboard',

    icon: BlindsIcon
  },
  {
    name: 'Upload',
    href: '/dashboard/upload',
    title: 'Upload',
    icon: FolderUpIcon
  }
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className=' flex flex-row md:flex-col gap-2 text-gray-500 dark:text-gray-400'>
      {links.map((link) => {
        const LinkIcon = link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            title={link.title}
            className={`flex items-center justify-start gap-3 rounded-md p-3 text-sm font-medium text-white-900 hover:bg-gray-400 dark: hover:text-blue-600 transition duration-300 ease-in-out dark:hover:bg-[#111827] dark:bg-[#111827] hover:text-white transition-all duration-300  ${
              pathname === link.href ? 'bg-gray-100' : ''
            }`}
          >
            <LinkIcon className='w-6 h-6 text-gray-500' />
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        )
      })}
    </nav>
  )
}
