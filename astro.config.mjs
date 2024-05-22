import { defineConfig } from 'astro/config'
import auth from 'auth-astro'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), auth(), react()],
  output: 'server',
  adapter: vercel()
})
