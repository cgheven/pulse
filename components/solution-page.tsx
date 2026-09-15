import { CtaBand } from '@/components/cta-band'
import { CardGrid } from '@/components/card-grid'
import { FaqList } from '@/components/faq-list'
import { PageHero } from '@/components/page-hero'
import { ProductVisual } from '@/components/product-visual'
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
  sections,
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
  sections: { icon?: LucideIcon; title: string; description: string }[]
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
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
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
      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-2xl font-bold sm:text-3xl">{problemHeading}</h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/70 sm:text-lg">{problem}</p>
        </div>
      </section>
      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">How PulseHub helps</h2>
          <CardGrid items={outcomes} columns="two" />
        </div>
      </section>
      <ProductVisual />
      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Manage Your Accommodation Operations</h2>
          <CardGrid items={sections} columns="two" />
        </div>
      </section>
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center text-sm text-foreground/70">
          <p>
            Next,{' '}
            <a href={routes.features} className="font-medium text-primary hover:underline">
              explore accommodation management features
            </a>
            ,{' '}
            <a href={routes.pricing} className="font-medium text-primary hover:underline">
              view pricing
            </a>
            , or{' '}
            <a href={routes.contact} className="font-medium text-primary hover:underline">
              contact the PulseHub team
            </a>
            .
          </p>
        </div>
      </section>
      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <h2 className="mb-6 text-center text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
        <FaqList items={faqs} />
      </section>
      <CtaBand heading={ctaHeading} text={ctaText} />
    </SiteShell>
  )
}
