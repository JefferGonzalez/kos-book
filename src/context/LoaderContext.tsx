'use client'

import { PropsWithChildren, createContext, useState } from 'react'

interface Props extends PropsWithChildren {
  fallback: React.ReactNode
  replaceChildren?: boolean
}

interface LoaderContextProps {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
}

export const LoaderContext = createContext<LoaderContextProps>(
  {} as LoaderContextProps
)

export default function LoaderProvider({
  fallback,
  replaceChildren = false,
  children
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const startLoading = () => setIsLoading(true)

  const stopLoading = () => setIsLoading(false)

  return (
    <LoaderContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {isLoading && fallback}
      {!isLoading && (!replaceChildren || children)}
    </LoaderContext.Provider>
  )
}
