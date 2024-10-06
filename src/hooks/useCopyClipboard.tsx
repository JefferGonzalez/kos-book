import { useState } from 'react'

type CopiedText = string | null
type CopyTextFunction = (text: string) => Promise<boolean>

export function useCopyClipboard(): [CopiedText, CopyTextFunction] {
  const [copiedText, setCopiedText] = useState<CopiedText>(null)

  const copy: CopyTextFunction = async (text) => {
    try {
      if (!window.navigator?.clipboard) {
        throw new Error('Clipboard API not available')
      }

      await window.navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch {
      setCopiedText(null)
      return false
    }
  }

  return [copiedText, copy]
}
