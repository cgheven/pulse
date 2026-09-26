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
    slug: 'hmo-rent-tracking',
    title: 'HMO Rent Tracking: Payments and Arrears',
    heading: 'How to Track HMO Rent, Payments and Arrears in the UK',
    description:
      'How to track HMO rent, payments and arrears across multiple properties and rooms: what to record, a simple system that scales, and how to keep balances accurate.',
    excerpt:
      'Why rent tracking gets hard across multiple HMOs, exactly what to record per room and tenant, a step-by-step system, and how to stay on top of arrears.',
    category: 'HMO management',
    primaryKeyword: 'HMO rent tracking',
    datePublished: '2026-09-25',
    dateModified: '2026-09-25',
    readingMinutes: 10,
    image: {
      src: '/screenshots/payments.png',
      width: 3024,
      height: 1570,
      alt: 'PulseHub payments screen showing HMO rent due, part-payments, deposits and overdue balances per room and tenant',
      label: 'Payments · rent, part-payments & arrears',
    },
  },
  {
    slug: 'student-accommodation-management',
    title: 'Student Accommodation Management: UK Guide',
    heading: 'Student Accommodation Management: A Complete Guide for UK Operators',
    description:
      'A practical guide to student accommodation management for UK operators: rooms, residents, rent, occupancy and the software that keeps it all in one place.',
    excerpt:
      'How UK student accommodation is run day to day, what operators need to track across rooms and residents, and how to manage it without spreadsheet sprawl.',
    category: 'Student accommodation',
    primaryKeyword: 'student accommodation management',
    datePublished: '2026-09-23',
    dateModified: '2026-09-23',
    readingMinutes: 10,
    image: {
      src: '/screenshots/residents.png',
      width: 3024,
      height: 1582,
      alt: 'PulseHub resident management screen showing student applications, deposits, notices and check-outs across the letting cycle',
      label: 'Residents · applications & check-outs',
    },
  },
  {
    slug: 'manage-multiple-hmo-properties-without-spreadsheets',
    title: 'Manage Multiple HMOs Without Spreadsheets',
    heading: 'How to Manage Multiple HMO Properties Without Spreadsheets',
    description:
      'Run several HMOs without spreadsheets: what to track per room and tenant, a weekly rhythm to stay on top, and how to move off Excel without losing data.',
    excerpt:
      'Why spreadsheets break once you run more than one HMO, what to track across a portfolio, a repeatable weekly system, and how to move off Excel without losing data.',
    category: 'HMO management',
    primaryKeyword: 'manage multiple HMO properties',
    datePublished: '2026-09-20',
    dateModified: '2026-09-20',
    readingMinutes: 8,
    image: {
      src: '/screenshots/all-properties.png',
      width: 3024,
      height: 1722,
      alt: 'PulseHub All Properties view comparing occupancy, revenue, costs and net profit across an HMO portfolio',
      label: 'All properties · portfolio',
    },
  },
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
