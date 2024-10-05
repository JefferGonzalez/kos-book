'use client';

import React, { useState } from 'react';
import { SearchBar } from '@/components/dashboard/search';
import { ProjectCard } from '@/components/dashboard/card';

export default function Dashboard() { 
  const [searchTerm, setSearchTerm] = useState('');

  const handleVisitProject = () => {
    console.log('Visiting project...');
  };

  const handleEditProject = () => {
    console.log('Editing project...');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Project Dashboard</h1>
      <SearchBar
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <ProjectCard
          title="Weather App"
          description="lorem"
          onEdit={handleEditProject}
          onVisit={handleVisitProject}
        />
          <ProjectCard
          title="Weather App"
          description="Real-time weather..."
          onEdit={handleEditProject}
          onVisit={handleVisitProject}
        />
          <ProjectCard
          title="Weather App"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore"
          onEdit={handleEditProject}
          onVisit={handleVisitProject}
        />
          <ProjectCard
          title="Weather App"
          description="Real-time weather..."
          onEdit={handleEditProject}
          onVisit={handleVisitProject}
        />
          <ProjectCard
          title="Weather App"
          description="Real-time weather..."
          onEdit={handleEditProject}
          onVisit={handleVisitProject}
        />
          <ProjectCard
          title="Weather App"
          description="Real-time weather..."
          onEdit={handleEditProject}
          onVisit={handleVisitProject}
        />
          <ProjectCard
          title="Weather App"
          description="Real-time weather..."
          onEdit={handleEditProject}
          onVisit={handleVisitProject}
        />  <ProjectCard
        title="Weather App"
        description="Real-time weather..."
        onEdit={handleEditProject}
        onVisit={handleVisitProject}
      />

      </div>
    </div>
  );
}
