'use client'

import { getRandomColor } from '@/lib/utils'
import React, { useEffect, useState } from 'react'

interface ProjectCardProps {
  title: string
  description: string
  onEdit: () => void
  onVisit: () => void
  backgroundColor?: string
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  onEdit,
  onVisit,
  backgroundColor
}) => {
  const [cardColor, setCardColor] = useState<string>(backgroundColor || '')

  useEffect(() => {
    if (!backgroundColor) {
      const randomColor = getRandomColor()
      setCardColor(randomColor)
    }
  }, [backgroundColor])

  return (
    <article
      className='card dark:shadow-2xl'
      style={{
        border: `2px solid ${cardColor}`,
        backgroundColor: `${cardColor}1A`
      }}
    >
      <h3 className='text-lg font-extrabold text-gray-800 mb-2 dark:text-white'>
        {title}
      </h3>
      <p className='text-gray-600 mb-4 dark:text-[#e4e4e7ad] break-all'>{description}</p>
      <div className='flex justify-between'>
        <button onClick={onVisit} className='visit-button'>
          Visit Project
        </button>
        <button onClick={onEdit} className='preview-button'>
          Preview
        </button>
      </div>
    </article>
  )
}
