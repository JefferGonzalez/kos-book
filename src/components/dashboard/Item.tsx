import { TreeNode } from '@/lib/nodes'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronRight, File, Folder } from 'lucide-react'
import { useState } from 'react'

interface Props {
  node: TreeNode
  onSelectNode: (node: TreeNode | null) => void
}

export default function Item({ node, onSelectNode }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const isFolder = Array.isArray(node.children) && node.children.length > 0

  const handleToggle = () => {
    if (isFolder) {
      setIsOpen((prev) => !prev)
      onSelectNode(null)
    } else {
      onSelectNode(node)
    }
  }

  const Icon = isFolder ? (isOpen ? ChevronDown : ChevronRight) : File
  const FolderIcon = isFolder && <Folder className='size-4 text-yellow-500' />

  return (
    <li className='menu-item'>
      <button
        aria-expanded={isOpen}
        type='button'
        className={cn(
          'flex items-center w-full px-2 py-1 text-left hover:bg-gray-400 rounded-lg hover:text-white transition duration-300 ease-in-out dark:bg-[#111827]',
          isOpen && 'font-bold bg-gray-300 dark:bg-gray-500',
          !isFolder && 'text-blue-600'
        )}
        onClick={handleToggle}
      >
        <Icon className='size-3' />
        {FolderIcon}
        <span className='ml-2'>{node.name}</span>
      </button>

      {isOpen && isFolder && node.children && (
        <SubItem nodes={node.children} onSelectNode={onSelectNode} />
      )}
    </li>
  )
}

interface SubMenuProps {
  nodes: TreeNode[]
  onSelectNode: (node: TreeNode | null) => void
}

function SubItem({ nodes, onSelectNode }: SubMenuProps) {
  return (
    <ul className='sub-menu pl-4 border-l border-gray-300 mt-2'>
      {nodes.map((node) => (
        <Item
          key={node.id || node.name}
          node={node}
          onSelectNode={onSelectNode}
        />
      ))}
    </ul>
  )
}
