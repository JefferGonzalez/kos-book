import ReactMarkdown from 'react-markdown'
import { CodeBlock } from './CodeBlock'

interface Props {
  content: string
}

export const MarkdownRenderer = ({ content }: Props) => {
  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
      <ReactMarkdown
        className="text-white"
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')

            return match ? (
              <CodeBlock
                language={match[1]}
                value={String(children).replace(/\n$/, '')}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
