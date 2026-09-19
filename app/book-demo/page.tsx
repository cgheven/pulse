import { Check } from 'lucide-react'
import { BookDemoForm } from '@/components/book-demo-form'
import SiteShell from '@/components/site-shell'
import { routes } from '@/lib/navigation'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'

export const metadata = pageMetadata({
  title: 'Book a Demo',
  description:
    'Book a PulseHub demo. See how it handles rooms, residents, rent, payments and multiple properties for your accommodation. No card required.',
  path: routes.bookDemo,
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Book a PulseHub demo',
      url: `${SITE_URL}${routes.bookDemo}`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Book a demo', item: `${SITE_URL}${routes.bookDemo}` },
      ],
    },
  ],
}

const expectations = [
  'A walkthrough of rooms, residents, rent and payments',
  'How multi-property management and reporting work for your portfolio',
  'Answers on pricing and getting started',
  'No obligation, and no card required',
]

export default function BookDemoPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <section className="px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Book a demo</p>
            <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.06] tracking-tight">
              See PulseHub with your properties in mind
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Tell us a little about your setup and pick a time that suits you. We will show you how PulseHub
              handles rooms, residents, rent, payments and multiple properties for accommodation like yours.
            </p>
            <ul className="mt-8 space-y-3">
              {expectations.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-base text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <div className="rounded-2xl border border-border bg-muted/30 p-5 sm:p-7">
              <BookDemoForm />
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
