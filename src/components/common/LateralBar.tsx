// import Link from 'next/link';
import NavLinks from '../docs/NavLinks';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-transparent bg-cover shadow-2xl border border-gray-300 dark:border-gray-700 rounded-md">
      
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        
        {/* Espacio vacío */}
        <div className="hidden h-auto w-full grow rounded-md bg-transparent md:block"></div>
        
        
      </div>
    </div>
  );
}
