import { CtaBand } from '@/components/cta-band'
import { CardGrid } from '@/components/card-grid'
import { FaqList } from '@/components/faq-list'
import { PageHero } from '@/components/page-hero'
import { SolutionPageView } from '@/components/solution-page-view'
import SiteShell from '@/components/site-shell'
import { jsonLdScript } from '@/lib/seo'
import { routes } from '@/lib/navigation'
import { SITE_NAME, SITE_URL } from '@/lib/site'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

export function SolutionPage({
  path,
  title,
  eyebrow,
  heading,
  text,
  supporting,
  heroVisual,
  problemHeading,
  problem,
  outcomes,
  faqs,
  ctaHeading,
  ctaText,
}: {
  path: string
  title: string
  eyebrow?: string
  heading: string
  text: string
  supporting?: string
  heroVisual?: ReactNode
  problemHeading: string
  problem: string
  outcomes: { icon?: LucideIcon; title: string; description: string }[]
  faqs: { question: string; answer: string }[]
  ctaHeading: string
  ctaText: string
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: title,
        url: `${SITE_URL}${path}`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: title, item: `${SITE_URL}${path}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  }

  return (
    <SiteShell>
      <SolutionPageView path={path} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <PageHero
        eyebrow={eyebrow}
        heading={heading}
        text={text}
        supporting={supporting}
        visual={heroVisual}
        split={Boolean(heroVisual)}
      />

      <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl border-l-2 border-primary pl-6 sm:pl-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">The problem</p>
          <h2 className="mt-3 font-display text-[clamp(1.6rem,3.2vw,2.5rem)] font-medium leading-[1.1] tracking-tight">
            {problemHeading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{problem}</p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">How PulseHub helps</p>
          <h2 className="mb-8 max-w-3xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight">
            One platform for the daily work of running your site
          </h2>
          <CardGrid items={outcomes} columns="two" size="comfortable" />
        </div>
      </section>

      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center font-mono text-sm text-muted-foreground">
          <p>
            Next:{' '}
            <a href={routes.features} className="text-primary hover:underline">
              explore the platform
            </a>
            {' · '}
            <a href={routes.pricing} className="text-primary hover:underline">
              view pricing
            </a>
            {' · '}
            <a href={routes.contact} className="text-primary hover:underline">
              contact the team
            </a>
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight">
            Frequently asked questions
          </h2>
          <FaqList items={faqs} />
        </div>
      </section>

      <CtaBand heading={ctaHeading} text={ctaText} />
    </SiteShell>
  )
}
