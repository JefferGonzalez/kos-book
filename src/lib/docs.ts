import { buildTree, cloneNodesWithoutContent, sortNodes } from '@/lib/nodes'
import AdmZip from 'adm-zip'

const getRootFolder = (zipEntries: AdmZip.IZipEntry[]) => {
  if (zipEntries.length === 0) return ''

  const firstEntry = zipEntries[0].entryName.split('/')

  if (firstEntry.length > 1) {
    return firstEntry[0]
  }

  return ''
}

const getEntryContent = async (root: string, path: string, zip: AdmZip) => {
  const fullPath = root ? `${root}/${path}` : path
  const zipEntry = zip.getEntry(fullPath)

  if (!zipEntry) return ''

  return zipEntry.getData().toString('utf8')
}

export const buildTreeFromZip = async (buffer: Buffer) => {
  const zip = new AdmZip(buffer)
  const zipEntries = zip.getEntries()

  const rootFolder = getRootFolder(zipEntries)

  const paths = zipEntries
    .filter((zipEntry) => !zipEntry.isDirectory)
    .map(({ entryName }) =>
      rootFolder ? entryName.replace(`${rootFolder}/`, '') : entryName
    )

  const nodes = await buildTree(paths, (path) =>
    getEntryContent(rootFolder, path, zip)
  )

  const nodesWithoutContent = cloneNodesWithoutContent(nodes)

  return {
    nodes: sortNodes(nodes),
    nodesWithoutContent: sortNodes(nodesWithoutContent)
  }
}
