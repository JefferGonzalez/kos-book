/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.plantuml.com',
        port: '',
        pathname: '/plantuml/**'
      }
    ]
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
}

export default nextConfig
