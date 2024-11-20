'use client'

import { useCopyClipboard } from '@/hooks/useCopyClipboard'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { toast } from 'sonner'

interface Props {
  language: string
  value: string
}

export default function CodeSnippet({ language, value }: Props) {
  const [, copy] = useCopyClipboard()

  const handleCopy = (value: string) => {
    copy(value)
      .then(() => {
        toast.success('Copied to clipboard', {
          duration: 2000
        })
      })
      .catch(() => {
        toast.error('Failed to copy to clipboard')
      })
  }

  return (
    <div className='relative'>
      <button
        className='absolute top-2 right-2 px-2 py-1 text-zinc-200 text-xs bg-gray-800 rounded'
        onClick={() => handleCopy(value)}
        data-html2canvas-ignore='true'
      >
        Copy
      </button>
      <SyntaxHighlighter
        customStyle={{ margin: 0 }}
        language={language}
        style={oneDark}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
}
