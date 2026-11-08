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
import { philippinesScreenshots as shots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('best-dormitory-bedspace-software-philippines')!
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
    question: 'What is the best dormitory or bedspace management software in the Philippines?',
    answer:
      'There is no single best for everyone, because the tools fall into two groups. For monthly bedspace, dormitory and boarding-house operators, the tools built for the job are PulseHub, Collo and Smapey, which track rooms, beds, tenants, rent and utilities by the bed. For nightly or OTA-style stays, hotel and hostel systems such as Cloudbeds, eZee Absolute, Mangobeds and BedBooking fit better. Pick by how you let: by the month and the bed, or by the night and the channel.',
  },
  {
    question: 'How much does bedspace management software cost in the Philippines?',
    answer:
      'It varies widely. Smapey offers a free boarding-house plan. PulseHub runs from about US$29 to US$79 a month by portfolio size. Collo starts at around ₱5,000 a month. Mangobeds starts at about US$29 a month. The hotel-style systems cost far more: Cloudbeds is quote-based and commonly runs into the hundreds of US dollars a month plus onboarding fees, and eZee Absolute is priced per room. Confirm current pricing with each vendor, as these change.',
  },
  {
    question: 'Does PulseHub collect rent through GCash or Maya?',
    answer:
      'No. PulseHub records payments and issues receipts; it is not a payment gateway and does not process GCash, Maya or card payments. You collect by your usual method and log what was paid, and the balances, arrears and receipts stay correct. Some local tools, such as Collo, do integrate GCash and Maya collection; if automated local payment collection is your priority, weigh that in.',
  },
  {
    question: 'What is the difference between dormitory software and hotel or hostel software?',
    answer:
      'Dormitory and bedspace software is built for monthly letting by the bed: one bill per tenant, deposits, utility splits and arrears over months. Hotel and hostel PMS, such as Cloudbeds and eZee, are built for nightly stays, a front desk and distribution to booking channels like Booking.com and Airbnb. If your tenants stay for months and pay monthly, a bed-level monthly system fits; the nightly tools add channel features you will pay for but not use.',
  },
  {
    question: 'Is PulseHub only for the Philippines?',
    answer:
      'No. PulseHub works across many markets, with local currency, terminology and date formats, so an operator with properties in the Philippines and elsewhere runs them on one system. The Philippine portal shows pesos for your tenant billing. That multi-market reach is one of its differences from the Philippine-only tools.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes. PulseHub offers a 14-day free trial with no card required, then a demo if you would like a walkthrough for your properties.',
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
        { '@type': 'ListItem', position: 3, name: 'Best dormitory and bedspace software in the Philippines', item: url },
      ],
    },
    { '@type': 'FAQPage', mainEntity: faqs.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
  ],
}

function H2({ id, children }: { id?: string; children: ReactNode }) {
  return <h2 id={id} className="mt-12 scroll-mt-28 font-display text-[clamp(1.55rem,3.4vw,2.35rem)] font-medium leading-tight tracking-tight">{children}</h2>
}
function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 font-display text-xl font-medium tracking-tight sm:text-[1.35rem]">{children}</h3>
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

