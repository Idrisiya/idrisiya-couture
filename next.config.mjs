/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fail the Vercel build on type or lint errors rather than shipping them.
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },

  images: {
    // Vercel optimises on demand; allow your Cloudinary account for any
    // product photos you later paste in as full https URLs.
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'res-s.cloudinary.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Public pages should never be served from a stale proxy cache.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'index, follow' }],
      },
    ];
  },
};

export default nextConfig;
