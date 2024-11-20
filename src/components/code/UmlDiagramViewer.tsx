import CodeSnippet from '@/components/code/CodeSnippet'
import { LoaderIcon } from 'lucide-react'
import Image from 'next/image'
import plantumlEncoder from 'plantuml-encoder'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  value: string
  loading: boolean
}

export default function UmlDiagramViewer({ value, loading }: Props) {
  const [error, setError] = useState<boolean>(false)

  const isValidUml = value.startsWith('@startuml') && value.endsWith('@enduml')

  const encodedUml = plantumlEncoder.encode(value)
  const src = `https://www.plantuml.com/plantuml/img/${encodedUml}`

  const handleDownload = async () => {
    try {
      const response = await fetch(src)
      if (!response.ok) throw new Error('Failed to download UML diagram')

      const blob = await response.blob()
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'diagram.png'
      a.click()
    } catch {
      toast.error('Failed to download UML diagram')
    }
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center gap-x-2' role='status'>
        <span>Generating UML diagram...</span>
        <LoaderIcon className='transition-all duration-1000 animate-spin' />
      </div>
    )
  }

  if (!isValidUml) {
    return <CodeSnippet language='text' value={value} />
  }

  return (
    <>
      {!error ? (
        <div className='relative'>
          <button
            className='absolute top-2 right-2 px-2 py-1 dark:text-zinc-800 text-zinc-200 text-xs bg-gray-800 rounded'
            onClick={handleDownload}
            title='Download UML diagram'
            data-html2canvas-ignore='true'
          >
            Download
          </button>

          <Image
            alt='UML Diagram'
            src={src}
            width={500}
            height={500}
            style={{ width: '100%', height: 'auto' }}
            onError={() => setError(true)}
          />
        </div>
      ) : (
        <>
          <div className='text-center text-red-500'>
            Failed to render UML diagram. (Syntax error)
          </div>
          <CodeSnippet language='text' value={value} />
        </>
      )}
    </>
  )
}
