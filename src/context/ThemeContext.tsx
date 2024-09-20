import { createContext, PropsWithChildren, useEffect, useState } from 'react'

const storageKey = 'ui-theme' as const
const defaultTheme = 'system' as const

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderState = {
  darkMode: boolean
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  darkMode: false,
  theme: 'system',
  setTheme: () => null
}

export const ThemeContext = createContext<ThemeProviderState>(initialState)

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const [darkMode, setDarkMode] = useState<boolean>(false)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches

      const systemTheme = prefersDark ? 'dark' : 'light'

      setDarkMode(systemTheme === 'dark')
      root.classList.add(systemTheme)
      return
    }

    setDarkMode(theme === 'dark')
    root.classList.add(theme)
  }, [theme])

  const value = {
    darkMode,
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    }
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
