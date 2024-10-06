import ReactMarkdown from 'react-markdown'
import CodeSnippet from '@/components/code/CodeSnippet'
import { ReactNode } from 'react'

const FONTCOLOR = 'text-zinc-800 dark:text-zinc-200'
const LEVELCLASS: Record<number, string> = {
  1: 'text-2xl',
  2: 'text-xl',
  3: 'text-lg',
  4: 'text-base',
  5: 'text-sm',
  6: 'text-xs'
}

const Heading = ({
  level,
  children
}: {
  level: number
  children: ReactNode
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  const fontSizeClass = LEVELCLASS[level] ?? 'text-base'

  return (
    <Tag className={`${FONTCOLOR} font-bold ${fontSizeClass}`}>{children}</Tag>
  )
}

interface Props {
  content: string
}

export const MarkdownRenderer = ({ content }: Props) => {
  return (
    <div className='m-2 prose prose-xl max-w-none'>
      <ReactMarkdown
        className={FONTCOLOR}
        components={{
          h1: ({ children }) => <Heading level={1}>{children}</Heading>,
          h2: ({ children }) => <Heading level={2}>{children}</Heading>,
          h3: ({ children }) => <Heading level={3}>{children}</Heading>,
          h4: ({ children }) => <Heading level={4}>{children}</Heading>,
          h5: ({ children }) => <Heading level={5}>{children}</Heading>,
          h6: ({ children }) => <Heading level={6}>{children}</Heading>,
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')

            return match ? (
              <CodeSnippet
                language={match[1]}
                value={String(children).replace(/\n$/, '')}
              />
            ) : (
              <code className={`${className} ${FONTCOLOR}`} {...props}>
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