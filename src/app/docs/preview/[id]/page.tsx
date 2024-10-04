import TreeView from '@/components/docs/TreeView'
import { TreeNode } from '@/lib/docs'
import { ViewProject } from '@/server/actions/docs'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const project = await ViewProject(params.id)

  if (!project) {
    return notFound()
  }
  
  let code: TreeNode[] = []

  if(typeof project.files_code === 'string'){
    code = JSON.parse(project.files_code) as TreeNode[]
  }
  console.log(code)
  

  return (
    <>
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
      <TreeView nodes={code}/>

    </>
  )
}
