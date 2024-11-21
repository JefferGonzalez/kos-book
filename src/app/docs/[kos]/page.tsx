import Docs from '@/components/docs/Docs'
import {
  filterNodesWithContent,
  flattenWithHierarchy,
  TreeNode
} from '@/lib/nodes'
import { GetProjectByName } from '@/server/actions/docs'
import Link from 'next/link'

interface Props {
  params: {
    kos: string
  }
}

export default async function Page({ params }: Props) {
  const title = params.kos.replaceAll('-', ' ')
  const { project } = await GetProjectByName(title)

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
      {flatNodes.length > 0 ? (
        <Docs nodes={flatNodes} title={title} />
      ) : (
        <div className='min-h-[calc(100vh-5rem)] flex flex-col items-center gap-y-3'>
          <p className='text-2xl font-bold text-blue-600 dark:text-white'>
            No documentation found
          </p>

          <Link
            href={`/dashboard/preview/${project.id}`}
            className='text-sm text-gray-400 dark:text-gray-600 bg-gray-800 dark:bg-gray-200 px-4 py-3 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300'
          >
            Create documentation
          </Link>
        </div>
      )}
    </section>
  )
}
