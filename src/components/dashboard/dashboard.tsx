'use client'

import React, { useState } from 'react'
import { SearchBar } from '@/components/dashboard/search'
import { ProjectCard } from '@/components/dashboard/card'
import { Project } from '@prisma/client'
import { useRouter } from 'next/navigation'

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

  return (
    <div className='p-6 max-w-5xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Project Dashboard</h1>
      <SearchBar
        placeholder='Search projects...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {projects.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.name}
              description={project.description}
              onEdit={() => handleEditProject(project.id)}
              onVisit={handleVisitProject}
            />
          ))}
        </div>
      ) : (
        <div className='text-center mt-3 text-gray-500'>No projects found.</div>
      )}
    </div>
  )
}
