import PricingGrid from '@/components/pricing-grid'
import SiteShell from '@/components/site-shell'
import { CtaBand } from '@/components/cta-band'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/navigation'
import { SITE_URL } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Simple, Transparent Pricing',
  description: 'GBP pricing for PulseHub accommodation management software. Choose a plan that matches your property portfolio.',
  path: routes.pricing,
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'PulseHub Pricing',
      url: `${SITE_URL}${routes.pricing}`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Pricing', item: `${SITE_URL}${routes.pricing}` },
      ],
    },
  ],
}

export default function PricingPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <div className="px-4 pb-0 pt-24 text-center sm:px-6 sm:pt-28 lg:px-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">Pricing</p>
        <h1 className="font-display text-[clamp(2rem,5.4vw,3.5rem)] font-medium leading-[1.06] tracking-tight">
          Pricing that grows with your portfolio
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          14-day free trial, no card. Annual billing saves 2 months.
        </p>
      </div>
      <PricingGrid
        subtitle="Choose your country to see local pricing. Every plan includes the full PulseHub platform, for 1, 3 or 10 properties."
      />
      <CtaBand
        heading="Not sure which plan fits?"
        text="Start a free trial, or contact the team to talk through your number of properties, rooms and operators."
      />
    </SiteShell>
  )
}
