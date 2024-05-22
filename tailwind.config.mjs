/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ziggurat: {
          50: '#f4f9fb',
          100: '#e8f2f6',
          200: '#bbdde5',
          300: '#9ed0db',
          400: '#6bb8c5',
          500: '#489faf',
          600: '#368193',
          700: '#2d6877',
          800: '#285864',
          900: '#264a54',
          950: '#193138'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
