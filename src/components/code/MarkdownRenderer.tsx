import CodeSnippet from '@/components/code/CodeSnippet'
import UmlViewer from '@/components/code/UmlDiagramViewer'
import { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'

const FONTCOLOR = 'text-zinc-800 dark:text-zinc-200'
const LEVELCLASS: Record<number, string> = {
  1: 'text-3xl',
  2: 'text-xl',
  3: 'text-lg',
  4: 'text-lg font-normal',
  5: 'text-sm',
  6: 'text-xs',
  7: 'text-3x1'
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
    <div className='mx-2 p-2 prose prose-xl max-w-none'>
      <ReactMarkdown
        className={FONTCOLOR}
        components={{
          h1: ({ children }) => <Heading level={1}>{children}</Heading>,
          h2: ({ children }) => <Heading level={2}>{children}</Heading>,
          h3: ({ children }) => <Heading level={3}>{children}</Heading>,
          h4: ({ children }) => <Heading level={4}>{children}</Heading>,
          h5: ({ children }) => <Heading level={5}>{children}</Heading>,
          h6: ({ children }) => <Heading level={6}>{children}</Heading>,
          li: ({ children }) => <Heading level={4}>{children}</Heading>,
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')

            return match ? (
              match[1] === 'plantuml' ? (
                <UmlViewer value={String(children).replace(/\n$/, '')} />
              ) : (
                <>
                  <CodeSnippet
                    language={match[1]}
                    value={String(children).replace(/\n$/, '')}
                  />
                </>
              )
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
