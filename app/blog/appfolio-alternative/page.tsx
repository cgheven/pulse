import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { usScreenshots } from '@/lib/screenshots'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('appfolio-alternative')!
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
    question: 'Is PulseHub a good AppFolio alternative?',
    answer:
      'If you rent by the room or the bed, yes. AppFolio is built around whole-unit leases, where one tenant takes one unit on one lease. PulseHub is built for the opposite: several residents under one roof, each renting a room or a bed, each with their own agreement and bill. The more your operation is room-by-room, the better PulseHub fits.',
  },
  {
    question: 'How is PulseHub different from AppFolio?',
    answer:
      'The core difference is the unit of management. AppFolio manages units and leases; PulseHub manages rooms and beds, with one bill per resident for rent and a metered share of utilities, bed-level occupancy, and deposits settled at move-out. PulseHub is focused on room-level operations rather than being a full accounting and whole-portfolio suite.',
  },
  {
    question: 'Does PulseHub do accounting like AppFolio?',
    answer:
      'No, and it is worth being clear about it. PulseHub records payments, deposits, discounts and arrears and reports on them, but it is not a full accounting package. If general ledger accounting is central to you, pair PulseHub with your bookkeeping tool or accountant rather than replacing it.',
  },
  {
    question: 'What does PulseHub cost?',
    answer:
      'PulseHub uses per-property plans, billed in US dollars, with a 14-day free trial and no card required. Every plan includes the room-level platform. Compare it against your own property and room counts.',
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
        { '@type': 'ListItem', position: 3, name: 'AppFolio alternative', item: url },
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

export default function AppfolioAlternativePost() {
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
              AppFolio is a capable US property management platform, and it is built around a clear model: whole-unit
              leases. One tenant, one unit, one lease, one rent. If you rent by the room or the bed, that model fights you
              every month. PulseHub is the alternative built for the other way of operating, where several residents
              share a property and each rents a room.
            </strong>{' '}
            This is an honest look at where each fits. We make PulseHub, so treat this as our considered case, and check
            both against how you actually operate.
          </P>

          <H2 id="what-appfolio">What AppFolio is built for</H2>
          <P>
            AppFolio manages units and leases: residential and commercial portfolios where the unit is the thing you rent
            and the lease is the thing you track. It is broad, with accounting, maintenance and leasing in one place. That
            breadth is a strength for whole-unit landlords. It also means the model assumes one tenant per unit, which is
            the assumption that breaks for room-by-room operators.
          </P>

          <H2 id="what-pulsehub">What PulseHub is built for</H2>
          <P>
            <A href={routes.us}>PulseHub</A> manages rooms and beds. It models each property as rooms and beds so a
            six-bed house with three residents reads as half full, lets you bill each resident separately, and keeps
            occupancy true so a bed is never double-booked. It is built for co-living, rooming houses, SROs, off-campus
            student housing and shared houses, where the unit of management is the room, not the whole property.
          </P>
          <div className="mt-8">
            <ProductScreenshot
              src={usScreenshots.payments.src}
              alt="A PulseHub payments screen in US dollars showing one bill per resident for rent and utilities in a room-by-room rental"
              width={usScreenshots.payments.width}
              height={usScreenshots.payments.height}
              label="One bill per resident, in US dollars"
              sizes="(max-width: 820px) calc(100vw - 2rem), 50rem"
            />
          </div>

          <H2 id="why-switch">Why operators renting by the room choose PulseHub</H2>
          <UL>
            <li><strong>One bill per resident,</strong> for room rent plus a metered share of electricity split between residents by room and move-in date, with water and gas as recurring charges.</li>
            <li><strong>Bed-level occupancy,</strong> so a part-full room reads as part-full and a vacancy is visible the day it happens.</li>
            <li><strong>Deposits per resident,</strong> tracked and settled against the final bill at move-out, with the refund due visible.</li>
            <li><strong>A public listing page per property</strong> to advertise rooms and take inquiries directly, not just through listing sites.</li>
          </UL>

          <H2 id="honest">Where PulseHub is not the answer</H2>
          <P>
            Being straight about the edges: PulseHub is focused on room-level operations, not full accounting. It records
            payments, deposits, discounts and arrears and reports on them, but it is not a general-ledger accounting
            suite, and it records payments rather than processing them, so it is not a payment gateway. If deep
            accounting across a whole-unit portfolio is your priority, keep that with your accountant or a dedicated tool,
            and use PulseHub for the room-by-room operations it is built for.
          </P>

          <H2 id="next">See it on your own rentals</H2>
          <P>
            If you rent by the room, see <A href={routes.us}>PulseHub for US operators</A>, the guides to{' '}
            <A href="/blog/how-to-manage-a-rooming-house">managing a rooming house</A> and{' '}
            <A href="/blog/sro-management-software">SRO management software</A>, or{' '}
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
        heading="Built for renting by the room"
        text="If AppFolio feels like it fights your room-by-room operation, see PulseHub on your own rentals. Start a 14-day free trial with no card required."
        secondaryHref={routes.us}
        secondaryLabel="PulseHub for the US"
      />
    </SiteShell>
  )
}
