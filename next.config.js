/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  images: {
    domains: ['upload.wikimedia.org', 'external-content.duckduckgo.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/api/auth/login',
        permanent: true,
      },
    ]
  },
}
