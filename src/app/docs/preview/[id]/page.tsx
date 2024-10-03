import { prisma } from '@/server/db'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: {
      id: params.id
    }
  })

  if (!project) {
    return notFound()
  }

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
    </>
  )
}
