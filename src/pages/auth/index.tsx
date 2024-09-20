import Banner from '@/components/common/Banner'
import { Button } from '@/components/ui/button'
import GitHubIcon from '@/icons/GitHub'
import GoogleIcon from '@/icons/Google'
import Layout from '@/layouts/Layout'

export default function Auth() {
  return (
    <Layout>
      <Banner />

      <section className='flex justify-center space-x-6'>
        <Button
          className='flex gap-2 h-12 rounded-xl text-2xl px-4 py-1'
          variant={'outline'}
        >
          <GoogleIcon className='size-8' />
          <span className='sr-only'>Google</span>
          Google
        </Button>
        <Button
          className='flex gap-2 h-12 rounded-xl text-2xl px-4 py-1'
          variant={'outline'}
        >
          <GitHubIcon className='size-8' />
          <span className='sr-only'>GitHub</span>
          GitHub
        </Button>
      </section>
    </Layout>
  )
}
