'use client'

import { MarkdownRenderer } from '@/components/code/MarkdownRenderer'
import { Button } from '@/components/ui/button'
import { TreeNode } from '@/lib/docs'
import {
  GenerateDocs,
  getContentNode,
  updateDocumentation
} from '@/server/actions/docs'
import { readStreamableValue } from 'ai/rsc'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import "@/styles/Button.css"

interface Props {
  id: string
  currentNode: TreeNode
}

export default function DocViewer({ id, currentNode }: Props) {
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    if (!currentNode.content) {
      setContent('')
      return
    }

    setContent(currentNode.content)
  }, [id, currentNode])

  const generateDocumentation = async () => {
    if (!currentNode.id) {
      toast.error('No node selected.')
      return
    }

    const response = await getContentNode(id, currentNode.id)

    if (response.error) {
      toast.error(response.error)
      return
    }

    if (!response.code) {
      toast.error('No code found in the project.')
      return
    }

    const { output } = await GenerateDocs(response.code)

    let content = ''
    for await (const delta of readStreamableValue(output)) {
      setContent((prev) => `${prev}${delta}`)
      content += delta
    }

    const ok = await updateDocumentation(id, currentNode.id, content)

    if (!ok) {
      toast.error('Something went wrong. Please try again.')
      return
    }
  }

  return (
    <>
      {content ? (
        <MarkdownRenderer content={content} />
      ) : (
        <div className='flex flex-col gap-y-2 items-center justify-center h-full text-gray-500'>
          <h3 className='text-2xl font-bold'>
            Documentation not available for {currentNode.name}
          </h3>

          <Button
            onClick={generateDocumentation}
            className='button button_upload hover:bg-black dark:text-white  mt-6 dark:bg-[#102cf31a] dark:hover:bg-[#5668f591]'
          >
            Click to generate documentation
          </Button>
        </div>
      )}
    </>
  )
}
