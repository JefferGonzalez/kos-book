import { buildTree, cloneNodesWithoutContent, sortNodes } from '@/lib/nodes'
import AdmZip from 'adm-zip'

export const VALID_EXTENSIONS = ['html', 'css', 'js']

const getEntryContent = async (path: string, zip: AdmZip) => {
  const zipEntry = zip.getEntry(path)

  if (!zipEntry) return ''

  return zipEntry.getData().toString('utf8')
}

export const buildTreeFromZip = async (file: File) => {
  const buffer = await file.arrayBuffer()
  const zip = new AdmZip(Buffer.from(buffer))
  const zipEntries = zip.getEntries()

  const paths = zipEntries
    .map((entry) => entry.entryName)
    .filter((entry) => {
      const extension = entry.split('.').pop() ?? ''

      return VALID_EXTENSIONS.includes(extension)
    })

  const nodes = await buildTree(paths, (path) => getEntryContent(path, zip))

  const nodesWithoutContent = cloneNodesWithoutContent(nodes)

  return {
    nodes: sortNodes(nodes),
    nodesWithoutContent: sortNodes(nodesWithoutContent)
  }
}
