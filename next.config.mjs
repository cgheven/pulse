const APP_ORIGIN = 'https://app.yourpulse.io'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 100],
  },
  // 308 permanent redirects for legacy URLs Search Console still reports as 404.
  async redirects() {
    return [
      // Legal pages live on the app subdomain (the footer links there too).
      { source: '/privacy', destination: `${APP_ORIGIN}/privacy`, permanent: true },
      { source: '/privacy.html', destination: `${APP_ORIGIN}/privacy`, permanent: true },
      { source: '/terms', destination: `${APP_ORIGIN}/terms`, permanent: true },
      // Old static home + pricing URLs now consolidated on the current pages.
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/pro', destination: '/pricing', permanent: true },
      { source: '/pricing-bms', destination: '/pricing', permanent: true },
      { source: '/pricing-bms.html', destination: '/pricing', permanent: true },
      // Social images moved from dynamic routes to static .png files.
      { source: '/opengraph-image', destination: '/opengraph-image.png', permanent: true },
      { source: '/twitter-image', destination: '/twitter-image.png', permanent: true },
    ]
  },
}

export default nextConfig
