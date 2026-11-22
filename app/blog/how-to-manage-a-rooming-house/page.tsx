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

const post = getBlogPost('how-to-manage-a-rooming-house')!
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
    question: 'What is a rooming house?',
    answer:
      'A rooming house is a property where people rent individual rooms rather than a whole unit, usually sharing a kitchen and bathrooms, and often paying monthly with utilities included. It overlaps with SROs (single room occupancy), co-living and boarding houses. The common thread is that you let and bill by the room, not by the whole lease.',
  },
  {
    question: 'How do you collect rent in a rooming house?',
    answer:
      'Per resident, not per property. Each room has its own rent and its own resident, so you raise one bill per person and track who has paid. With rooming house software like PulseHub you record each payment and issue a receipt; it is not a payment gateway, so money still moves through your own bank or app and you mark it received.',
  },
  {
    question: 'How are utilities handled in a rooming house?',
    answer:
      'Many operators include utilities in the rent, which means you need a fair way to spread the cost. PulseHub meters electricity and splits it between residents by room and move-in dates, and lets you add recurring charges such as water and gas, so each resident gets one bill covering their share rather than a flat split.',
  },
  {
    question: 'Do rooming houses have special rules?',
    answer:
      'Often yes. Many US cities and counties regulate rooming houses and SROs through zoning, occupancy limits, licensing or inspections, and the rules vary widely by location. This guide is general information, not legal advice, so confirm what applies to your property with your local housing or code department before you operate.',
  },
  {
    question: 'Can one system manage more than one rooming house?',
    answer:
      'Yes. PulseHub runs every property from one account: switch between them, move a resident or a room between properties, and compare occupancy, collections and outstanding balances across all of them in one view.',
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
        { '@type': 'ListItem', position: 3, name: 'How to manage a rooming house', item: url },
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

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
      {children}
    </Link>
  )
}

export default function HowToManageARoomingHousePost() {
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
              Managing a rooming house comes down to running rooms, not a lease: each room has its own resident, its
              own rent and its own share of the utilities. Do that on paper and it is a scramble of rent books and
              spreadsheets; do it with software built to rent by the room and it is a few screens.
            </strong>{' '}
            This is a practical, step-by-step guide to running a rooming house in the US, and where{' '}
            <A href={routes.us}>rent-by-the-room software</A> takes the load off.
          </P>

          <H2 id="setup">1. Set up the house, down to the room</H2>
          <P>
            Map the property as it actually is: rooms and beds, each let on its own, with the rent and any features
            (private or shared bathroom, furnished, square footage) recorded per room. This is the foundation, because
            occupancy, billing and your vacancy list all flow from it. Done right, a room is never double-booked and you
            always know what is empty.
          </P>

          <H2 id="residents">2. Screen and onboard residents</H2>
          <P>
            Each resident becomes one record holding their contact details, documents, agreement and deposit. New
            residents can also apply through the property&rsquo;s own public listing page, which shows live room
            availability and an inquiry form, so you fill vacancies directly rather than only through listing sites.
          </P>

          <H2 id="rent">3. Collect per-room rent on one bill</H2>
          <P>
            Rent in a rooming house is per resident, so raise one monthly bill per person covering their room rent and
            any add-ons. PulseHub records full or partial payments as they come in and issues a numbered receipt for
            each one, with the balance carried forward. It records payments rather than processing them, so money moves
            through your own bank or payment app and you mark it received.
          </P>
          <div className="mt-8">
            <ProductScreenshot
              src={usScreenshots.payments.src}
              alt="A PulseHub payments screen in US dollars showing each rooming house resident's rent and balance, paid and pending"
              width={usScreenshots.payments.width}
              height={usScreenshots.payments.height}
              label="One bill per resident, in US dollars"
              sizes="(max-width: 820px) calc(100vw - 2rem), 50rem"
            />
          </div>

          <H2 id="utilities">4. Split utilities fairly between rooms</H2>
          <P>
            If you include utilities in the rent, you need a fair way to spread the cost rather than guessing. PulseHub
            meters electricity, splits it between residents by room and their move-in dates, and lets you add recurring
            charges such as water and gas, so each resident&rsquo;s share lands on their own bill. A resident who
            arrived mid-month pays for their share, not a flat cut.
          </P>

          <H2 id="deposits">5. Hold deposits and handle move-outs</H2>
          <P>
            Track each resident&rsquo;s deposit against their record, and at move-out settle the final utility charge
            and any outstanding rent against it, so you can see exactly what to collect or refund. The room then returns
            to vacant and the resident&rsquo;s history stays on file.
          </P>

          <H2 id="rules">6. Stay on the right side of local rules</H2>
          <P>
            Many US cities and counties regulate rooming houses and SROs through zoning, occupancy limits, licensing or
            inspections, and the rules vary widely by location. Keeping clean records of who occupies which room, with
            dates, makes those requirements far easier to meet. This is general information, not legal advice, so confirm
            what applies to your property with your local housing or code department.
          </P>

          <H2 id="next">Bringing it together</H2>
          <P>
            Running a rooming house well is mostly about not letting the small things slip: a room sitting empty, a bill
            raised late, a deposit no one can find at move-out. Bringing rooms, residents, rent, utilities and deposits
            into one place is what frees you from the paperwork. See <A href={routes.us}>rent-by-the-room software for
            the US</A>, or the related <A href={postPath('sro-management-software')}>SRO management software</A> guide,{' '}
            <A href={routes.coliving}>co-living management</A> and the wider{' '}
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
        heading="Run your rooming house by the room"
        text="Rooms and beds, one bill per resident for rent and split utilities, deposits and every property in one view. Start a 14-day free trial with no card required."
        secondaryHref={routes.us}
        secondaryLabel="Rent by the room software"
      />
    </SiteShell>
  )
}
