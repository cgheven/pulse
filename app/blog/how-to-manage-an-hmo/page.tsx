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

const post = getBlogPost('how-to-manage-an-hmo')!
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
    question: 'Does my HMO need a licence?',
    answer:
      'It depends on your council and the property. In England a large HMO (often five or more occupants forming more than one household) usually needs a mandatory licence, and many councils run additional or selective licensing that catches smaller HMOs too. Rules differ by area, so check with your local council before letting rooms. This is general information, not legal advice.',
  },
  {
    question: 'What certificates does an HMO landlord need to keep current?',
    answer:
      'Typically a valid gas safety certificate, an electrical installation condition report (EICR), an energy performance certificate (EPC), and evidence that fire alarms and fire-safety measures are in place, alongside the HMO licence itself. Each has its own renewal date. A certificate tracker with per-property deadlines helps you renew before anything lapses. Confirm the exact requirements with your council, as they vary.',
  },
  {
    question: 'How should I bill utilities in a bills-included HMO?',
    answer:
      'You can charge each resident a metered share of electricity plus a recurring amount for water and gas, or fold a fair-usage utility figure into one monthly rent. The key is to be clear and consistent so residents know what they pay for. PulseHub produces one bill per resident that itemises rent and the utility share, which keeps the arrangement transparent and reduces disputes.',
  },
  {
    question: 'Does PulseHub protect my tenants’ deposits?',
    answer:
      'No. PulseHub records each deposit and helps you settle it against the final bill at move-out, but it does not lodge deposits with a government-backed protection scheme. Where a deposit must be protected, that remains the landlord’s legal responsibility. Use the software to track the money and the paperwork, and protect the deposit through the appropriate scheme yourself.',
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
        { '@type': 'ListItem', position: 3, name: 'How to manage an HMO', item: url },
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

export default function HowToManageAnHmoPost() {
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
              Managing an HMO well comes down to five things done consistently: staying licensed and compliant, billing
              each room fairly, handling deposits properly, keeping rooms full, and keeping clean records.
            </strong>{' '}
            A house in multiple occupation earns more per square foot than a single let, but it also carries more rules and
            more moving parts. This guide walks through each area and where the right software takes the admin off your
            plate.
          </P>

          <H2 id="compliance">Get the licensing and compliance right</H2>
          <P>
            Start here, because this is where a mistake is most expensive. In England an HMO may need a licence from the
            local council, and larger HMOs usually do. On top of the licence you are expected to keep safety paperwork
            current: a gas safety certificate, an electrical installation condition report (EICR), an energy performance
            certificate (EPC), and working fire alarms with the fire-safety measures the property needs. Each of those has
            its own deadline, and a lapse can mean a fine or a problem at renewal.
          </P>
          <P>
            PulseHub includes a compliance certificate tracker for England with per-property deadlines, so you can see at a
            glance what is due and when, across every property in your portfolio. It is a reminder system, not a legal
            adviser: rules differ between councils and change over time, so treat this as general information and confirm
            your obligations with your local council. See the{' '}
            <A href={postPath('hmo-compliance')}>HMO compliance guide</A> for a fuller walkthrough.
          </P>

          <H2 id="billing">Bill room by room, fairly</H2>
          <P>
            In an HMO each resident has their own agreement for a room, so each resident should get their own bill. PulseHub
            produces one automatic monthly bill per resident: rent, plus a metered share of electricity split by the dates
            people actually lived there, plus any recurring water and gas, plus meals if you include them. That beats
            dividing a quarterly utility bill by hand every time someone moves in or out mid-month.
          </P>
          <P>
            If you let on a bills-included basis, be clear about what that covers and set a sensible fair-usage expectation
            up front. Residents rarely argue with a bill they understand, and a transparent split is the simplest way to
            avoid disputes. The{' '}
            <A href={postPath('bills-included-hmo-fair-usage')}>bills-included fair-usage guide</A> covers how to frame it.
          </P>

          <H2 id="deposits">Handle deposits properly</H2>
          <P>
            Record a deposit against each resident when they move in and settle it against their final bill when they leave,
            with any deductions itemised so the maths is clear. PulseHub tracks the deposit per resident through the whole
            tenancy. One important limit: where a deposit must be protected in a government-backed scheme, that stays the
            landlord&rsquo;s job. The software does not lodge the deposit for you. Track the money and the paperwork in
            PulseHub, and protect the deposit through the correct scheme yourself.
          </P>

          <H2 id="occupancy">Keep the rooms full</H2>
          <P>
            An empty room is lost income you never recover, so you want to see a vacancy the moment it appears. PulseHub
            works at bed level: floors contain rooms, rooms contain beds, and occupancy is kept true for each bed. A room
            that frees up next month shows as available now, not after someone remembers to update a spreadsheet.
          </P>
          <P>
            To fill it, every property gets a free public listing page with live availability and an application form.
            Prospective tenants can see what is open and apply directly. It is your own page, not a channel manager or
            marketplace: PulseHub does not distribute your rooms to third-party portals, it gives you a link to advertise
            yourself. For how rent tracking ties into occupancy, see{' '}
            <A href={postPath('hmo-rent-tracking')}>HMO rent tracking</A>.
          </P>

          <H2 id="records">Keep clean records</H2>
          <P>
            Good records protect you if a tenant disputes a charge, if the council asks questions, or at tax time. Keep a
            per-resident ledger of what was charged and paid, issue receipts, and keep an audit trail of changes. PulseHub
            records payments as you log them (it is not a payment gateway, so it does not take money for you) and sends
            automated reminders, WhatsApp-first, when rent is due or late. Across several properties the same records roll
            up into one portfolio view.
          </P>
          <P>
            Software like <A href={routes.hmo}>PulseHub</A> helps you run the business day to day, but it does not replace
            legal, tax or licensing advice, and local rules vary. Treat everything here as general information and check the
            specifics with your council and a qualified adviser.
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
        heading="Run your HMO room by room"
        text="See one bill per resident, true bed-level occupancy and a compliance tracker in one place. Start a 14-day free trial with no card required."
        secondaryHref={routes.hmo}
        secondaryLabel="HMO management software"
      />
    </SiteShell>
  )
}
