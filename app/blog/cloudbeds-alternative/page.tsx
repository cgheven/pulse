import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('cloudbeds-alternative')!
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
    question: 'Is PulseHub a Cloudbeds replacement?',
    answer:
      'Only if your beds are long-stay. Cloudbeds is a nightly PMS with a channel manager and booking engine that syncs rates and availability across Booking.com, Hostelworld and other OTAs. If your business is nightly stays sold through travel sites, Cloudbeds does that job and PulseHub does not. PulseHub replaces it only for operators who let beds by the week or month, where OTA distribution barely matters and the real work is bills, occupancy and residents.',
  },
  {
    question: 'Does PulseHub connect to Booking.com or Hostelworld?',
    answer:
      'No. PulseHub is not a channel manager and does not sync availability or rates to online travel agents like Booking.com or Hostelworld, and it is not a booking engine. It gives each property a free public listing page at yourname.hostels.yourpulse.io with live availability, photos, prices and an application form, which you market yourself. If distributing nightly beds across OTAs is central to you, keep a PMS like Cloudbeds for that part.',
  },
  {
    question: 'Can PulseHub bill weekly or monthly residents?',
    answer:
      'Yes. PulseHub bills by the night or by the month, and long-stay is where it is strongest. Each resident gets one automatic monthly bill for room rent plus a metered share of electricity, split between roommates by join dates, with recurring water and gas and meals if the package includes food. It supports partial payments, carries dues forward, applies discounts and issues numbered receipts. That is the shape long-stay operations need and a nightly OTA PMS is not built for.',
  },
  {
    question: 'Can I run both nightly and long-stay beds?',
    answer:
      'You can, but with two tools doing two jobs. PulseHub is not a channel manager and will not distribute nightly beds to OTAs, so if you also sell nightly, pair it with a channel manager or a nightly PMS such as Cloudbeds for that side and run your long-stay operation (bed-level occupancy, one bill per resident, metered utilities, deposits) in PulseHub. Lead with whichever is the bigger part of your income and let each tool cover the stay length it was built for.',
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
        { '@type': 'ListItem', position: 3, name: 'Cloudbeds alternative', item: url },
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

export default function CloudbedsAlternativePost() {
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
              If your beds are let by the week or month, a nightly OTA property management system is the wrong shape for
              your business, however good it is at its own job.
            </strong>{' '}
            Cloudbeds is built to sell and distribute nightly stays. Long-stay housing for workers, students and
            residents has a different centre of gravity, and forcing it through a booking-and-distribution tool fights you
            every month. Here is where the line sits, and honestly where each tool belongs.
          </P>

          <H2 id="cloudbeds">What Cloudbeds is built for</H2>
          <P>
            Cloudbeds is a cloud hotel and hostel PMS built for nightly stays. At its core are a channel manager and a
            booking engine that sync availability and rates across Booking.com, Hostelworld and other online travel
            agents, so a backpacker property can sell the same beds everywhere without overselling. For nightly and
            short-stay hostels that live on OTA demand, that is exactly the right engine, and Cloudbeds is strong at it.
            If most of your bookings arrive from travel sites for a night or a few nights, you are in its lane and it
            serves that lane well.
          </P>

          <H2 id="long-stay">When your beds are long-stay, not nightly</H2>
          <P>
            A large share of bed providers are not backpacker stops. They house workers on contracts, students for a
            term, or long-stay residents paying by the week or month. For them, OTA distribution barely matters; the hard
            part is the operation. Who is in which bed, what each person owes for rent and a fair share of utilities, what
            deposit is held, and whether occupancy is read honestly day to day. A nightly PMS organises everything around
            arrivals, departures and rates, which leaves the long-stay operator working against the grain.
          </P>

          <H2 id="pulsehub">What PulseHub does for long-stay beds</H2>
          <P>
            <A href={routes.hostel}>PulseHub</A> is built for the long-stay operation itself rather than for distribution.
          </P>
          <UL>
            <li><strong>Bills by the night or by the month</strong>, so short and long stays can live on one system with the monthly side as the strength.</li>
            <li><strong>Bed-level occupancy</strong> across floors, rooms and beds, so a 6-bed room with 3 residents reads as half full and a vacancy shows the day it opens.</li>
            <li><strong>One automatic monthly bill per resident</strong> for rent plus a metered share of electricity, split between roommates by join dates, with recurring water, gas and meals where the package includes food.</li>
            <li><strong>Deposits tracked per resident</strong>, settled against the final bill at move-out.</li>
            <li><strong>A free public listing page</strong> per property at yourname.hostels.yourpulse.io, with live availability, photos, prices and an application form.</li>
          </UL>

          <H2 id="both">Running both nightly and long-stay</H2>
          <P>
            If you sell nightly beds as well as long-stay, be clear about what PulseHub is not. It is not a channel
            manager, it does not sync to OTAs, and it is not a booking engine, so it will not distribute nightly rooms to
            Booking.com or Hostelworld for you. The honest setup is two tools: keep a channel manager or a nightly PMS
            such as Cloudbeds for the nightly side, and run the long-stay operation in PulseHub. It also records payments
            rather than processing them, so it is not a payment gateway. To go deeper, read{' '}
            <A href={postPath('how-to-run-a-hostel')}>how to run a hostel</A>, see{' '}
            <A href={postPath('worker-accommodation-management-software')}>worker accommodation software</A>, or explore{' '}
            <A href={routes.sharedHousing}>shared housing management</A>.
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
        heading="For beds let by the week or month"
        text="If your residents stay long-term, run the operation in PulseHub and leave nightly distribution to a channel manager. Start a 14-day free trial with no card required."
        secondaryHref={routes.hostel}
        secondaryLabel="Hostel management software"
      />
    </SiteShell>
  )
}
