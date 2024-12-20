import TreeNodeReader from '@/components/dashboard/TreeNodeReader'
import { TreeNode } from '@/lib/nodes'
import { ViewProject } from '@/server/actions/docs'
import { notFound } from 'next/navigation'

// Allow streaming responses up to 60 seconds
// See:
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#maxduration
// https://vercel.com/docs/functions/runtimes#max-duration
export const maxDuration = 60

export default async function Page({ params }: { params: { id: string } }) {
  const response = await ViewProject(params.id)

  if (response.error) {
    return (
      <section className='bg-white shadow-2xl rounded-lg'>
        <div className='p-8 text-center'>
          <h1 className='text-2xl font-bold text-gray-800'>{response.error}</h1>
        </div>
      </section>
    )
  }

  if (!response.project) {
    return notFound()
  }

  const project = response.project

  let nodes: TreeNode[] = []

  if (typeof project.documentation === 'string') {
    nodes = JSON.parse(project.documentation) as TreeNode[]
  } else {
    nodes = JSON.parse(JSON.stringify(project.documentation)) as TreeNode[]
  }

  return (
    <div className='bg-blue-50 h-full shadow-2xl rounded-lg p-6 dark:bg-[#061c33]'>
      <header className='mb-4 space-y-2'>
        <h1 className='text-2xl font-extrabold sm:text-3xl md:text-4xl my-5'>
          {project.name}
        </h1>

        {project.description && (
          <p className='text-base sm:text-lg md:text-xl text-pretty mt-5'>
            {project.description}
          </p>
        )}
      </header>

      <TreeNodeReader nodes={nodes} id={params.id} />
    </div>
  )
}
