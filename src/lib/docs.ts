import AdmZip from 'adm-zip'
import { nanoid } from 'nanoid'

const VALID_EXTENSIONS = ['html', 'css', 'js']

export interface TreeNode {
  name: string
  id?: string
  content?: string
  children?: TreeNode[]
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

const cloneNodesWithoutContent = (nodes: TreeNode[]): TreeNode[] => {
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

const sortNodes = (nodes: TreeNode[]): TreeNode[] => {
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

export const readZip = async (file: File) => {
  const nodes: TreeNode[] = []

  const buffer = await file.arrayBuffer()
  const zip = new AdmZip(Buffer.from(buffer))
  const zipEntries = zip.getEntries()

  zipEntries.forEach((zipEntry) => {
    const fileName = zipEntry.entryName
    const extension = fileName.split('.').pop() ?? ''

    if (!VALID_EXTENSIONS.includes(extension)) return

    const pathParts = fileName.split('/')

    let currentNode: TreeNode[] = nodes

    pathParts.forEach((part, index) => {
      const existingNode = currentNode.find((node) => node.name === part)

      if (!existingNode) {
        const isFile = index === pathParts.length - 1

        const newNode: TreeNode = {
          name: part
        }

        if (isFile) {
          newNode.content = zipEntry.getData().toString('utf8')
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
    })
  })

  const nodesWithoutContent = cloneNodesWithoutContent(nodes)

  return {
    nodes: sortNodes(nodes),
    nodesWithoutContent: sortNodes(nodesWithoutContent)
  }
}
