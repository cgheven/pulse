import type { MetadataRoute } from 'next'
import { routes } from '@/lib/navigation'
import { SITE_URL } from '@/lib/site'

const paths = [
  routes.home,
  routes.features,
  routes.pricing,
  routes.about,
  routes.contact,
  routes.hmo,
  routes.student,
  routes.coliving,
  routes.cookies,
]

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.7,
  }))
}
