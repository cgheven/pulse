import Link from 'next/link'
import { Sparkles } from 'lucide-react'
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

      <div className="bg-muted/30 px-4 pb-2 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <Link
          href={routes.lifetime}
          className="group mx-auto flex max-w-6xl flex-col items-center justify-center gap-x-3 gap-y-1 rounded-2xl border-2 border-primary bg-primary/5 px-5 py-4 text-center transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex-row"
        >
          <span className="inline-flex items-center gap-2 text-base font-semibold text-primary">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Prefer to pay once?
          </span>
          <span className="text-base text-foreground/85">
            Get the founder lifetime deal, with a limited number of spots.
          </span>
          <span className="font-semibold text-primary group-hover:underline">See the lifetime deal →</span>
        </Link>
      </div>

      <PricingGrid />
      <CtaBand
        heading="Not sure which plan fits?"
        text="Start a free trial, or contact the team to talk through your number of properties, rooms and operators."
      />
    </SiteShell>
  )
}
