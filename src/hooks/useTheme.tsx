import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === null) {
    throw new Error('Context must be used within a context provider')
  }
  return context
}
