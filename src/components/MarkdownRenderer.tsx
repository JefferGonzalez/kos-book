import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

interface Props {
  content: string
}

export const MarkdownRenderer = ({ content }: Props) => {
  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
      <ReactMarkdown
        className="text-white"
        rehypePlugins={[rehypeHighlight]}       
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}