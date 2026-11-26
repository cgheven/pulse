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

const post = getBlogPost('best-co-living-management-software')!
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
    question: 'What is the best co-living management software?',
    answer:
      'It comes down to whether a tool understands rooms. Generic property platforms like Buildium, AppFolio and Yardi are built around whole units on one tenancy. Co-living is the opposite: several residents under one roof, each renting a room with their own bill and deposit. Purpose-built room-level tools such as CoLivSuite and PulseHub handle that directly, so for most co-living operators one of those is the better fit.',
  },
  {
    question: 'Why do generic property tools struggle with co-living?',
    answer:
      'Because they assume one tenant, one unit, one lease. In co-living, income is per room: five residents in one house, five rents, five move-in dates, a shared electricity bill to split. A whole-unit system cannot see that a house is four-fifths full or bill each resident a metered share of utilities, so you end up working around it in spreadsheets.',
  },
  {
    question: 'Does PulseHub have resident community features?',
    answer:
      'PulseHub focuses on the operational core: rooms, rent, metered utilities, deposits and occupancy, plus operator-to-resident channels like announcements, complaints and feedback. It is not a resident social network with event calendars and polls. If a community social layer is central to your brand, a community-first co-living tool may suit you better; if running the property cleanly is the priority, that is what PulseHub is built for.',
  },
  {
    question: 'What should I look for in co-living software?',
    answer:
      'The essentials are bed-level occupancy, one bill per resident, a metered or fair split of shared utilities, a deposit tracked per resident, and a public page to advertise rooms with live availability. Those are what a whole-unit tool cannot do and what a room-level platform is built around.',
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
        { '@type': 'ListItem', position: 3, name: 'Best co-living management software', item: url },
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

export default function BestCoLivingSoftwarePost() {
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
              Most &ldquo;best co-living software&rdquo; lists are really lists of general property tools, and that is the
              trap. Co-living is not whole-unit letting with a nicer name; it is several residents under one roof, each
              renting a room, each with their own rent, move-in date and share of the bills.
            </strong>{' '}
            So the real choice is not which brand is best, but whether a tool understands rooms at all. Here is the split.
          </P>

          <H2 id="generic">Generic property software (Buildium, AppFolio, Yardi)</H2>
          <P>
            These are capable platforms, and the roundups love them, but they are built around one tenant on one lease for
            one unit, and usually priced per unit to match. For a block of self-contained flats that is fine. For co-living
            it fights you every month: the system
            cannot see that a five-bed house has one room empty, cannot bill each resident separately, and cannot split a
            shared electricity bill between the people who were actually there. You end up running the real co-living logic
            in spreadsheets on the side.
          </P>

          <H2 id="room-level">Purpose-built room-level platforms (CoLivSuite, PulseHub)</H2>
          <P>
            The tools built for co-living model the property as rooms and beds. <strong>CoLivSuite</strong> is one, with a
            lean toward resident community features. <A href={routes.coliving}>PulseHub</A> is another, with a lean toward
            the operational core: it bills each resident separately, splits metered utilities fairly, keeps occupancy true
            at the bed, tracks a deposit per resident, and gives each property a public page to advertise rooms. It runs on
            a published per-property plan with a free trial, priced for independent and mid-sized operators rather than
            institutions.
          </P>
          <UL>
            <li><strong>Bed-level occupancy</strong>, so a part-full house reads as part-full and a vacancy is visible at once.</li>
            <li><strong>One bill per resident</strong> for room rent plus a metered share of electricity, with recurring water and gas.</li>
            <li><strong>Deposits per resident</strong>, settled against the final bill at move-out.</li>
            <li><strong>A public listing page</strong> per property with live room availability and an application form.</li>
          </UL>
          <P>
            Where to be honest about the edges: PulseHub focuses on running the property, not on being a resident social
            network, so it has operator channels like announcements, complaints and feedback rather than event calendars
            and polls. It records payments rather than processing them, so it is not a payment gateway. If a community
            social layer is the centre of your brand, weigh a community-first tool; if clean operations are the priority,
            that is PulseHub&rsquo;s lane.
          </P>

          <H2 id="look-for">What to look for in co-living software</H2>
          <UL>
            <li>Bed-level occupancy, not just whole-unit status.</li>
            <li>One bill per resident, and a fair or metered split of shared utilities.</li>
            <li>Deposits tracked per resident, with the refundable balance visible.</li>
            <li>A public page to advertise rooms and take direct inquiries.</li>
          </UL>

          <H2 id="next">Where to go next</H2>
          <P>
            See how <A href={routes.coliving}>PulseHub manages co-living</A>, read{' '}
            <A href={postPath('co-living-management-software-guide')}>what co-living software does</A>, how to{' '}
            <A href={postPath('how-to-start-a-co-living-business')}>start a co-living business</A>, or how to{' '}
            <A href={postPath('split-utility-bills-shared-house')}>split utility bills in a shared house</A>.
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
        heading="Co-living software that understands rooms"
        text="If you run co-living room by room, see PulseHub on your own properties. Start a 14-day free trial with no card required."
        secondaryHref={routes.coliving}
        secondaryLabel="Co-living management software"
      />
    </SiteShell>
  )
}
