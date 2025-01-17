/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // This ensures our app works on Apache with a subdirectory
  basePath: '',
  trailingSlash: true,
}

module.exports = nextConfig
