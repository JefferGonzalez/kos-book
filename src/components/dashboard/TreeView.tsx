'use client'

import { Item } from '@/components/dashboard/Item'
import DocViewer from '@/components/docs/DocViewer'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { TreeNode } from '@/lib/nodes'
import { useState } from 'react'

interface Props {
  id: string
  nodes: TreeNode[]
}

export default function TreeView({ nodes, id }: Props) {
  const [currentNode, setCurrentNode] = useState<TreeNode | null>(null)

  return (
    <div>
      <ResizablePanelGroup direction='horizontal' className='rounded-lg border border-blue-600 shadow-md p-2 dark:border-white'>
        <ResizablePanel  defaultSize={20} className='h-full'>
          {nodes.map((item, index) => (
            <Item key={index} item={item} setCurrentNode={setCurrentNode}  />
          ))}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          {currentNode ? (
            <DocViewer id={id} currentNode={currentNode} />
          ) : (
            <div className=' p-11 flex items-center justify-center h-full text-black dark:text-gray-400'>
              Select a file to view its content
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
