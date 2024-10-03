import AdmZip from 'adm-zip'

const VALID_EXTENSIONS = ['html', 'css', 'js']

export interface TreeNode {
  name: string
  content?: string
  children?: TreeNode[]
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

  return sortNodes(nodes)
}
