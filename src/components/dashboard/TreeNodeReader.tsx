'use client'

import TreeView from '@/components/dashboard/TreeView'
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

export default function TreeNodeReader({ nodes, id }: Props) {
  const [currentNode, setCurrentNode] = useState<TreeNode | null>(null)

  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='rounded-lg border border-blue-600 shadow-md p-2 dark:border-white'
    >
      <ResizablePanel defaultSize={20} className='h-full'>
        <TreeView nodes={nodes} onSelectNode={setCurrentNode} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        {currentNode ? (
          <DocViewer id={id} currentNode={currentNode} />
        ) : (
          <p className='mt-5 flex justify-center h-full text-black dark:text-gray-400'>
            Select a file to view its content
          </p>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
