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

const post = getBlogPost('reduce-void-periods')!
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
    question: 'What is a void period?',
    answer:
      'A void period is the time a room or bed sits empty between residents, earning nothing while your costs carry on. In shared housing, where income is per room, a few voids across a portfolio quietly add up to a real dent in revenue.',
  },
  {
    question: 'How do you reduce void periods?',
    answer:
      'See voids the moment they happen, line up the next resident before the last one leaves, and make rooms easy to find and apply for. In practice that means bed-level occupancy so nothing is missed, a waiting list of interested applicants, a public listing page that takes inquiries, and a quick turnaround between move-out and move-in.',
  },
  {
    question: 'Can PulseHub help fill empty rooms?',
    answer:
      'It helps you see and act on voids rather than remove them for you. PulseHub shows every empty bed across the portfolio, holds interested applicants on a waiting list, and gives each property a public listing page with live availability and an application form. It is not a booking engine or channel manager and does not sync to travel sites; it takes direct inquiries to your own page.',
  },
  {
    question: 'How do I know my real occupancy rate?',
    answer:
      'Because PulseHub counts at the bed, a half-full room reads as half full, so your occupancy figure is honest. You can see occupancy across every property and spot which site is carrying the voids, rather than guessing from whole-room counts.',
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
        { '@type': 'ListItem', position: 3, name: 'Reduce void periods', item: url },
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

export default function ReduceVoidPeriodsPost() {
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
              In shared housing, your income is the sum of your rooms, so an empty bed is not a gap, it is lost rent for
              every night it sits. Reducing void periods is not about magic marketing; it is about noticing a vacancy the
              moment it happens and having the next resident ready to move in.
            </strong>{' '}
            Here is how to cut voids in a rooming house, HMO or co-living, practically.
          </P>

          <H2 id="see">See the void the moment it happens</H2>
          <P>
            You cannot fill a vacancy you have not noticed. The problem with counting rooms is that a half-full room looks
            occupied, so voids hide. Counting at the bed fixes that: a six-bed house with three residents reads as half
            full, and an empty bed shows up the day it is empty. See our guide to{' '}
            <A href={postPath('occupancy-management-software')}>occupancy management software</A> for how that works.
          </P>

          <H2 id="waitlist">Line up the next resident before the last one leaves</H2>
          <P>
            Most voids are caused by starting the search only after a room is empty. A waiting list flips that: when
            someone enquires and there is no room free, you hold them, so a move-out already has a move-in ready. The
            week between notice and departure becomes a week of lining up the next resident, not a week of scrambling.
          </P>

          <H2 id="listing">Make rooms easy to find and apply for</H2>
          <P>
            The faster an interested person can see availability and apply, the shorter the void. A public listing page
            for each property, with live room availability, prices, photos and an application form, means inquiries reach
            you directly and the applicant does the first step themselves. PulseHub gives each property one. It is for
            your own direct inquiries, not a booking engine or channel manager, so it does not sync to travel sites.
          </P>

          <H2 id="turnaround">Shorten the turnaround</H2>
          <P>
            The last lever is the handover itself. Settle the departing resident&rsquo;s final bill and deposit quickly
            so the room is genuinely free, have the admission for the next resident ready to go, and the gap between one
            leaving and the next arriving shrinks to days instead of weeks.
          </P>

          <H2 id="track">Track it so it does not creep back</H2>
          <P>
            Voids creep back when no one is watching the number. Keep an eye on the occupancy rate across every property,
            so you can see which site is carrying the empty beds and act before it costs a month. What gets measured
            gets filled.
          </P>

          <H2 id="next">Where to go next</H2>
          <P>
            Read the <A href={postPath('occupancy-management-software')}>occupancy management</A> guide, see how PulseHub
            runs <A href={routes.hmo}>HMOs</A>, <A href={routes.hostel}>hostels</A> and{' '}
            <A href={routes.coliving}>co-living</A>, or explore the wider{' '}
            <A href={routes.sharedHousing}>shared-housing platform</A>.
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
        heading="See every empty bed before it costs you"
        text="Track occupancy down to the bed, hold demand on a waiting list, and fill rooms from your own page. Start a 14-day free trial with no card required."
        secondaryHref={routes.sharedHousing}
        secondaryLabel="Shared-housing platform"
      />
    </SiteShell>
  )
}
