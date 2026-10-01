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
      {/* Visually hidden H1 keeps one semantic page heading for SEO/accessibility
          without using any above-the-fold space. The pricing block below is the hero. */}
      <h1 className="sr-only">PulseHub pricing</h1>
      <h2 className="sr-only">Compare plans</h2>
      <PricingGrid topPadded />
      <CtaBand
        heading="Not sure which plan fits?"
        text="Start a free trial, or contact the team to talk through your number of properties, rooms and operators."
      />
    </SiteShell>
  )
}