export default function BestDormitoryBedspacePhPost() {
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
              If you run a dormitory, bedspace or boarding house in the Philippines, the software you need is built for
              letting by the bed and the month, not by the night.
            </strong>{' '}
            That one distinction splits the market in two, and it is the fastest way to avoid paying for a hotel system you
            will not use. This guide groups the real options honestly, with prices where they are public, and is clear
            about where PulseHub fits and where it does not.
          </P>
          <P>
            A quick note on honesty, because comparisons are usually written by whoever is selling. We make PulseHub, so
            treat our view as a view. But the facts below, who each tool is built for and what it costs, are drawn from
            each vendor&rsquo;s own pricing and product pages, and we have tried to be fair to every option, including the
            free one and the ones priced the same as us.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>The market splits in two: monthly bed-level tools versus nightly or OTA hotel systems.</li>
              <li>For monthly bedspace, the purpose-built options are PulseHub, Collo and Smapey.</li>
              <li>Smapey has a free plan; PulseHub and Mangobeds start around US$29 a month; Collo starts near &#8369;5,000.</li>
              <li>The hotel systems, Cloudbeds and eZee Absolute, cost far more and add channel features monthly operators rarely use.</li>
              <li>PulseHub records payments and is multi-market; it does not process GCash or Maya, which some local tools do.</li>
            </ul>
          </aside>

          <H2 id="two-groups">First, know which half of the market you are in</H2>
          <P>
            The single most useful thing to get right is the letting model, because it decides which tools are even
            relevant.
          </P>
          <UL>
            <li><strong>Monthly, by the bed.</strong> Tenants stay for months, each pays their own rent, you split utilities and track deposits and arrears. This is dormitory, bedspace and boarding-house operation, and it needs bed-level monthly software.</li>
            <li><strong>Nightly, by the channel.</strong> Guests book for a few nights, you run a front desk and distribute rooms to Booking.com, Agoda and Airbnb. This is hotel and backpacker-hostel operation, and it needs a hotel PMS with a channel manager.</li>
          </UL>
          <P>
            Plenty of operators are squarely in the first group but end up looking at the second, because the nightly tools
            market harder. If your tenants pay monthly, the channel features are cost you will not use. Everything below is
            grouped by this split.
          </P>

          <H2 id="monthly">Built for monthly bedspace and dormitories</H2>

          <H3>PulseHub</H3>
          <P>
            PulseHub is an accommodation management platform for operators who let by the room and the bed. It organises
            each property into rooms and beds, keeps occupancy true, and gives every tenant one record and one bill, with
            part-payments recorded as installments. Metered electricity is split between tenants by a reading and their
            join dates, deposits and arrears are tracked, and every property sits in one portfolio view, with a free public
            page per property to fill beds. Plans run from about US$29 a month for one property to US$79 for up to ten,
            with the Philippine portal showing pesos for your tenant billing.
          </P>
          <P>
            Its honest boundaries: PulseHub records payments and issues receipts, but it is not a payment gateway and does
            not process GCash, Maya or cards, and it is not a booking channel. Its clearest differences from the local
            tools are multi-market reach and the precision of the metered-utility split. See{' '}
            <A href={routes.philippines}>PulseHub for the Philippines</A> and our{' '}
            <A href="/blog/dormitory-bedspace-management-software">dormitory and bedspace operator guide</A>.
          </P>

          <H3>Collo</H3>
          <P>
            Collo is a Philippine property management platform aimed squarely at dormitories, bedspace rentals and boarding
            houses. By its own pages it tracks occupancy per bed, splits shared utilities, handles digital contracts, and,
            notably, collects rent through GCash and Maya, with a free tenant app. Pricing starts at around &#8369;5,000 a
            month depending on portfolio and features. If automated local payment collection is at the top of your list,
            Collo is the most direct fit of the group; it is Philippine-only, where PulseHub is multi-market and lower at
            entry.
          </P>

          <H3>Smapey</H3>
          <P>
            Smapey, based in Cagayan de Oro, offers a free boarding-house management plan for Philippine operators. It
            covers rooms and beds, tenant ledgers, rent and utility bills, transfers and QR-code maintenance reporting,
            counting occupancy by the bed. For a single property on a tight budget, free is hard to argue with. The trade
            is depth and reach: it is a lighter, Philippine-only tool from a small team, so weigh it against how much
            portfolio reporting, multi-property control and support you need as you grow.
          </P>

          <div className="mt-8">
            <ProductScreenshot src={shots.payments.src} alt={shots.payments.alt} width={shots.payments.width} height={shots.payments.height} label="PulseHub · rent, utilities & receipts in pesos" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            <div className="mt-8">
              <ProductScreenshot src={shots.residents.src} alt={shots.residents.alt} width={shots.residents.width} height={shots.residents.height} label="PulseHub · tenants, deposits & arrears" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
          </div>

          <H2 id="nightly">Built for nightly stays and OTA channels</H2>
          <P>
            These are capable systems, but they are built for hotels and backpacker hostels that sell by the night and
            distribute to booking sites. For a monthly bedspace operator they tend to cost more and carry features you will
            not use.
          </P>

          <H3>Cloudbeds</H3>
          <P>
            Cloudbeds is a well-known cloud hotel and hostel PMS with a built-in channel manager for Booking.com, Agoda,
            Airbnb and the rest. Pricing is quote-based and, by third-party estimates, commonly runs into the hundreds of
            US dollars a month, with onboarding fees on top. It is powerful for nightly distribution; for a monthly
            dormitory it is expensive and aimed at a different job.
          </P>

          <H3>eZee Absolute</H3>
          <P>
            eZee Absolute is a hotel PMS, often priced per room, with OTA distribution and front-desk tooling. Like
            Cloudbeds, it suits nightly operations and multi-channel selling. A monthly bedspace operator pays for a hotel
            feature set that does not match how they let.
          </P>

          <H3>Mangobeds and BedBooking</H3>
          <P>
            Mangobeds is a booking engine for hostels and co-livings, starting around US$29 a month with no booking
            commission; it leans toward reservations and direct bookings rather than monthly tenant ledgers. BedBooking is
            a low-cost mobile PMS for small, nightly short-stay properties that pushes rates to Airbnb and Booking.com. Both
            are reasonable for nightly letting; neither is built for monthly bed-level billing and utility splitting.
          </P>

          <Box title="Price at a glance (verify current rates with each vendor)">
            <P>
              Free: Smapey. From about US$29 a month: PulseHub and Mangobeds. From around &#8369;5,000 a month: Collo.
              Low-cost nightly: BedBooking. Far higher, quote-based: Cloudbeds (hundreds of US dollars a month plus
              onboarding) and eZee Absolute (per room). Prices are from each vendor&rsquo;s public pages and third-party
              listings and change often.
            </P>
          </Box>

          <H2 id="how-to-choose">How to choose</H2>
          <UL>
            <li><strong>Start with your letting model.</strong> Monthly and by the bed points to PulseHub, Collo or Smapey; nightly and by the channel points to the hotel systems.</li>
            <li><strong>Decide how much local payment automation you need.</strong> If GCash and Maya collection is essential, Collo integrates it; PulseHub records payments while you collect your own way.</li>
            <li><strong>Count your properties.</strong> One small property on a budget suits a free or entry plan; a growing portfolio rewards real multi-property reporting and scoped manager access.</li>
            <li><strong>Check the real cost.</strong> A quote-based hotel PMS can be many times the price of a bed-level tool once onboarding is in; match the spend to the job.</li>
            <li><strong>Look past one market.</strong> If you operate, or plan to, outside the Philippines too, a multi-market system saves running two tools.</li>
          </UL>

          <H2 id="pulsehub">Where PulseHub fits</H2>
          <P>
            PulseHub is the affordable, purpose-built option for monthly bedspace and dormitory operators who want
            bed-level billing, fair utility splits, deposits and arrears, and one view across every property, without the
            cost or complexity of a hotel PMS. It is a fraction of the price of the quote-based nightly systems, competitive
            with the local tools, and it works across markets. It will not collect GCash or Maya for you, and it is not a
            booking channel; what it does is run the monthly operation and keep the money straight. Start with{' '}
            <A href={routes.philippines}>PulseHub for the Philippines</A> or{' '}
            <A href={routes.hostel}>hostel management software</A>, or read the{' '}
            <A href="/blog/dormitory-bedspace-management-software">dormitory and bedspace operator guide</A> and{' '}
            <A href="/blog/what-is-a-property-management-system">what a property management system is</A>.
          </P>

          <Box title="In short">
            <P>
              There is no single best tool, only the best fit for how you let. For monthly bedspace and dormitories in the
              Philippines, compare PulseHub, Collo and Smapey; for nightly, OTA-driven stays, look at Cloudbeds, eZee,
              Mangobeds or BedBooking. PulseHub&rsquo;s case is affordable, multi-market, bed-level operations with honest
              payment recording, a long way below the cost of the hotel systems.
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
        heading="Run your dormitory or bedspace on one system."
        text="Bed-level billing, fair utility splits, deposits, arrears and every property in one view, from about US$29 a month. Start a 14-day free trial with no card required."
        secondaryHref={routes.philippines}
        secondaryLabel="PulseHub for the Philippines"
      />
    </SiteShell>
  )
}
