import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MonitorIcon, MoonStarIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ChangeTheme() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className='rounded-xl'
          variant={'outline'}
          size={'sm'}
          title='Change theme'
        >
          <span className='sr-only'>Change theme</span>
          <SunIcon className='rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <MoonStarIcon className='absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Select a theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className='flex gap-x-2'
            onClick={() => setTheme('light')}
          >
            <SunIcon />
            <DropdownMenuLabel>
              <span className='sr-only'>Light</span>
              Light
            </DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='flex gap-x-2'
            onClick={() => setTheme('dark')}
          >
            <MoonStarIcon />
            <DropdownMenuLabel>
              <span className='sr-only'>Dark</span>
              Dark
            </DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='flex gap-x-2'
            onClick={() => setTheme('system')}
          >
            <MonitorIcon />
            <DropdownMenuLabel>
              <span className='sr-only'>System</span>
              System
            </DropdownMenuLabel>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
