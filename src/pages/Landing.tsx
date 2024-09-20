import Banner from '@/components/common/Banner'
import { Button } from '@/components/ui/button'
import GitHubIcon from '@/icons/GitHub'
import Layout from '@/layouts/Layout'
import { StarsIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <Layout>
      <Banner />

      <section className='flex justify-center space-x-6'>
        <Link to='/auth'>
          <Button
            className='flex gap-2 h-12 rounded-xl text-2xl px-4 py-1'
            variant={'outline'}
          >
            <StarsIcon className='size-8' />
            <span className='sr-only'>Start Free</span>
            Start Free
          </Button>
        </Link>

        <Button
          className='flex gap-2 h-12 rounded-xl text-2xl px-4 py-1'
          variant={'outline'}
        >
          <GitHubIcon className='size-8' />
          <span className='sr-only'>Star on GitHub</span>
          Star on GitHub
        </Button>
      </section>
    </Layout>
  )
}
