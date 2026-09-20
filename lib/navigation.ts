export const routes = {
  home: '/',
  features: '/features',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
  bookDemo: '/book-demo',
  blog: '/blog',
  uk: '/uk',
  pakistan: '/pakistan',
  cookies: '/cookie-policy',
  hmo: '/uk-hmo-management-software',
  student: '/student-accommodation-management-software',
  coliving: '/co-living-management-software',
} as const

export const solutionLinks = [
  { href: routes.hmo, label: 'HMO Management', menuLabel: 'For HMO Operators' },
  { href: routes.student, label: 'Student Accommodation', menuLabel: 'For Student Accommodation Operators' },
  { href: routes.coliving, label: 'Co-Living Management', menuLabel: 'For Co-living Operators' },
] as const

export const primaryNav = [
  { href: routes.pricing, label: 'Pricing' },
  { href: routes.about, label: 'About' },
  { href: routes.contact, label: 'Contact' },
] as const
