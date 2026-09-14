export const routes = {
  home: '/',
  features: '/features',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
  cookies: '/cookie-policy',
  hmo: '/uk-hmo-management-software',
  student: '/student-accommodation-management-software',
  coliving: '/co-living-management-software',
} as const

export const solutionLinks = [
  { href: routes.hmo, label: 'HMO Management', description: 'Software for HMO operators' },
  { href: routes.student, label: 'Student Accommodation', description: 'Software for student accommodation' },
  { href: routes.coliving, label: 'Co-Living Management', description: 'Software for co-living operators' },
] as const

export const primaryNav = [
  { href: routes.features, label: 'Features' },
  { href: routes.pricing, label: 'Pricing' },
  { href: routes.about, label: 'About' },
  { href: routes.contact, label: 'Contact' },
] as const
