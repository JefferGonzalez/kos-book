import Item from '@/components/dashboard/Item'
import { TreeNode } from '@/lib/nodes'

interface Props {
  nodes: TreeNode[]
  onSelectNode: (node: TreeNode | null) => void
}

export default function TreeView({ nodes, onSelectNode }: Props) {
  return (
    <ul className='space-y-1 px-2'>
      {nodes.map((node, index) => (
        <Item key={index} node={node} onSelectNode={onSelectNode} />
      ))}
    </ul>
  )
}
