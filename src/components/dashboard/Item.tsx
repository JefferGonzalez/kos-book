import { TreeNode } from '@/lib/docs'
import { ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'

interface ItemProps {
  item: TreeNode
}

export function Item({ item }: ItemProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false)

  const toggleSubMenu = () => {
    setIsOpened((prev) => !prev)
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
            <div key={index} className='flex items-center justify-between'>
              <button className='flex-1 text-left p-2 hover:bg-gray-200  hover:text-blue-600 transition duration-300 ease-in-out'>
                {subitem.name}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
