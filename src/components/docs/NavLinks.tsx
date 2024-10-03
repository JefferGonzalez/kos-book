import {
    ViewColumnsIcon,
    HomeIcon,
    DocumentDuplicateIcon,
  } from '@heroicons/react/24/outline';
  import Link from 'next/link';
  import { usePathname } from 'next/navigation';
  
  const links = [
    { name: 'Home', href: '/docs', icon: HomeIcon },
    { name: 'Upload', href: '/docs/upload', icon: DocumentDuplicateIcon },
    //El preview necesita datos
    { name: 'Preview', href: '/docs/preview/id', icon: ViewColumnsIcon,}, 
  ];
  
  export default function NavLinks() {
    const pathname = usePathname();
    return (
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center justify-start gap-3 rounded-md p-3 text-sm font-medium text-white-900 hover:bg-gray-100 hover:text-blue-600 transition duration-300 ease-in-out
                ${pathname === link.href ? '' : ''}
              `}
            >
              <LinkIcon className="w-6 h-6 text-gray-500" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </>
    );
  }
  