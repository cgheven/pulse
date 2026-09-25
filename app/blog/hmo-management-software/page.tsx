import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { StartTrialButton } from '@/components/tracked-cta'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('hmo-management-software')!
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
    question: 'What is HMO management software?',
    answer:
      'HMO management software lets you manage a house in multiple occupation at the room and tenant level: who lives in each room, what rent is due, which rooms are empty, and jobs like maintenance and shared bills, across one or more properties from a single account.',
  },
  {
    question: 'How does HMO software help manage rent?',
    answer:
      'It tracks rent schedules, payments (including part-payments), deposits and overdue balances per room and per tenant, so arrears stay visible without rebuilding a spreadsheet every month.',
  },
  {
    question: 'Can HMO software manage multiple properties?',
    answer:
      'Yes. A capable system runs every property from one account, with an easy way to switch between them and compare them. PulseHub includes a property switcher and an All Properties view, and its plans cover 1, 3 or 10 properties.',
  },
  {
    question: 'Can HMO software track rooms and tenants?',
    answer:
      'Yes. It should model the property as rooms and beds, and hold a record for each tenant covering dates, documents, deposit and payment history. In PulseHub, each tenant’s history sits on the member timeline.',
  },
  {
    question: 'How much does HMO management software cost?',
    answer:
      'Pricing varies by provider and usually scales with the number of properties or rooms. PulseHub publishes GBP plans for 1, 3 or 10 properties with a 14-day free trial and no card required; see the pricing page for current figures.',
  },
  {
    question: 'Is HMO software suitable for small landlords?',
    answer:
      'It can be. If you run a single small HMO, a spreadsheet may be enough. Once you manage several rooms across more than one property, or juggle part-payments and voids, software usually saves more time than it costs.',
  },
]

