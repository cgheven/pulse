import { FileText, ImageIcon, Mail, PoundSterling } from 'lucide-react'
import { CONTACT_EMAIL, PRIVACY_URL, TERMS_URL } from '@/lib/site'
import { routes } from '@/lib/navigation'
import { SectionHeading } from '@/components/card-grid'

const items = [
  {
    icon: ImageIcon,
    title: 'See the product',
    description: 'Product screenshots on this site are from PulseHub, including the dashboard, payments, residents, properties and maintenance views.',
    href: routes.features,
    label: 'Explore features',
  },
  {
    icon: PoundSterling,
    title: 'Transparent pricing',
    description: 'GBP plans are listed with their property allowance, so you can compare before you start.',
    href: routes.pricing,
    label: 'View pricing',
  },
  {
    icon: Mail,
    title: 'Direct contact',
    description: `Email the team at ${CONTACT_EMAIL} for a demonstration, sales questions or support.`,
    href: `mailto:${CONTACT_EMAIL}`,
    label: CONTACT_EMAIL,
  },
  {
    icon: FileText,
    title: 'Privacy and terms',
    description: 'Account privacy and terms are published in the PulseHub app, alongside this site’s cookie notice.',
    href: PRIVACY_URL,
    label: 'Privacy policy',
  },
]

export default function Trust() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          heading="Designed for practical accommodation management"
          subtitle="A clear product, published pricing and a real contact address — without invented reviews or customer counts."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon
            const external = item.href.startsWith('http') || item.href.startsWith('mailto:')
            return (
              <div key={item.title} className="rounded-xl border border-border bg-card p-5 sm:p-6">
                <Icon className="mb-3 h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="mb-4 text-base leading-relaxed text-foreground/70">{item.description}</p>
                <a
                  href={item.href}
                  className="text-sm font-medium text-primary hover:underline"
                  {...(external && item.href.startsWith('https') ? { rel: 'noopener noreferrer' } : {})}
                >
                  {item.label}
                </a>
              </div>
            )
          })}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-foreground/55">
          App terms:{' '}
          <a href={TERMS_URL} className="font-medium text-primary hover:underline" rel="noopener noreferrer">
            Terms of Service
          </a>
          . Marketing-site cookies:{' '}
          <a href={routes.cookies} className="font-medium text-primary hover:underline">
            Cookie Policy
          </a>
          .
        </p>
      </div>
    </section>
  )
}
