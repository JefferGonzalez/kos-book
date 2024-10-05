import NavBar from '@/components/common/NavBar'
import Toaster from '@/components/common/Toaster'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: "KOS'BOOK | The next Documentation Tool",
  description:
    "KOS'BOOK is a new documentation tool that will help you to create and manage your documentation.",
  manifest: '/manifest.json'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <link rel='icon' type='image/svg+xml' href='/images/kos-book.webp' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body className='bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 min-h-screen'>
        <div className='fixed left-0 top-0 -z-10 h-full w-full'>
          <div className='relative h-full w-full'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]'></div>
          </div>
        </div>

        <SessionProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <main className='container mx-auto px-8 max-w-[1100px]'>
              
              {children}
            </main>

            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
