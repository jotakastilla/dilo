import type { NextConfig } from 'next';

// The public marketing site is intentionally exportable: visitors can browse
// the home, gift builder and editorial landing pages without a server runtime.
// This also lets hosts such as Vercel serve the same generated site directly.
const nextConfig: NextConfig = {
  output: 'export',
  // Static hosts do not provide Next's /_next/image optimization endpoint.
  images: { unoptimized: true },
};

export default nextConfig;
