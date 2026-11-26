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

const post = getBlogPost('best-hostel-management-software')!
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
    question: 'What is the best hostel management software?',
    answer:
      'It depends on how you let beds. Nightly backpacker hostels that sell beds across Hostelworld and Booking.com need a channel-manager PMS like Cloudbeds, WebRezPro or Sirvoy. Hostels that let beds long-term, by the week or month to workers, students or long-stay residents, need bed-level operations software like PulseHub. The best tool is the one that matches your stay length and booking channels.',
  },
  {
    question: 'Does PulseHub connect to Hostelworld or Booking.com?',
    answer:
      'No. PulseHub is not a channel manager and does not sync availability to online travel agents like Hostelworld or Booking.com. If selling nightly beds through those channels is central to you, use a hostel PMS built for distribution. PulseHub is built for running the operation itself: beds, residents, bills and occupancy, by the night or by the month, on your own direct bookings.',
  },
  {
    question: 'Can one system handle both nightly and monthly hostel beds?',
    answer:
      'PulseHub bills by the night or by the month on the same system, so a hostel with both short-stay guests and long-stay residents can run on it. What it does not do is distribute nightly beds to travel sites. If you need both operations and OTA distribution, pair PulseHub with a channel manager, or use a hostel PMS if nightly distribution is the bigger part of your business.',
  },
  {
    question: 'What should I look for in hostel software?',
    answer:
      'First decide nightly versus long-stay. For nightly, prioritise channel management and a booking engine. For long-stay, prioritise bed-level occupancy, one bill per resident, a metered share of utilities, deposits per resident, and a public page to advertise beds. Then weigh bed count and budget.',
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
        { '@type': 'ListItem', position: 3, name: 'Best hostel management software', item: url },
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

export default function BestHostelSoftwarePost() {
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
              The best hostel management software depends on one thing most lists skip: how long people stay. A nightly
              backpacker hostel selling beds on Hostelworld needs a completely different tool from a hostel letting beds by
              the month to workers or students.
            </strong>{' '}
            Get that split right and the shortlist almost picks itself. Here is how the two sides break down.
          </P>

          <H2 id="nightly">Nightly backpacker hostels: you need a channel manager</H2>
          <P>
            If your beds turn over nightly and most bookings come through online travel agents, the real contenders are
            hostel and hotel PMS platforms built for distribution: <strong>Cloudbeds</strong>, <strong>WebRezPro</strong>,{' '}
            <strong>Sirvoy</strong> and similar. Their core job is syncing availability and rates across Hostelworld,
            Booking.com and your booking engine, so you do not oversell a dorm. The giveaway is what they are priced and
            built around: a booking engine, channel connections and nightly rates, usually charged per bed or per room. If
            that is your business, start there.
          </P>
          <P>
            To be upfront: <A href={routes.hostel}>PulseHub</A> is not this. It is not a channel manager and does not sync
            beds to travel sites. So if nightly OTA distribution is the heart of your hostel, a PMS above fits better than
            PulseHub does.
          </P>

          <H2 id="long-stay">Long-stay and residential hostels: you need bed-level operations</H2>
          <P>
            A large share of hostels are not backpacker stops at all. They house workers, students or long-stay residents
            who pay by the week or month. For these, distribution barely matters and the hard part is the operation: who
            is in which bed, what each person owes for rent and a share of utilities, deposits, and keeping occupancy
            honest. That is the lane PulseHub is built for.
          </P>
          <UL>
            <li><strong>Bed-level occupancy</strong>, so a part-full room reads as part-full and a vacancy shows the day it happens.</li>
            <li><strong>One bill per resident</strong> for rent plus a metered share of electricity, with recurring water and gas.</li>
            <li><strong>Deposits per resident</strong>, settled against the final bill at move-out.</li>
            <li><strong>Mess and kitchen costing</strong> where you feed residents, plus a free public page to advertise beds.</li>
          </UL>
          <P>
            PulseHub can bill <strong>by the night or by the month</strong>, so a hostel with both short and long stays runs
            on one system. It still records payments rather than processing them, so it is not a payment gateway, and it is
            not a channel manager; pair it with one if you also sell nightly beds on travel sites.
          </P>

          <H2 id="choose">How to choose</H2>
          <UL>
            <li><strong>Mostly nightly, OTA-driven?</strong> Prioritise a channel manager and booking engine.</li>
            <li><strong>Mostly weekly or monthly residents?</strong> Prioritise bed-level occupancy and one bill per resident.</li>
            <li><strong>Both?</strong> Run operations in PulseHub and distribution in a channel manager, or lead with whichever is the bigger part of your income.</li>
          </UL>

          <H2 id="next">Where to go next</H2>
          <P>
            If your beds are let long-term, see how{' '}
            <A href={routes.hostel}>PulseHub runs a hostel</A>, read the{' '}
            <A href={postPath('how-to-run-a-hostel')}>how to run a hostel</A> guide, or, for staff housing,{' '}
            <A href={postPath('worker-accommodation-management-software')}>worker accommodation software</A>.
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
        heading="For hostels that let beds by the week or month"
        text="If your hostel runs on long-stay residents, see PulseHub on your own beds. Start a 14-day free trial with no card required."
        secondaryHref={routes.hostel}
        secondaryLabel="Hostel management software"
      />
    </SiteShell>
  )
}
