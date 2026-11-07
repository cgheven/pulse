import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { StartTrialButton } from '@/components/tracked-cta'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { screenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('split-utility-bills-shared-house')!
const url = `${SITE_URL}${postPath(post.slug)}`
const imageUrl = `${SITE_URL}${post.image.src}`

const base = pageMetadata({ title: post.title, description: post.description, path: postPath(post.slug) })

export const metadata: Metadata = {
  ...base,
  openGraph: {
    ...base.openGraph,
    type: 'article',
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
    images: [{ url: imageUrl, width: post.image.width, height: post.image.height, alt: post.image.alt }],
  },
  twitter: { ...base.twitter, images: [imageUrl] },
}

const faqs = [
  {
    question: 'How do you fairly split utility bills in a shared house?',
    answer:
      'The fairest way depends on the cost. Metered electricity is best split from an actual meter reading, divided between the residents who were living there over that period rather than flat per head. Fixed or near-fixed costs like water, gas or broadband are usually split evenly or charged as a set recurring amount. The key is that each resident sees their share on their own bill, with the reading or basis behind it.',
  },
  {
    question: 'Should utilities be split evenly or by usage?',
    answer:
      'Metered costs that vary, such as electricity where one room runs an AC unit, are fairest split by a meter reading and by the dates each resident was in the property, so someone who joined mid-month does not pay for weeks they were not there. Genuinely fixed costs like broadband are usually split evenly. Mixing the two, usage-based where you can measure it and even where you cannot, is normal and defensible.',
  },
  {
    question: 'Can software split the bills automatically?',
    answer:
      'Yes. PulseHub splits metered electricity automatically: you enter the reading, it applies the property tariff and divides the cost between residents by their join dates, and the share lands on each resident’s own bill. Water, gas and broadband can be set as recurring charges that appear on every bill. It records and bills these shares; it is not a utility supplier and does not pay the provider for you.',
  },
  {
    question: 'What if a resident joins or leaves mid-period?',
    answer:
      'That is exactly where flat per-head splitting is unfair. Splitting by the dates each resident was present means a mid-month joiner pays only for their days, and a leaver is not billed past their move-out. Software that tracks move-in and move-out dates against the meter period handles this without you recalculating by hand.',
  },
  {
    question: 'Does splitting utilities keep a record for disputes?',
    answer:
      'It should. Each split should trace back to a meter reading, a tariff and the dates used, so if a resident questions their share you can show the basis. PulseHub keeps the reading, allows a photo of the meter as evidence, and lets you re-price a period if a reading is corrected, with every charge sitting on the resident’s bill and receipt.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes. You can start a 14-day free trial with no card required, then book a demo if you would like a walkthrough for your properties.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: post.heading,
      description: post.description,
      image: [imageUrl],
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      author: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/`, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      isPartOf: { '@id': `${SITE_URL}${BLOG_BASE}#blog` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}${BLOG_BASE}` },
        { '@type': 'ListItem', position: 3, name: 'Split utility bills in a shared house', item: url },
      ],
    },
    { '@type': 'FAQPage', mainEntity: faqs.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
  ],
}

function H2({ id, children }: { id?: string; children: ReactNode }) {
  return <h2 id={id} className="mt-12 scroll-mt-28 font-display text-[clamp(1.55rem,3.4vw,2.35rem)] font-medium leading-tight tracking-tight">{children}</h2>
}
function P({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">{children}</p>
}
function UL({ children }: { children: ReactNode }) {
  return <ul className="mt-6 space-y-3 text-[1.0625rem] leading-[1.75] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">{children}</ul>
}
function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http')
  const className = 'font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary'
  if (external) return <a href={href} className={className} rel="noopener noreferrer" target="_blank">{children}</a>
  return <Link href={href} className={className}>{children}</Link>
}
function Box({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{title}</p>
      <div className="mt-4 space-y-3 text-[1.0625rem] leading-[1.75] text-foreground/85 sm:text-lg">{children}</div>
    </div>
  )
}

