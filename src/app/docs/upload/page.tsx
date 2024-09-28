import UploadForm from '@/components/docs/UploadForm'
export default function Upload() {
  return (
    <section className='flex flex-col items-center space-x-6 mt-12'>
      <h1 className='text-white text-3xl font-bold mb-4'>Upload your code!</h1>

      <UploadForm />
    </section>
  )
}
