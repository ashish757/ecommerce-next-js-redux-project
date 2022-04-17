/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['fakestoreapi.com'],
  },
  swcMinify: false // it should be false by default 
}

module.exports = nextConfig
