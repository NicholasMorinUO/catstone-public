/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
        dns:false,
        tls:false,
        net:false,
        kerberos: false
      }
    }

    return config;
  },
  images: {
    domains: ['us04b.sheltermanager.com'],
  },
}