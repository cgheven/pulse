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

const post = getBlogPost('what-is-a-property-management-system')!
const url = `${SITE_URL}${postPath(post.slug)}`
const imageUrl = `${SITE_URL}${post.image.src}`

const base = pageMetadata({
  title: post.title,
  description: post.description,
  path: postPath(post.slug),
})

export const metadata: Metadata = {
  ...base,
  openGraph: {
    ...base.openGraph,
    type: 'article',
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
    images: [{ url: imageUrl, width: post.image.width, height: post.image.height, alt: post.image.alt }],
  },
  twitter: {
    ...base.twitter,
    images: [imageUrl],
  },
}

const faqs = [
  {
    question: 'What is a property management system (PMS)?',
    answer:
      'A property management system (PMS) is software that runs the day-to-day operations of a property in one place: who is staying, what they owe, what has been paid, what needs fixing, and how the property is performing. It replaces the spread of spreadsheets, paper and separate apps that most operators start with.',
  },
  {
    question: 'What does a property management system do?',
    answer:
      'A PMS handles the core jobs of running a property from one system: taking bookings or admissions, keeping occupancy accurate, raising bills and recording payments (including part-payments), holding deposits, logging maintenance, communicating with residents or guests, and reporting on occupancy, income and costs across one property or a whole portfolio.',
  },
  {
    question: 'What is the difference between a PMS and property management software?',
    answer:
      'In practice the terms are used interchangeably. "Property management system" tends to be used in hospitality and "property management software" in real estate, but both describe the same thing: one system that centralises bookings or admissions, billing, occupancy, maintenance and reporting for a property.',
  },
  {
    question: 'What are the three main kinds of property management system?',
    answer:
      'Hotel PMS, built around nightly stays, a front desk and distribution to booking channels; real-estate or rental PMS, built around whole-unit leases with one tenant and one rent; and room-level or shared-living PMS, built for properties where people rent a bed and pay monthly, such as co-living, student housing, hostels and HMOs.',
  },
  {
    question: 'What are some examples of property management systems?',
    answer:
      'They differ by category. In hotels you will see Oracle Opera, Cloudbeds and Mews. For whole-unit real estate there are AppFolio, Buildium, Yardi and DoorLoop. For room-level shared living, where people rent a bed and pay monthly, PulseHub is built for co-living, student accommodation, hostels, HMOs and PGs.',
  },
  {
    question: 'Is a property management system cloud-based?',
    answer:
      'Most modern systems are cloud-based, so you reach them from any browser and your data is backed up and updated for you. Some older or larger deployments still run on-premise, installed on the property’s own computers, which shifts maintenance and backups onto you.',
  },
  {
    question: 'How much does a property management system cost?',
    answer:
      'Pricing is usually a monthly subscription, charged per unit, per room, per bed or per property depending on the vendor and the market. The right question is not only the price but whether the system fits how you actually operate, because a cheap tool you fight every month is no bargain.',
  },
  {
    question: 'Do I need a PMS for a small property?',
    answer:
      'A single small property can be run on a spreadsheet for a while. A PMS earns its place once you are chasing payments, juggling move-ins and move-outs, splitting shared bills or running more than one property, where the manual copying between tabs starts to cost you time and the odd expensive mistake.',
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
        { '@type': 'ListItem', position: 3, name: 'What is a property management system', item: url },
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

function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 text-xl font-semibold tracking-tight text-foreground sm:text-[1.35rem]">{children}</h3>
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">{children}</p>
}

function UL({ children }: { children: ReactNode }) {
  return <ul className="mt-6 space-y-3 text-[1.0625rem] leading-[1.75] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">{children}</ul>
}

function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http')
  const className =
    'font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary'
  if (external) {
    return (
      <a href={href} className={className} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

function Box({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{title}</p>
      <div className="mt-4 space-y-3 text-[1.0625rem] leading-[1.75] text-foreground/85 sm:text-lg">{children}</div>
    </div>
  )
}

export default function WhatIsAPmsPost() {
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
              A property management system (PMS) is software that runs a property&rsquo;s day-to-day operations in one
              place: who is staying, what they owe, what has been paid, what needs fixing, and how the property is
              performing.
            </strong>{' '}
            It replaces the spread of spreadsheets, paper and separate apps most operators start with. If you have
            searched the term and found results about hotels next to results about rental flats, that is not a
            mistake: the same three letters are used by industries that work very differently.
          </P>
          <P>
            This guide explains, in plain English, what a PMS actually does, the three kinds you will come across and
            how they differ, the features worth expecting, and how to choose one that fits the way you really operate.
            It is written for people running accommodation of any kind, with no assumption that you run a hotel.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>A PMS centralises a property’s operations: occupancy, billing, payments, maintenance and reporting, in one system.</li>
              <li>There are three broad kinds: hotel PMS (nightly stays), real-estate PMS (whole-unit leases), and room-level PMS (renting beds, billed monthly).</li>
              <li>The kind matters more than the brand. A tool built for one model fights you if you run another.</li>
              <li>Most systems are cloud-based, billed monthly per unit, room, bed or property.</li>
              <li>If you rent by the room and collect rent in monthly pieces, look for a system built for shared living, not a hotel or a single-let tool bent to fit.</li>
            </ul>
          </aside>

          <H2 id="what-it-is">What a property management system is</H2>
          <P>
            A property management system is software that runs the day-to-day operations of a property from one
            screen. Instead of a booking in one place, a rent record in another and a maintenance note on paper, the
            PMS keeps them together and connected, so a move-in updates occupancy, occupancy feeds the bill, and the
            bill feeds the reports. The point is a single source of truth: one record per resident or guest, one
            running balance, one honest view of how full and how profitable the property is.
          </P>
          <P>
            The term began in hotels, where it described the system at the front desk, and it has since spread to
            every kind of property that needs the same control. You will see it written as both &ldquo;property
            management system&rdquo; and &ldquo;property management software&rdquo;; in practice they mean the same
            thing.
          </P>

          <H2 id="what-it-does">What a property management system does</H2>
          <P>
            The details differ by industry, but almost every PMS is built around the same core jobs:
          </P>
          <UL>
            <li><strong>Bookings or admissions:</strong> take a reservation or an application, capture the details once, and turn it into an active stay or tenancy.</li>
            <li><strong>Occupancy:</strong> know what is full and what is free, in real time, without double-booking a room or a bed.</li>
            <li><strong>Billing and payments:</strong> raise what is owed, record what comes in (including part-payments), and carry a true balance.</li>
            <li><strong>Deposits:</strong> hold a deposit and settle it cleanly when someone leaves.</li>
            <li><strong>Maintenance:</strong> log an issue, track it to done, and keep a history against the room.</li>
            <li><strong>Reporting:</strong> show occupancy, income, arrears and costs, for one property and across a portfolio.</li>
            <li><strong>Communication:</strong> reach residents or guests with confirmations, reminders and notices.</li>
          </UL>

          <H2 id="three-kinds">The three kinds of property management system</H2>
          <P>
            This is where the confusion in the search results comes from. &ldquo;PMS&rdquo; covers three quite
            different products, each built around a different way of renting space. Picking the wrong kind is the most
            common and most expensive mistake, because the mismatch shows up every single day.
          </P>

          <H3>1. Hotel PMS (hospitality)</H3>
          <P>
            Built for nightly and short stays. A hotel PMS revolves around a front desk, check-in and check-out,
            housekeeping, nightly rates and distribution to booking channels and travel sites through a channel
            manager. Names you will see include Oracle Opera, Cloudbeds and Mews. If your guests arrive for a few
            nights and you sell rooms through online travel agents, this is your category.
          </P>

          <H3>2. Real-estate or rental PMS</H3>
          <P>
            Built for whole-unit lets. A real-estate PMS assumes one tenant (or household) signs for one whole unit on
            a long lease and pays one rent, and it leans into leasing, tenant screening, accounting and maintenance
            across a portfolio of flats or houses. Names you will see include AppFolio, Buildium, Yardi and DoorLoop.
            If you let entire flats or houses on annual tenancies, this is your category.
          </P>

          <H3>3. Room-level or shared-living PMS</H3>
          <P>
            Built for renting by the room and the bed. This kind runs properties where many people live under one
            roof, each renting a bed rather than a whole unit, each on their own agreement, each paying for their own
            stay, by the month (often in parts) and, in hostels and flexible spaces, by the night. It has to model a
            room as having several beds, keep occupancy true at bed level, bill each resident individually, split
            shared costs such as electricity, and often handle deposits, meals and a waiting list. This is the model
            behind co-living, student accommodation, hostels, shared houses, HMOs and PGs, and it is the gap a hotel
            PMS or a single-let tool leaves open. This room-level category is sometimes called an{' '}
            <A href="/blog/accommodation-management-system">accommodation management system</A>;{' '}
            <A href={routes.sharedHousing}>PulseHub</A> is built for it, and bills a stay by the night or by the month.
          </P>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[0.95rem]">
              <caption className="sr-only">Comparison of the three kinds of property management system</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-3 pr-4 font-medium text-muted-foreground" />
                  <th scope="col" className="px-4 py-3 font-semibold">Hotel PMS</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Real-estate PMS</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Room-level PMS</th>
                </tr>
              </thead>
              <tbody className="text-foreground/85">
                {[
                  ['What is rented', 'A room for the night', 'A whole unit on a lease', 'A room or a bed'],
                  ['How rent is paid', 'Per night or stay', 'Monthly, one rent', 'Per night or per month'],
                  ['Built around', 'Front desk and channel distribution', 'Leasing and accounting', 'Beds, occupancy and per-resident billing'],
                  ['Example tools', 'Opera, Cloudbeds, Mews', 'AppFolio, Buildium, Yardi', 'PulseHub'],
                  ['Best for', 'Hotels and short stays', 'Single-let flats and houses', 'Co-living, student, hostels, HMOs, PGs'],
                ].map(([label, hotel, realEstate, roomLevel]) => (
                  <tr key={label} className="border-b border-border/60 align-top">
                    <th scope="row" className="py-3 pr-4 font-medium text-muted-foreground">{label}</th>
                    <td className="px-4 py-3">{hotel}</td>
                    <td className="px-4 py-3">{realEstate}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{roomLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Box title="Which kind do you need?">
            <P>
              A quick test: <strong>what does one person rent, and how often do they pay?</strong> A whole unit, once a
              month on a long lease, points to a real-estate PMS. A room for a few nights, sold through travel sites,
              points to a hotel PMS. A bed in a shared property, paid monthly and sometimes in installments, points to
              a room-level system built for shared living.
            </P>
          </Box>

          <H2 id="features">Core features to expect</H2>
          <P>
            Whatever the category, a capable property management system should give you most of the following. Use it
            as a checklist when you compare tools:
          </P>
          <UL>
            <li><strong>A single record per resident or guest,</strong> with their documents, agreement, deposit and full history in one timeline.</li>
            <li><strong>True occupancy</strong> that cannot be over-filled, ideally down to the bed for shared properties.</li>
            <li><strong>Flexible billing</strong> that copes with monthly rent, part-payments, pro-rated move-ins and shared costs on one bill.</li>
            <li><strong>Payment tracking and receipts,</strong> with a running balance and automatic reminders for what is late.</li>
            <li><strong>Deposit handling</strong> that settles against final dues at move-out.</li>
            <li><strong>Maintenance and complaints</strong> logged and tracked to resolution.</li>
            <li><strong>Multi-property reporting,</strong> so a portfolio reads as clearly as a single site.</li>
            <li><strong>A way to fill rooms:</strong> channel distribution for hotels, or a public listing page with live availability for everyone else.</li>
            <li><strong>Roles and permissions,</strong> so a manager sees only their property.</li>
          </UL>

          <H2 id="cloud">Cloud or on-premise</H2>
          <P>
            Most modern systems are cloud-based: you reach them from any browser, on any device, and the vendor
            handles updates, security and backups. A smaller number, usually older or very large deployments, run
            on-premise, installed on the property’s own machines, which gives you more direct control but puts
            maintenance, upgrades and backups on you. For nearly all independent and growing operators, cloud is the
            practical default.
          </P>

          <H2 id="pms-vs">PMS, CRM and ERP: how they differ</H2>
          <P>
            A PMS is sometimes confused with two neighbours. A <strong>CRM</strong> (customer relationship management)
            is about winning and keeping customers: leads, enquiries and marketing. An <strong>ERP</strong>
            (enterprise resource planning) is a broad back-office suite covering finance, HR and supply chains across a
            whole company. A PMS sits in the middle and is specific to running the property itself: the stays, the
            rooms, the bills and the day-to-day. Many operators run a PMS as their core and connect a CRM or accounting
            tool alongside it.
          </P>

          <H2 id="choose">How to choose a property management system</H2>
          <P>
            Price and feature lists are the easy part to compare and the least important. Work through these first:
          </P>
          <UL>
            <li><strong>Does it fit your model?</strong> Match the category to how you rent. A shared-housing operator forcing a hotel or single-let tool to fit will feel the friction every day.</li>
            <li><strong>Does the billing match your reality?</strong> If rent arrives monthly and in parts, and bills are shared, make sure the system handles that natively rather than through workarounds.</li>
            <li><strong>Does it scale to more than one property</strong> without turning into a spreadsheet again?</li>
            <li><strong>Can you get your data in and out?</strong> Bulk import to start, and export whenever you want.</li>
            <li><strong>Is the reporting honest and clear</strong> enough to make decisions from?</li>
            <li><strong>What is the real cost,</strong> including setup, per-room or per-bed fees, and the time to run it?</li>
            <li><strong>Is support there</strong> when something goes wrong at month-end?</li>
          </UL>

          <H2 id="shared-living">A property management system for shared and co-living housing</H2>
          <P>
            If you rent by the room and the bed, the third category is the one that fits, and it is the one most
            generic tools miss. PulseHub is a property management system built for that model: it treats a property as
            floors, rooms and beds, keeps occupancy true at bed level, bills each resident for their stay whether they
            pay by the night or by the month, gathers rent and shared costs onto one bill, records part-payments as
            installments, splits metered electricity between residents by their move-in dates, and shows every property
            together in one portfolio view.
          </P>
          <P>
            If that sounds like your operation, read more about{' '}
            <A href={routes.sharedHousing}>property management software for shared housing</A>, or go straight to the
            page for your type: <A href={routes.hmo}>HMO management software</A>,{' '}
            <A href={routes.student}>student accommodation software</A> or{' '}
            <A href={routes.coliving}>co-living management software</A>.
          </P>
        </div>
      </article>

      <section className="px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-[50rem]">
          <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-8">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <CtaBand
        heading="Running shared housing? Put it on one system."
        text="PulseHub is a property management system for renting by the room and the bed: admissions, one bill per resident, shared bills and every property in one view. Start a 14-day free trial with no card required."
        secondaryHref={routes.sharedHousing}
        secondaryLabel="PMS for shared housing"
      />
    </SiteShell>
  )
}
