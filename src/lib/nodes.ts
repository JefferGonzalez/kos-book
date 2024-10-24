import { nanoid } from 'nanoid'

export interface TreeNode {
  name: string
  id?: string
  content?: string
  children?: TreeNode[]
}

export const buildTree = async (
  paths: string[],
  getContent: (path: string) => Promise<string>
): Promise<TreeNode[]> => {
  const root: TreeNode[] = []

  for (const path of paths) {
    const segments = path.split('/')

    let currentNode = root

    for (let index = 0; index < segments.length; index++) {
      const segment = segments[index]

      const existingNode = currentNode.find((node) => node.name === segment)

      if (!existingNode) {
        const isFile = index === segments.length - 1

        const newNode: TreeNode = {
          name: segment
        }

        if (isFile) {
          newNode.content = await getContent(path)
          newNode.id = nanoid()
        } else {
          newNode.children = []
        }

        currentNode.push(newNode)

        if (!isFile) {
          currentNode = newNode.children as TreeNode[]
        }
      } else {
        currentNode = existingNode.children as TreeNode[]
      }
    }
  }

  return root
}

export const findNode = (
  nodes: TreeNode[],
  nodeId: string
): TreeNode | undefined => {
  for (const node of nodes) {
    if (node.id === nodeId) {
      return node
    }
    if (node.children) {
      const foundNode = findNode(node.children, nodeId)
      if (foundNode) return foundNode
    }
  }

  return undefined
}

export const updateNode = (
  nodes: TreeNode[],
  nodeId: string,
  content: string
): boolean => {
  for (const node of nodes) {
    if (node.id === nodeId) {
      node.content = content
      return true
    }

    if (node.children) {
      if (updateNode(node.children, nodeId, content)) return true
    }
  }

  return false
}

export const cloneNodesWithoutContent = (nodes: TreeNode[]): TreeNode[] => {
  return nodes.map((node) => {
    const newNode: TreeNode = {
      name: node.name,
      content: node.children ? undefined : '',
      id: node.id
    }

    if (node.children) {
      newNode.children = cloneNodesWithoutContent(node.children)
    }

    return newNode
  })
}

export const sortNodes = (nodes: TreeNode[]): TreeNode[] => {
  nodes.sort((a, b) => {
    if ((a.children && b.children) || (!a.children && !b.children)) {
      return a.name.localeCompare(b.name)
    }

    if (a.children && !b.children) return -1

    if (!a.children && b.children) return 1

    return 0
  })

  nodes.forEach((node) => {
    if (node.children) sortNodes(node.children)
  })

  return nodes
}
