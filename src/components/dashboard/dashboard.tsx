'use client'

import { ProjectCard } from '@/components/dashboard/card'
import { SearchBar } from '@/components/dashboard/search'
import { Project } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getRandomColor } from '@/lib/utils'

import '@/styles/dashboard.css'
interface Props {
  projects: Project[]
}

export default function Dashboard({ projects }: Props) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const handleVisitProject = () => {
    console.log('Visiting project...')
  }

  const handleEditProject = (projectId: string) => {
    router.push(`/dashboard/preview/${projectId}`)
  }

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section className='p-6 max-w-7xl mx-auto'>
      <h1 className='text-3xl font-extrabold mb-4'>Project Dashboard</h1>
      <SearchBar
        placeholder='Search projects...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredProjects.length > 0 ? (
        <div className='masonry-grid mt-6'>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.name}
              description={project.description}
              onEdit={() => handleEditProject(project.id)}
              onVisit={handleVisitProject}
              backgroundColor={getRandomColor()}
            />
          ))}
        </div>
      ) : (
        <div className='text-center mt-3 text-gray-500'>No projects found.</div>
      )}
    </section>
  )
}
