import { Button } from '@/components/ui/button'
import Layout from '@/layouts/Layout'

export default function NotFound() {
  return (
    <Layout>
      <section className='flex flex-col items-center space-y-3 py-20'>
        <p>404 | This page could not be found.</p>
        <picture>
          <img
            src='/this-is-fine-404.gif'
            alt='This is fine.'
            title='This is fine.'
            loading='lazy'
          />
        </picture>

        <Button
          className='flex gap-2 rounded-xl text-2xl px-4 py-1'
          variant={'outline'}
          onClick={() => window.history.back()}
        >
          <span className='sr-only'>Go back</span>
          Go back
        </Button>
      </section>
    </Layout>
  )
}
