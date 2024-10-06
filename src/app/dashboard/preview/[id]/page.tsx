import TreeView from '@/components/dashboard/TreeView'
import { TreeNode } from '@/lib/docs'
import { ViewProject } from '@/server/actions/docs'
import { notFound } from 'next/navigation'

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
  }

  return (
    <div className='bg-white h-full shadow-2xl rounded-lg p-6'>
      <header className='mb-4 space-y-2'>
        <h1 className='text-2xl font-bold sm:text-3xl md:text-4xl'>
          {project.name}
        </h1>

        {project.description && (
          <p className='text-base sm:text-lg md:text-xl text-pretty'>
            {project.description}
          </p>
        )}
      </header>

      <TreeView nodes={nodes} id={params.id} />
    </div>
  )
}