const comparisonRows = [
  {
    aspect: 'Room and bed structure',
    spreadsheet: 'Manual columns you design and maintain',
    software: 'Built in: property, rooms and beds',
  },
  {
    aspect: 'Multiple properties',
    spreadsheet: 'Separate tabs or files per site',
    software: 'One account, with a switch between sites',
  },
  {
    aspect: 'Rent and arrears',
    spreadsheet: 'Formulas; part-payments are easy to get wrong',
    software: 'Tracked per room and tenant, including part-payments',
  },
  {
    aspect: 'Voids and occupancy',
    spreadsheet: 'Checked manually',
    software: 'Visible at a glance',
  },
  {
    aspect: 'Working as a team',
    spreadsheet: 'Risk of overwriting each other',
    software: 'Shared, with role-based access',
  },
  {
    aspect: 'History and audit trail',
    spreadsheet: 'Limited to what you record by hand',
    software: 'Kept automatically for each tenant',
  },
  {
    aspect: 'Cost',
    spreadsheet: 'Free',
    software: 'A monthly subscription',
  },
  {
    aspect: 'Setup',
    spreadsheet: 'None',
    software: 'A short initial setup',
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
        { '@type': 'ListItem', position: 3, name: 'HMO management software', item: url },
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
  return <h3 className="mt-8 text-xl font-semibold tracking-tight sm:text-2xl">{children}</h3>
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

export default function HmoBlogPost() {
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
            HMO management software helps you run a house in multiple occupation at the room and tenant level.
            It tracks rooms and beds, tenants, rent, occupancy and maintenance across one or more properties
            from a single account.
          </P>
          <P>
            Running one HMO is a stack of small jobs: rooms to fill, rent to chase, and a boiler that picks the
            worst week to fail. Running four or five is the same work multiplied, plus the overhead of
            remembering which room is empty at which property and who still owes for last month.
          </P>
          <P>
            Most landlords start with a spreadsheet and a WhatsApp thread. It works until it doesn’t. This
            guide is written for UK operators who rent rooms individually rather than letting the whole
            property to one household.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>HMO management software manages a property at the room and tenant level, not as a single tenancy.</li>
              <li>It keeps rooms and beds, tenants, rent, occupancy and maintenance in one place, across several properties.</li>
              <li>The biggest wins are visible voids, accurate arrears (including part-payments) and a portfolio view.</li>
              <li>Spreadsheets are fine for one small HMO, but strain with several properties, part-payments and shared editing.</li>
              <li>Look for software built around rooms and beds, with clear rent and arrears, real multi-property support and a free trial.</li>
            </ul>
          </aside>

          <H2 id="what-is-it">What is HMO management software?</H2>
          <P>
            HMO management software is a tool for managing a house in multiple occupation at the room and
            tenant level. It tracks who lives in each room, what rent is due, which rooms are empty, and the
            day-to-day jobs like maintenance and shared bills, across one or more properties from a single
            account.
          </P>
          <P>
            The distinction is simple. Ordinary lettings or sales software treats a property as one unit, with
            one tenancy. An HMO isn’t like that. A six-bed HMO can have six separate tenancies, six
            rent schedules, shared kitchens and bathrooms, and bills that need to be allocated between rooms.
            This is why HMO-specific software is typically built around rooms, beds and individual tenancies
            rather than treating the property as a single unit.
          </P>
          <P>
            It helps to be clear on what counts as an HMO. In England, a property is an HMO when it’s rented to
            at least three tenants who aren’t from one household and who share facilities such as a kitchen,
            bathroom or toilet. A larger HMO (five or more tenants forming more than one household) normally
            needs a
            mandatory licence from the council, and many councils run additional licensing schemes that catch
            smaller properties too. Check the rules for your area on{' '}
            <A href="https://www.gov.uk/house-in-multiple-occupation-licence">GOV.UK</A> and with your local
            council. Software helps you run the property; it doesn’t decide your licensing obligations.
          </P>

          <H2 id="who-benefits">Who can benefit from HMO management software?</H2>
          <P>It’s most useful for anyone managing accommodation by the room rather than by the whole property:</P>
          <UL>
            <li><strong>HMO landlords</strong> running one or more licensed HMOs or shared houses.</li>
            <li><strong>Property managers and letting agents</strong> looking after HMOs on behalf of owners.</li>
            <li>
              <strong>Shared accommodation operators</strong> letting rooms in houses that share kitchens and
              bathrooms.
            </li>
            <li>
              <strong>Co-living operators</strong> running{' '}
              <A href={routes.coliving}>shared-living sites</A> with communal space and shared bills.
            </li>
            <li>
              <strong>Student accommodation operators</strong> managing{' '}
              <A href={routes.student}>halls or student houses</A> through the letting cycle. See our{' '}
              <A href={postPath('student-accommodation-management')}>student accommodation management guide</A>.
            </li>
            <li>
              <strong>Small and mid-sized portfolios</strong> that have outgrown a spreadsheet but don’t need
              heavyweight enterprise software.
            </li>
          </UL>

          <H2 id="why-hard">Why managing multiple HMO properties gets difficult</H2>
          <P>The problems that push landlords off spreadsheets are usually these:</P>
          <UL>
            <li>
              <strong>Room-level detail.</strong> You’re not tracking one tenancy per property; you’re tracking
              one per room, with different start dates, deposits and rent amounts under the same roof.
            </li>
            <li>
              <strong>Rent that doesn’t line up.</strong> Rooms are let on different days, some rents are
              all-inclusive of bills and some aren’t, and part-payments are common. A single paid/unpaid column
              stops being enough.
            </li>
            <li>
              <strong>Voids you can’t see.</strong> An empty room is lost income, but across several properties
              it’s easy to lose track of which rooms are free and from when.
            </li>
            <li>
              <strong>Shared costs.</strong> Gas, electricity, water, broadband and council tax often sit with
              you and need splitting fairly across rooms or tenants.
            </li>
            <li>
              <strong>Everything in different places.</strong> Tenancy PDFs in email, rent in a spreadsheet,
              repairs in WhatsApp, deposits in your head.
            </li>
            <li>
              <strong>No portfolio view.</strong> When someone asks how the portfolio is doing, the honest
              answer is a weekend of adding up tabs.
            </li>
          </UL>
          <P>Multiply any of these by the number of properties and the admin grows faster than the income.</P>

          <H2 id="what-to-include">What should HMO management software include?</H2>
          <P>
            At a minimum, it should let you manage rooms and beds, tenants, rent and payments, occupancy,
            maintenance and shared costs, then show all of it across every property from one place. Here is
            what each part looks like in practice.
          </P>

          <H3>Property, room and bed management</H3>
          <P>
            The system should model the property the way it actually works: property, then rooms, then beds.
            That lets you let a room (or a bed in a shared room), see the layout of each site, and keep
            allocations current as people move in and out. PulseHub is organised this way, so a room is a
            first-class thing you can fill, not a line hidden inside a single tenancy.
          </P>

          <H3>HMO tenant management</H3>
          <P>
            HMO tenant management works best when each tenant has their own record: contact details, tenancy
            dates, documents, deposit and payment history. The value is having that history in one place
            instead of reconstructing it from email. In PulseHub, each tenant’s history sits on the{' '}
            <strong>member timeline</strong>: admissions, room changes, charges, payments, deposits and
            complaints in a single record. When a question comes up about a specific tenant, the answer is
            already on one screen.
          </P>

          <H3>Rent collection and payment tracking</H3>
          <P>
            Good HMO rent collection shows what’s due, what’s been paid and what’s overdue, per room and per
            tenant, without you rebuilding it each month. That’s tenant rent tracking done properly: rent
            schedules, part-payments, deposits and a clear view of arrears. PulseHub keeps rent schedules,
            receipts, part-payments, deposits and overdue balances on a dedicated payments screen, separate
            from the tenant’s history so the numbers stay clean. For a deeper look at this one job, see our
            guide to{' '}
            <A href={postPath('hmo-rent-tracking')}>tracking HMO rent, payments and arrears</A>.
          </P>

          <H3>Occupancy management</H3>
          <P>
            An empty room earns nothing quietly. Occupancy tracking shows which rooms and beds are occupied,
            available or allocated, so voids are visible and you can plan re-lets before the income stops.
            Across a portfolio, that’s the difference between spotting a void today and spotting it on the next
            bank statement.
          </P>

          <H3>Maintenance and complaints</H3>
          <P>
            Repairs and complaints are constant in shared housing. Being able to log an issue, assign it and
            keep a record of what was done, and when, protects you and keeps tenants informed. PulseHub records
            maintenance and complaints with their status and history, and the complaints screen supports
            QR-based submission so a tenant can report an issue from the property.
          </P>

          <H3>Multi-property management</H3>
          <P>
            Once you have more than one HMO, the point is to stop running each property as a separate island. A
            capable HMO management system runs every property from one account, with an easy way to switch
            between them and a portfolio view that compares them. PulseHub has a property switcher for moving
            between sites and an All Properties view that compares occupancy, collections, costs and profit.
          </P>

          <H3>Reporting and financial visibility</H3>
          <P>
            This is where HMO property portfolio management earns its keep. You should be able to answer “how
            is this property doing?” and “how is the portfolio doing?” without a spreadsheet marathon. Useful
            reporting covers occupancy, rent collected, outstanding balances, expenses and per-property
            performance, enough to catch a problem early. You can see the full set of tools on the{' '}
            <A href={routes.features}>features page</A>.
          </P>

          <H2 id="manage-efficiently">How to manage multiple HMO properties more efficiently</H2>
          <P>A few habits make the software actually pay off:</P>
          <UL>
            <li>
              <strong>Keep one source of truth.</strong> Put everything in the system: tenancies, rent,
              repairs. Half in software and half in a spreadsheet is worse than either.
            </li>
            <li>
              <strong>Check voids weekly.</strong> A five-minute occupancy sweep across the portfolio catches
              empty rooms while there’s still time to re-let.
            </li>
            <li>
              <strong>Record payments as they happen,</strong> including part-payments, so arrears are current
              rather than a month behind.
            </li>
            <li>
              <strong>Give the right people the right access.</strong> If a manager handles a property,
              role-based access lets them see what they need without handing over everything. PulseHub supports
              staff access for the properties people actually manage.
            </li>
            <li>
              <strong>Standardise rooms and rents.</strong> Consistent room names and rent schedules make the
              portfolio view meaningful.
            </li>
          </UL>
          <P>
            For a step-by-step version of this, see our guide to{' '}
            <A href={postPath('manage-multiple-hmo-properties-without-spreadsheets')}>managing multiple HMO properties without spreadsheets</A>.
          </P>

          <H2 id="vs-spreadsheets">HMO management software vs spreadsheets</H2>
          <P>
            Spreadsheets are free, flexible and familiar, and for a single small HMO they can be enough. The
            picture changes as you add properties, rooms and part-payments. Here is how the two compare on the
            jobs that come up day to day.
          </P>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-base">
              <caption className="sr-only">
                Comparison of spreadsheets and HMO management software across common HMO management tasks.
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-3 pr-4 font-semibold">What you’re managing</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Spreadsheet</th>
                  <th scope="col" className="py-3 pl-4 font-semibold">HMO management software</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.aspect} className="border-b border-border/70 align-top">
                    <th scope="row" className="py-3 pr-4 font-medium">{row.aspect}</th>
                    <td className="px-4 py-3 text-muted-foreground">{row.spreadsheet}</td>
                    <td className="py-3 pl-4 text-foreground/85">{row.software}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <P>
            Software’s advantage isn’t that it’s clever; it’s that the structure is already built for rooms,
            tenants and rent, and it keeps a history you didn’t have to maintain by hand. The trade-off is a
            monthly cost and a short setup. For a landlord with one room let to a friend, a spreadsheet is
            fine. For a growing portfolio, the admin usually outgrows the spreadsheet before you’d like it to.
          </P>

          <H2 id="choosing">What should you look for when choosing HMO software?</H2>
          <UL>
            <li>
              <strong>Built for rooms, not whole units.</strong> If it can’t let a room or a bed, it isn’t HMO
              software.
            </li>
            <li>
              <strong>Clear rent and arrears.</strong> Part-payments, deposits and overdue balances handled
              properly.
            </li>
            <li>
              <strong>Real multi-property support.</strong> One account, easy switching, a portfolio view.
            </li>
            <li>
              <strong>Occupancy you can act on.</strong> Voids visible at a glance.
            </li>
            <li>
              <strong>Sensible pricing.</strong> Matched to your number of properties, with a trial so you can
              test it on your own data.
            </li>
            <li>
              <strong>A UK fit.</strong> GBP pricing and terminology that matches how you actually operate.
            </li>
          </UL>
          <P>
            PulseHub is priced by the number of properties, with plans for 1, 3 or 10. There’s a 14-day free
            trial with no card, so you can test it against your own rooms and rents before deciding. You can
            compare plans on the <A href={routes.pricing}>pricing page</A>, or{' '}
            <A href={routes.contact}>contact the team</A> if you run a larger portfolio.
          </P>
        </div>

        <section className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <div className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div className="min-w-0">
                <h2 id="pulsehub-workflow" className="scroll-mt-28 font-display text-[clamp(1.55rem,3.4vw,2.35rem)] font-medium leading-tight tracking-tight">
                  How PulseHub fits the HMO workflow
                </h2>
                <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
                  PulseHub follows the way an HMO actually runs, with each step leading to the next:
                </p>
                <p className="mt-5 font-mono text-xs uppercase tracking-wide text-primary">
                  Property → Rooms &amp; beds → Tenant → Rent → Payments → Timeline → Portfolio
                </p>
                <ol className="mt-5 max-w-xl space-y-2.5 text-[1.0625rem] leading-[1.7] text-foreground/85 sm:text-lg">
                  <li><strong>Property.</strong> Set up each site.</li>
                  <li><strong>Rooms and beds.</strong> Organise the spaces inside it.</li>
                  <li><strong>Tenant.</strong> Add tenants and allocate them to rooms.</li>
                  <li><strong>Rent.</strong> Set a rent schedule for each one.</li>
                  <li><strong>Payments.</strong> Record what comes in, including part-payments and deposits.</li>
                  <li><strong>Timeline.</strong> Each tenant’s history stays in one place.</li>
                  <li><strong>Portfolio.</strong> Compare every site in one view.</li>
                </ol>
                <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
                  Every step above uses functionality that exists in PulseHub today.
                </p>
              </div>
              <figure className="mx-auto w-full max-w-[300px] shrink-0 lg:mx-0">
                <ProductScreenshot
                  src="/screenshots/member-ledger.png"
                  alt="A tenant’s member timeline in PulseHub, showing rent charged, part-payments, a deposit held, room moves and check-out notices in one record"
                  width={866}
                  height={1522}
                  frame={false}
                  sizes="300px"
                  className="shadow-[0_28px_70px_-28px_rgb(0_0_0/0.35)]"
                />
                <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground lg:text-left">
                  A tenant’s member timeline
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-12 max-w-[50rem] sm:mt-16">
          <H2 id="faq">Frequently asked questions</H2>
          <div className="mt-6">
            <FaqList items={faqs} />
          </div>

          <H2 id="start">Start managing your HMO properties with PulseHub</H2>
          <P>
            If you let by the room and you’re managing more than one property, the pattern is familiar: the
            spreadsheet grows, the WhatsApp threads multiply, and voids and arrears slip through. PulseHub
            brings rooms, tenants, rent, occupancy and maintenance into one account, with a portfolio view
            across every property. See how it fits your operation on the{' '}
            <A href={routes.hmo}>HMO management page</A>, browse{' '}
            <A href={routes.uk}>PulseHub for UK operators</A>, or start a free trial and set up your first
            property in minutes.
          </P>
          <div className="mt-6">
            <StartTrialButton
              location="other"
              size="lg"
              className="min-h-12 whitespace-normal bg-primary px-6 text-base hover:bg-primary/90"
            />
          </div>
        </div>
      </article>

      <CtaBand
        heading="Run your HMO portfolio from one platform."
        text="Start a 14-day free trial with no card required, or book a demo to see PulseHub with your HMO in mind."
      />
    </SiteShell>
  )
}
