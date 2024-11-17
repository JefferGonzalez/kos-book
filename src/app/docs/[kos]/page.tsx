import Docs from '@/components/docs/Docs'
import {
  filterNodesWithContent,
  flattenWithHierarchy,
  TreeNode
} from '@/lib/nodes'
import { GetProjectByName } from '@/server/actions/docs'

interface Props {
  params: {
    kos: string
  }
}

export default async function Page({ params }: Props) {
  const { project } = await GetProjectByName(params.kos)

  let nodes: TreeNode[] = []

  if (typeof project.documentation === 'string') {
    nodes = JSON.parse(project.documentation) as TreeNode[]
  } else {
    nodes = JSON.parse(JSON.stringify(project.documentation)) as TreeNode[]
  }

  const docs = filterNodesWithContent(nodes)

  const flatNodes = flattenWithHierarchy(docs)

  return (
    <section className='my-4 rounded-lg border border-blue-600 shadow-md p-2 dark:border-white'>
      <Docs nodes={flatNodes} title={params.kos} />
    </section>
  )
}
