// import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import NavLinks from '../docs/NavLinks';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-transparent bg-cover shadow-2xl border border-gray-300 dark:border-gray-700 rounded-md">
      
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        
        {/* Espacio vacío */}
        <div className="hidden h-auto w-full grow rounded-md bg-transparent md:block"></div>
        
        {/* Botón de cerrar sesión */}
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-transparent text-white p-3 text-sm font-medium hover:bg-sky-700 hover:text-blue-300 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6 text-white" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
