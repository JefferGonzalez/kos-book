import { useState } from "react";
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { TreeNode } from "@/lib/docs";

interface ItemProps {
    item: TreeNode; 
}

export function Item({ item }: ItemProps) {
    const [isOpened, setIsOpened] = useState<boolean>(false);


    const toggleSubMenu = () => {
        setIsOpened(prev => !prev);
        
    };

    return (
        <div className="menu-item">
            <button 
                onClick={toggleSubMenu} 
                className={`flex items-center justify-between w-full p-2 text-left hover:bg-gray-200 transition duration-300 ease-in-out ${isOpened ? 'font-bold' : ''}`}
            >
                <span className="flex items-center gap-2">
                    <ChevronRightIcon className={`w-4 h-4 transition-transform duration-300 ${isOpened ? 'rotate-90' : ''}`} />
                    {item.name}
                </span>
            </button>
            {Array.isArray(item.children) && item.children.length > 0 && isOpened && (
                <div className="sub-menu pl-4 border-l border-gray-300 mt-2">
                    {item.children.map((subitem, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <button 
                                className="flex-1 text-left p-2 hover:bg-gray-200 transition duration-300 ease-in-out"
                            >
                                {subitem.name}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
