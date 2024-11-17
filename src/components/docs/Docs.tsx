'use client'

import { MarkdownRenderer } from '@/components/code/MarkdownRenderer'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { TreeNode } from '@/lib/nodes'
import { generatePDF } from '@/lib/pdf'
import { LoaderIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  title: string
  nodes: TreeNode[]
}

export default function Docs({ nodes, title }: Props) {
  const [loading, setLoading] = useState(false)

  const handleGeneratePDF = async () => {
    try {
      setLoading(true)
      await generatePDF(title)
    } catch (error) {
      console.error(error)
      toast.error(
        `Something went wrong. Please try again. If the problem persists, please contact support.`
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='relative'>
      <Button
        disabled={loading}
        className='flex gap-x-2 absolute top-2 right-2'
        onClick={handleGeneratePDF}
      >
        Generate PDF
        {loading && (
          <LoaderIcon className='transition-all duration-1000 animate-spin' />
        )}
      </Button>
      <div id={title}>
        {nodes.map((node, index) => {
          return (
            <article
              key={node.id}
              className='mx-2 p-2 prose prose-xl max-w-none'
            >
              <h3 className='text-2xl font-bold uppercase'>{node.name}</h3>
              <MarkdownRenderer
                content={node.content as string}
                loading={false}
              />

              {index < nodes.length - 1 && (
                <Separator className='border-t border-blue-600 dark:border-white' />
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
