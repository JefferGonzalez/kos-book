import { TreeNode } from '@/lib/docs'
import { ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'

interface ItemProps {
  item: TreeNode
  setCurrentNode: (node: TreeNode) => void
}

export function Item({ item, setCurrentNode }: ItemProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false)

  const toggleSubMenu = () => {
    if (Array.isArray(item.children) && item.children.length > 0) {
      setIsOpened(!isOpened)
    } else {
      setCurrentNode(item)
    }
  }

  return (
    <div className='menu-item'>
      <button
        onClick={toggleSubMenu}
        className={`flex items-center justify-between w-full p-2 text-left hover:bg-gray-200  hover:text-blue-600 transition duration-300 ease-in-out ${
          isOpened ? 'font-bold' : ''
        }`}
      >
        <span className='flex items-center gap-2'>
          {Array.isArray(item.children) && item.children.length > 0 && (
            <ChevronRightIcon
              size={16}
              className={`transform transition-transform ${
                isOpened ? 'rotate-90' : ''
              }`}
            />
          )}
          {item.name}
        </span>
      </button>

      {Array.isArray(item.children) && item.children.length > 0 && isOpened && (
        <div className='sub-menu pl-4 border-l border-gray-300 mt-2'>
          {item.children.map((subitem, index) => (
            <Item key={index} item={subitem} setCurrentNode={setCurrentNode} />
          ))}
        </div>
      )}
    </div>
  )
}
