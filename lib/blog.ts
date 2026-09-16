export const BLOG_BASE = '/blog'

export type BlogPost = {
  slug: string
  /** Card + browser-tab title (brand appended by the template). */
  title: string
  /** The on-page H1. */
  heading: string
  /** Meta description (about 150 to 160 chars). */
  description: string
  /** Short listing excerpt. */
  excerpt: string
  category: string
  primaryKeyword: string
  /** ISO dates. */
  datePublished: string
  dateModified: string
  readingMinutes: number
  image: {
    src: string
    width: number
    height: number
    alt: string
    /** Optional caption shown in the screenshot's browser-frame bar. */
    label?: string
  }
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'hmo-management-software',
    title: 'HMO Management Software for UK Landlords',
    heading: 'HMO Management Software: How to Manage Multiple Properties, Tenants and Rent',
    description:
      'A practical guide to HMO management software for UK landlords: how it handles rooms, tenants, rent, occupancy and multiple properties, and what to look for.',
    excerpt:
      'What HMO management software actually does, how it helps you run rooms, tenants, rent and occupancy across several properties, and how to choose the right system.',
    category: 'HMO management',
    primaryKeyword: 'HMO management software',
    datePublished: '2026-09-16',
    dateModified: '2026-09-17',
    readingMinutes: 9,
    image: {
      src: '/screenshots/all-properties.png',
      width: 3024,
      height: 1722,
      alt: 'PulseHub multi-property dashboard showing occupancy, revenue, costs and net profit across an HMO portfolio',
      label: 'All properties · portfolio',
    },
  },
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function postPath(slug: string) {
  return `${BLOG_BASE}/${slug}`
}

/** Newest first. */
export function sortedBlogPosts() {
  return [...blogPosts].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))
}

export function formatBlogDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
