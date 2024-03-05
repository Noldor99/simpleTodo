/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'localhost' },
      { hostname: 'simpletodo-9jyz.onrender.com' },
      { hostname: 'loremflickr.com' },
    ],
  },
}

export default nextConfig
