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

const post = getBlogPost('how-to-start-a-pg-business')!
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
    question: 'How much does it cost to start a PG business?',
    answer:
      'It varies widely by city and whether you own or rent the property. The main costs are the lease or purchase, furnishing beds and common areas, a kitchen if you serve food, deposits and basic setup. A small rented PG with a handful of rooms starts far lower than a purpose-built multi-floor property. Build a simple budget per bed, since your income is also per bed, and keep a buffer for the first few months while occupancy fills.',
  },
  {
    question: 'Is a PG business profitable?',
    answer:
      'It can be, and the levers are occupancy, pricing and controlling costs like electricity and food. A PG makes money when most beds stay filled and each resident pays rent plus a fair share of utilities and meals. Voids, unpaid dues and runaway mess costs are what erode margin. Tracking occupancy at bed level and billing every resident accurately each month is how operators protect the profit, which is exactly the work software removes from spreadsheets.',
  },
  {
    question: 'What software do I need to run a PG?',
    answer:
      'You need something that tracks who is in which bed, bills each resident once a month and records payments. PulseHub does this: bed-level occupancy, one automatic bill per resident for rent, a metered electricity share, water, gas and meals, plus deposits, numbered receipts and a free listing page for your property. It records payments rather than processing them, so residents still pay through your own UPI or bank methods and you mark it recorded.',
  },
  {
    question: 'What registrations do I need for a PG?',
    answer:
      'Rules vary by city and state, and sometimes by locality, so this is general information and not legal advice. Depending on where you operate you may need trade or shop registration, police or tenant verification, fire and safety clearance, and food or health permissions if you run a mess. Check with your local municipal body and police station before you open, because requirements and names differ across India.',
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
        { '@type': 'ListItem', position: 3, name: 'How to start a PG business', item: url },
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

export default function HowToStartAPgBusinessPost() {
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
              Starting a paying-guest business in India comes down to six practical steps: pick the right property, set up
              rooms and pricing, decide food and bills, handle deposits and agreements, find your first residents, then
              run it without drowning in spreadsheets.
            </strong>{' '}
            Get each one roughly right and a PG becomes a steady, bed-by-bed business. Here is how to work through them.
          </P>

          <H2 id="property">Choose the property and location</H2>
          <P>
            Demand decides everything, so start where people already need beds: near colleges, offices, hospitals or
            industrial areas. A property close to where your residents study or work fills faster and stays full. Weigh
            the rent or purchase cost against how many beds you can realistically fit, since your income is per bed, not
            per building. Check water supply, power backup and safe access before you commit, because those are the
            complaints that drive residents out later.
          </P>

          <H2 id="rooms">Set up rooms and pricing</H2>
          <P>
            Lay the property out as floors, then rooms, then beds, and decide how many share each room. Price by seater:
            set a rate per seat count and split it by AC and non-AC, so a two-sharing AC bed costs more than a
            six-sharing non-AC one. Clear, consistent pricing is easier to advertise and easier to defend when a resident
            asks why their neighbour pays less. Decide your tiers once and apply them across every room.
          </P>

          <H2 id="food-bills">Decide on food and bills</H2>
          <P>
            Choose early whether you serve food. A mess is a selling point near colleges and offices, but it is a real
            cost to run, so cost it per person per meal and plan a weekly menu rather than guessing. For utilities, a
            metered electricity share is the fairest approach: each resident pays for what the property used, split
            across residents by their join dates so a mid-month arrival is not overcharged. Recurring water and gas can
            be added as fixed monthly amounts on top.
          </P>

          <H2 id="deposits">Take deposits and set agreements</H2>
          <P>
            Take a deposit from every resident and track it against their name for the whole stay, then settle it against
            the final bill when they move out. Put the basics in a simple written agreement: rent, what is included,
            notice period, house rules and the deposit terms. Keep a copy of each resident&rsquo;s ID and documents on
            file for your records. This protects both sides and removes most move-out arguments before they start.
          </P>

          <H2 id="tenants">Find your first tenants</H2>
          <P>
            You need beds filled, and the fastest start is usually a mix of channels. A free public listing page for your
            property, showing live availability and an application form, gives you a link to share anywhere: WhatsApp
            groups, college noticeboards, local agents and word of mouth. Treat that page as your shopfront and keep it
            current. Remember it advertises your beds, it is not a marketplace that finds tenants for you, so pair it with
            local outreach while you build a reputation.
          </P>

          <H2 id="run">Run it without spreadsheets</H2>
          <P>
            Once beds start filling, the admin grows fast, and this is where <A href={routes.pg}>PulseHub</A> earns its
            place. It gives each resident one automatic monthly bill for rent, their metered electricity share, water,
            gas and meals, and it holds bed-level occupancy true so you always know what is empty. It records every
            payment with partial payments and dues carried forward, produces numbered receipts you can share by link, and
            keeps deposits per resident. It works across markets, not locked to India, and shows amounts in rupees with
            lakh grouping.
          </P>
          <P>
            One honest note: PulseHub records rent, it is not a payment gateway, so residents still pay through your own
            UPI or bank methods and you mark it recorded. For the day-to-day, read the <A href={postPath('how-to-manage-a-pg')}>guide
            to managing a PG</A> and see what dedicated <A href={postPath('pg-management-software')}>PG management
            software</A> handles once you are running. Registrations and rules vary by city and state, so always check
            locally before you open, as this is general information and not legal advice.
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
        heading="Run your new PG without spreadsheets"
        text="See PulseHub handle beds, bills and deposits from day one. Start a 14-day free trial with no card required."
        secondaryHref={routes.pg}
        secondaryLabel="PG management software"
      />
    </SiteShell>
  )
}
