import NavLinks from '@/components/dashboard/NavLinks'

export default function LateralBar() {
  return (
    <div className='px-3 py-4 min-h-[calc(100vh-7rem)] h-full bg-white shadow-2xl border border-gray-300 dark:border-gray-700 rounded-md'>
      <NavLinks />
    </div>
  )
}
