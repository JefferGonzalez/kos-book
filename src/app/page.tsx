import Banner from '@/components/common/Banner'
import { Button } from '@/components/ui/button'
import GitHubIcon from '@/icons/GitHub'
import { StarsIcon } from 'lucide-react'
import Link from 'next/link'
import "@/styles/Button.css"

export default function Landing() {
  return (
    <>
      <Banner />

      <section className='flex justify-center space-x-6'>
        <Link href='/auth'>
          <Button
            className='button dark:text-white'
            variant={'outline'}
          >
            <StarsIcon className='size-8' />
            <span className='sr-only'>Start Free</span>
            Start Free
          </Button>
        </Link>

        <Button
          className='button dark:text-white'
          variant={'outline'}
        >
          <GitHubIcon className='size-8' />
          <span className='sr-only'>Star on GitHub</span>
          Star on GitHub
        </Button>
      </section>
    </>
  )
}
