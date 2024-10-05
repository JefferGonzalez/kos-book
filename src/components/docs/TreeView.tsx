'use client'

import { TreeNode } from "@/lib/docs"
import { Item } from "./Item"

interface Props { 
    nodes: TreeNode[]
}

export default function TreeView({ nodes }: Props) {
    return (
        <div>
            {nodes.map((item, index) => (
                <Item key={index} item={item} />
            ))}
        </div>
    )
}