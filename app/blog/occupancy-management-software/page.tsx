import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { screenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('occupancy-management-software')!
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
    question: 'What is occupancy management software?',
    answer:
      'It is software that tracks which rooms and beds are let or empty, in real time, across one property or a portfolio. For accommodation let by the room or the bed, it maps the property as floors, rooms and beds, keeps occupancy true as people move in and out, flags voids, and reports the occupancy rate so you can see how full you are and where the gaps are.',
  },
  {
    question: 'How does PulseHub track occupancy down to the bed?',
    answer:
      'PulseHub models each property as floors, rooms and beds, so a six-bed dorm with three residents reads as half full rather than simply occupied. A bed can never be double-booked, allocations update as residents are admitted and checked out, and a waiting list holds demand for rooms that are not free yet.',
  },
  {
    question: 'Is occupancy management software the same as a booking engine?',
    answer:
      'No, and it is worth being clear about it. A booking engine or channel manager takes nightly reservations and distributes your rooms to travel sites such as Booking.com. Occupancy management is about running the beds you have: who is in which bed, which are empty, and how full you are over time. PulseHub does the occupancy and operations side and takes direct enquiries from your own listing page; it does not sync inventory to OTAs.',
  },
  {
    question: 'Can it reduce void periods?',
    answer:
      'It helps you see and act on voids rather than remove them. You can see every empty bed at a glance, hold interested applicants on a waiting list, publish live availability on a public listing page per property, and fill a gap sooner because you noticed it. The occupancy rate across the portfolio shows which properties are carrying the voids.',
  },
  {
    question: 'Does it work across more than one property?',
    answer:
      'Yes. Switch between properties on one login, move a resident or a bed between them, and see every property together with occupancy, revenue and costs side by side. A manager can be given access to just their own site.',
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
        { '@type': 'ListItem', position: 3, name: 'Occupancy management software', item: url },
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

export default function OccupancyManagementSoftwarePost() {
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
              Occupancy management software tracks which rooms and beds are let or empty, in real time, across every
              property you run. For accommodation let by the room or the bed, an empty bed is lost income that is easy to
              miss, and the job is to see it and fill it.
            </strong>{' '}
            This is what occupancy management does, why bed-level matters, and how <A href="/">PulseHub</A> handles it.
          </P>

          <H2 id="what-it-is">What occupancy management software does</H2>
          <P>
            At its simplest, it answers one question continuously: how full am I, and where are the gaps? It maps the
            property, tracks every move-in and move-out so the picture stays true, flags empty beds, and reports the
            occupancy rate over time. For a hostel, HMO, co-living site or student accommodation, that picture is the
            difference between noticing a void this week and finding it on next month&rsquo;s numbers.
          </P>

          <H2 id="bed-level">Why it has to work down to the bed</H2>
          <P>
            Most property tools assume one tenant takes one whole unit. Shared accommodation does not work like that. A
            six-bed dorm with three residents is half full, each bed is let on its own, and a room can hold people who
            arrived on different dates. If your software only counts whole rooms, your occupancy figure is wrong and your
            voids are hidden. PulseHub models each property as floors, rooms and beds, keeps occupancy true so a bed can
            never be double-booked, and counts a half-full room as half full.
          </P>

          <H2 id="voids">Seeing and filling voids sooner</H2>
          <P>A void costs you every night it sits empty. Occupancy management helps you act on it rather than discover it later:</P>
          <UL>
            <li><strong>Every empty bed at a glance,</strong> across one property or the whole portfolio, instead of counting rooms by hand.</li>
            <li><strong>A waiting list</strong> that holds interested applicants for rooms that are not free yet, so a move-out has a move-in ready.</li>
            <li><strong>A public listing page per property</strong> with live availability, prices and an application form, so demand reaches you directly.</li>
            <li><strong>Occupancy over time,</strong> so you can see which property is carrying the voids and why.</li>
          </UL>
          <P>
            One thing to be clear about: this is not a booking engine or channel manager. PulseHub runs the beds you have
            and takes direct enquiries from your own page; it does not take nightly reservations through, or sync
            inventory to, travel sites such as Booking.com. If you run a traveller hostel you can keep an OTA alongside it,
            and read our <A href={routes.hostel}>hostel management software</A> page for how the two fit together.
          </P>

          <H2 id="portfolio">Occupancy across a whole portfolio</H2>
          <P>
            Run one property or a group. Switch between them on a single login, move a resident or a bed from one to
            another, and see them together: occupancy, revenue, outstanding dues and costs, side by side. It works the
            same way whether you run <A href={routes.hmo}>HMOs</A>, <A href={routes.hostel}>hostels</A>,{' '}
            <A href={routes.coliving}>co-living</A> or <A href={routes.student}>student accommodation</A>, because all of
            them are modelled as floors, rooms and beds.
          </P>

          <H2 id="related">Where to go next</H2>
          <P>
            Occupancy is one part of running shared accommodation. See the wider{' '}
            <A href={routes.sharedHousing}>shared-housing platform</A>, read{' '}
            <A href="/blog/what-is-a-property-management-system">what a property management system is</A>, or start with
            the property type you run: <A href={routes.hmo}>HMO</A>, <A href={routes.hostel}>hostel</A>,{' '}
            <A href={routes.student}>student accommodation</A> or <A href={routes.coliving}>co-living</A>.
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
        heading="See every bed, full or empty, in one view"
        text="Track occupancy down to the bed across every property, hold demand on a waiting list, and fill voids sooner. Start a 14-day free trial with no card required."
        secondaryHref={routes.sharedHousing}
        secondaryLabel="Shared-housing platform"
      />
    </SiteShell>
  )
}