export default function SplitUtilityBillsPost() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <article className="px-4 pb-4 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-[50rem]">
          <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="px-1.5" aria-hidden="true">/</span>
            <Link href={BLOG_BASE} className="hover:text-primary">Blog</Link>
          </nav>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-primary">{post.category}</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.08] tracking-tight">{post.heading}</h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">
            <time dateTime={post.datePublished}>{formatBlogDate(post.datePublished)}</time> · {post.readingMinutes} min read
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-5xl">
          <ProductScreenshot src={post.image.src} alt={post.image.alt} width={post.image.width} height={post.image.height} priority label={post.image.label} sizes="(max-width: 1024px) calc(100vw - 2rem), 64rem" />
        </div>

        <div className="mx-auto mt-10 max-w-[50rem]">
          <P>
            <strong>
              Splitting utility bills in a shared house comes down to one principle: variable, metered costs should be
              split by a meter reading and by the dates each resident was there, and genuinely fixed costs can be split
              evenly.
            </strong>{' '}
            Get that right and the shares are fair, defensible and quick to produce. Get it wrong, with a flat per-head
            guess, and you either lose money or face an argument every month.
          </P>
          <P>
            In a house share, co-living space or HMO, the utilities are one of the few costs that genuinely vary with who
            is living there and how they use the place. This guide covers how to split each type of bill fairly, how to
            handle residents who join or leave mid-period, and how software turns the whole thing from a spreadsheet chore
            into a line on each resident&rsquo;s bill.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Split metered electricity by a reading and by each resident&rsquo;s dates, not flat per head.</li>
              <li>Split genuinely fixed costs like broadband evenly, as a set recurring charge.</li>
              <li>A mid-month joiner should pay only for their days; a leaver should not be billed past move-out.</li>
              <li>Every split should trace back to a reading, a tariff and the dates, in case a resident queries it.</li>
              <li>PulseHub splits metered electricity automatically and records the shares; it is not a utility supplier.</li>
            </ul>
          </aside>

          <H2 id="metered">Metered costs: split by reading and by dates</H2>
          <P>
            Electricity is the bill that varies most, especially where one room runs a heater or an AC unit. The fair way
            to split it is from an actual meter reading over the period, priced at the property&rsquo;s tariff, then
            divided between the residents who were living there, weighted by how long each was present. That is very
            different from dividing the total evenly by the number of beds, which overcharges the person who was away for
            two weeks and undercharges the one who ran the AC all month.
          </P>
          <P>
            The practical requirement is a reading at the start and end of the period, a tariff, and the move-in and
            move-out dates for each resident. With those, the split is arithmetic, and it holds up if anyone questions it.
          </P>

          <H2 id="fixed">Fixed costs: split evenly as a recurring charge</H2>
          <P>
            Broadband, and often water and a standing gas charge, do not vary with usage in a way you can measure per
            room. These are fairest split evenly and simplest handled as a set recurring charge that appears on every
            resident&rsquo;s bill each period. The resident sees a predictable line rather than a surprise, and you are not
            re-reading a meter for a cost that does not move.
          </P>

          <H2 id="mid-period">Residents who join or leave mid-period</H2>
          <P>
            This is where flat per-head splitting falls apart. If someone moves in on the 20th, charging them a full
            month of electricity is indefensible; if someone moves out on the 10th, billing them to month-end is worse.
            Splitting by the dates each resident was present solves both: the meter period is divided by presence, so each
            person pays for their own days. Doing this by hand is error-prone, which is the main reason operators move to
            software for it.
          </P>

          <div className="mt-8">
            <ProductScreenshot src={screenshots.payments.src} alt={screenshots.payments.alt} width={screenshots.payments.width} height={screenshots.payments.height} label="Bill · rent, electricity & recurring charges per resident" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            <div className="mt-8">
              <ProductScreenshot src={screenshots.receipt.src} alt={screenshots.receipt.alt} width={screenshots.receipt.width} height={screenshots.receipt.height} label="Receipt · rent & electricity breakdown, per resident" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
          </div>

          <H2 id="software">How software handles it</H2>
          <P>
            Good software turns the split into a step, not a spreadsheet. You enter the meter reading, it applies the
            tariff and divides the cost between residents by their dates, and each share lands on that resident&rsquo;s own
            bill alongside their rent. Fixed costs sit as recurring charges. The point is that every resident gets one
            clear bill, each line is explainable, and you are not rebuilding the maths every month.
          </P>

          <H2 id="pulsehub">How PulseHub does it</H2>
          <P>
            <A href={routes.sharedHousing}>PulseHub</A> splits metered electricity automatically: enter the reading and it
            applies the property tariff and divides the cost between residents by their join dates, so a mid-month arrival
            pays only for their days. You can attach a photo of the meter as evidence, and if a reading is wrong you can
            re-price the period in place. Water, gas and broadband can be set as recurring charges that appear on every
            bill. Each share sits on the resident&rsquo;s one bill, with a receipt that breaks rent and electricity out,
            so the basis is always visible.
          </P>
          <P>
            One honest boundary: PulseHub records and bills these shares, but it is not a utility supplier and does not pay
            your energy, water or broadband provider for you. You settle with the provider as usual; PulseHub handles the
            fair split and puts it on each resident&rsquo;s bill. It suits the shared-living models directly:{' '}
            <A href={routes.hmo}>HMO management software</A>,{' '}
            <A href={routes.coliving}>co-living management software</A>,{' '}
            <A href={routes.hostel}>hostel management software</A> and{' '}
            <A href={routes.sharedHousing}>property management software for shared housing</A>.
          </P>

          <Box title="In short">
            <P>
              Split metered electricity by a reading and by each resident&rsquo;s dates, split fixed costs evenly as a
              recurring charge, and make sure every share traces back to a reading, a tariff and the dates. Software that
              does this automatically, and puts each share on the resident&rsquo;s own bill, turns the monthly utility
              split from an argument into a line item.
            </P>
          </Box>

          <div className="mt-8">
            <StartTrialButton location="other" size="lg" className="min-h-12 whitespace-normal bg-primary px-6 text-base hover:bg-primary/90" />
          </div>
        </div>
      </article>

      <section className="px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-[50rem]">
          <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-8"><FaqList items={faqs} /></div>
        </div>
      </section>

      <CtaBand
        heading="Split utilities fairly, automatically."
        text="Metered electricity split by reading and by each resident's dates, fixed costs as recurring charges, every share on one clear bill. Start a 14-day free trial with no card required."
        secondaryHref={routes.sharedHousing}
        secondaryLabel="Property management software for shared housing"
      />
    </SiteShell>
  )
}
