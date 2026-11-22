import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { usScreenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('sro-management-software')!
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
    question: 'What is single room occupancy (SRO)?',
    answer:
      'Single room occupancy, or SRO, is housing where each resident rents a single private room, usually with shared kitchens and bathrooms, and pays by the room rather than for a whole unit. It overlaps with rooming houses, co-living and boarding houses. The operating model is the same: you let, bill and track occupancy room by room.',
  },
  {
    question: 'What should SRO management software do?',
    answer:
      'At a minimum it should let you rent by the room: track occupancy down to the room or bed, keep a record and agreement per resident, raise one bill per resident for rent and utilities, hold deposits, and report across every property. PulseHub does all of these. It is not a whole-unit property system retrofitted for rooms, and it is not an accounting suite.',
  },
  {
    question: 'How does PulseHub handle SRO utilities?',
    answer:
      'It meters electricity and splits it between residents by room and their move-in dates, and lets you add recurring charges such as water and gas, so each resident gets one bill covering their share rather than a flat division. That matters in SROs, where utilities are usually part of the room charge.',
  },
  {
    question: 'Does PulseHub collect SRO rent for me?',
    answer:
      'PulseHub records payments and issues numbered receipts; it is not a payment gateway, so rent moves through your own bank or payment app and you mark it received. What it automates is the tracking and the chasing: every resident&rsquo;s balance at a glance, and reminders before and after the due date.',
  },
  {
    question: 'Is SRO management software the same as student or enterprise housing software?',
    answer:
      'No. Enterprise student-housing and PBSA systems are built for large, campus-scale operations with leasing, marketing and accounting suites. SRO and rooming-house operators let individual rooms and need the opposite: a lightweight, room-level tool that bills each resident and tracks occupancy by the room. PulseHub is built for that model.',
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
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      isPartOf: { '@id': `${SITE_URL}${BLOG_BASE}#blog` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}${BLOG_BASE}` },
        { '@type': 'ListItem', position: 3, name: 'SRO management software', item: url },
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

function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mt-12 scroll-mt-28 font-display text-[clamp(1.55rem,3.4vw,2.35rem)] font-medium leading-tight tracking-tight">
      {children}
    </h2>
  )
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">{children}</p>
}

function UL({ children }: { children: ReactNode }) {
  return <ul className="mt-6 space-y-3 text-[1.0625rem] leading-[1.75] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">{children}</ul>
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
      {children}
    </Link>
  )
}

export default function SroManagementSoftwarePost() {
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
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.08] tracking-tight">
            {post.heading}
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">
            <time dateTime={post.datePublished}>{formatBlogDate(post.datePublished)}</time> · {post.readingMinutes} min read
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-5xl">
          <ProductScreenshot
            src={post.image.src}
            alt={post.image.alt}
            width={post.image.width}
            height={post.image.height}
            priority
            label={post.image.label}
            sizes="(max-width: 1024px) calc(100vw - 2rem), 64rem"
          />
        </div>

        <div className="mx-auto mt-10 max-w-[50rem]">
          <P>
            <strong>
              SRO management software is software for operators who rent single rooms, not whole units: each resident
              has a private room, shares a kitchen and bathrooms, and pays by the room. It needs to do the opposite of an
              enterprise lease system: track occupancy room by room, bill each resident, and split shared utilities
              fairly.
            </strong>{' '}
            This is what single room occupancy operators should look for, and how <A href={routes.us}>PulseHub</A>{' '}
            handles it.
          </P>

          <H2 id="what-is-sro">What single room occupancy means</H2>
          <P>
            Single room occupancy, or SRO, is one of the oldest forms of affordable housing in US cities: a resident
            rents a single room, with kitchens and bathrooms shared down the hall, and pays monthly with utilities
            usually included. In practice it sits alongside rooming houses, co-living and boarding houses. Whatever the
            label, the operating model is the same, and so is the software you need: you let and bill by the room.
          </P>

          <H2 id="what-it-does">What SRO management software should do</H2>
          <P>The essentials for running single room occupancy well:</P>
          <UL>
            <li><strong>Room and bed-level occupancy</strong> so you always know which rooms are filled, empty or on notice, and a room is never double-booked.</li>
            <li><strong>A record per resident</strong> with their agreement, documents, deposit and payment history.</li>
            <li><strong>One bill per resident</strong> for room rent plus their share of utilities, with part-payments and receipts.</li>
            <li><strong>Fair utility splitting</strong> between rooms, rather than a flat division that overcharges a late arrival.</li>
            <li><strong>Deposits tracked and settled</strong> against the final bill at move-out.</li>
            <li><strong>A portfolio view</strong> across every building, with occupancy, collections and dues side by side.</li>
          </UL>

          <H2 id="pulsehub">How PulseHub fits SRO operators</H2>
          <P>
            PulseHub models each building as rooms and beds, keeps occupancy accurate down to the room, and raises one
            bill per resident that gathers room rent and a metered share of electricity split between residents by room
            and move-in date, with water and gas as recurring charges. Deposits are tracked and settled at move-out, and
            every building sits in one portfolio view. Being clear about the edges: PulseHub records payments rather than
            processing them, so it is not a payment gateway, and it is not an accounting or compliance package. Local SRO
            and occupancy rules remain your responsibility, and this is not legal advice.
          </P>
          <div className="mt-8">
            <ProductScreenshot
              src={usScreenshots.dashboard.src}
              alt="A PulseHub dashboard in US dollars showing single room occupancy rooms, occupancy and rent collected across a building"
              width={usScreenshots.dashboard.width}
              height={usScreenshots.dashboard.height}
              label="Occupancy and rent by the room, in US dollars"
              sizes="(max-width: 820px) calc(100vw - 2rem), 50rem"
            />
          </div>

          <H2 id="not-enterprise">Why it is not enterprise student-housing software</H2>
          <P>
            It is worth being clear about what SRO software is not. Enterprise student-housing and PBSA systems are built
            for campus-scale operations with leasing, marketing and accounting suites, and they price and work
            accordingly. An SRO or rooming-house operator letting individual rooms needs the opposite: a lightweight,
            room-level tool that bills each resident and tracks occupancy by the room. That is the gap PulseHub is built
            for.
          </P>

          <H2 id="next">Where to go next</H2>
          <P>
            See <A href={routes.us}>rent-by-the-room software for the US</A>, the companion guide to{' '}
            <A href={postPath('how-to-manage-a-rooming-house')}>how to manage a rooming house</A>, or the wider{' '}
            <A href={routes.sharedHousing}>shared-housing platform</A> and{' '}
            <A href={routes.coliving}>co-living management</A>.
          </P>

          <section className="mt-16">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">Frequently asked questions</h2>
            <div className="mt-6">
              <FaqList items={faqs} />
            </div>
          </section>
        </div>
      </article>

      <CtaBand
        heading="Run your SRO buildings by the room"
        text="Room-level occupancy, one bill per resident for rent and split utilities, deposits and every building in one view. Start a 14-day free trial with no card required."
        secondaryHref={routes.us}
        secondaryLabel="Rent by the room software"
      />
    </SiteShell>
  )
}
