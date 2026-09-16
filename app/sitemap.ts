import type { MetadataRoute } from 'next'
import { blogPosts, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { SITE_URL } from '@/lib/site'

// Commercial-intent pages get a higher priority than supporting/legal pages.
const highPriority = new Set<string>([
  routes.pricing,
  routes.hmo,
  routes.student,
  routes.coliving,
])

const paths = [
  routes.home,
  routes.features,
  routes.pricing,
  routes.about,
  routes.contact,
  routes.blog,
  routes.hmo,
  routes.student,
  routes.coliving,
  routes.cookies,
]

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = paths.map((path) => ({
    // Match the canonical URLs in lib/seo.ts, where the homepage keeps its trailing slash.
    url: path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : highPriority.has(path) ? 0.8 : 0.6,
  }))

  const articles: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}${postPath(post.slug)}`,
    lastModified: new Date(post.dateModified),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...pages, ...articles]
}
