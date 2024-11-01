import Image from 'next/image'
import plantumlEncoder from 'plantuml-encoder'
import { toast } from 'sonner'

interface Props {
  value: string
}

export default function UmlDiagramViewer({ value }: Props) {
  const url = 'https://www.plantuml.com/plantuml/png/'
  const src = `${url}${plantumlEncoder.encode(value)}`

  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to download UML diagram')
      }

      const blob = await response.blob()

      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'diagram.png'
      a.click()
    } catch {
      toast.error('Failed to download UML diagram')
    }
  }

  return (
    <div className='relative'>
      <button
        className='absolute top-2 right-2 px-2 py-1 dark:text-zinc-800 text-zinc-200 text-xs bg-gray-800 rounded'
        onClick={() => handleDownload(src)}
      >
        Download
      </button>
      <Image
        alt='UML Diagram'
        src={src}
        width={500}
        height={500}
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  )
}
