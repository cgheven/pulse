import { CtaBand } from '@/components/cta-band'
import { CardGrid } from '@/components/card-grid'
import { PageHero } from '@/components/page-hero'
import SiteShell from '@/components/site-shell'
import { BedDouble, Shield } from 'lucide-react'
import { productFeatures } from '@/components/features'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/navigation'
import { SITE_NAME, SITE_URL } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Accommodation Management Features',
  description:
    'Explore PulseHub features for property, room, resident, rent, occupancy, maintenance, utilities and multi-property management.',
  path: routes.features,
})

const groups = [
  {
    heading: 'Property and Room Management',
    items: productFeatures.filter((item) => item.title === 'Room & Occupancy Management'),
  },
  {
    heading: 'Resident Management',
    items: productFeatures.filter((item) => item.title === 'Resident Management'),
  },
  {
    heading: 'Rent and Payments',
    items: productFeatures.filter((item) =>
      ['Rent & Payment Management', 'Automated Rent Reminders'].includes(item.title),
    ),
  },
  {
    heading: 'Occupancy and Availability',
    items: [
      {
        icon: BedDouble,
        title: 'Occupancy visibility',
        description: 'See which rooms and beds are occupied or available, and keep resident allocations up to date.',
      },
    ],
  },
  {
    heading: 'Maintenance and Requests',
    items: productFeatures.filter((item) => item.title === 'Maintenance & Requests'),
  },
  {
    heading: 'Utilities and Shared Costs',
    items: productFeatures.filter((item) => item.title === 'Utility & Bill Allocation'),
  },
  {
    heading: 'Reports and Analytics',
    items: productFeatures.filter((item) => item.title === 'Reports & Financial Insights'),
  },
  {
    heading: 'Team Access and Permissions',
    items: [
      {
        icon: Shield,
        title: 'Team access',
        description: 'Give property managers the access they need, with role-based permissions for operational work.',
      },
    ],
  },
  {
    heading: 'Multi-Property Management',
    items: productFeatures.filter((item) => item.title === 'Multi-Property Management'),
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Accommodation Management Features',
  url: `${SITE_URL}${routes.features}`,
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
}

export default function FeaturesPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <PageHero
        heading="Everything You Need to Manage Accommodation"
        text="One connected platform for properties, rooms, residents, payments, occupancy, maintenance and reporting."
      />
      {groups.map((group) => (
        <section key={group.heading} className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-2xl font-bold sm:text-3xl">{group.heading}</h2>
            <CardGrid items={group.items} columns="two" />
          </div>
        </section>
      ))}
      <CtaBand
        heading="See how PulseHub fits your operations"
        text="Start a free trial or talk to the team about your properties, rooms and daily workflow."
      />
    </SiteShell>
  )
}
