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
import { useTheme } from '@/hooks/useTheme'
import { MonitorIcon, MoonStarIcon, SunIcon } from 'lucide-react'

export default function ChangeTheme() {
  const { darkMode, theme, setTheme } = useTheme()

  const Icon = darkMode ? MoonStarIcon : SunIcon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className='rounded-xl'
          variant={'outline'}
          size={'sm'}
          title={theme}
        >
          <span className='sr-only'>{theme}</span>
          <Icon />
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
