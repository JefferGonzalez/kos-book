import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { toast } from 'sonner'

interface Props {
  language: string
  value: string
}

export const CodeBlock = ({ language, value }: Props) => {
  const copyToClipboard = (value: string) => {
    window.navigator.clipboard.writeText(value)

    toast.success('Copied to clipboard', {
      duration: 2000
    })
  }

  return (
    <div className="relative">
      <button
        className="absolute top-2 right-2 px-2 py-1 text-xs text-white bg-gray-800 rounded"
        onClick={() => copyToClipboard(value)}
      >
        Copy
      </button>
      <SyntaxHighlighter language={language} style={oneDark}>
        {value}
      </SyntaxHighlighter>
    </div>
  )
}
