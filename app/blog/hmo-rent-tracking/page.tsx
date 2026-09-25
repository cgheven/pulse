import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { StartTrialButton } from '@/components/tracked-cta'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('hmo-rent-tracking')!
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
    question: 'What is the easiest way to track HMO rent?',
    answer:
      'For one small HMO, a single spreadsheet with a row per room works. Once you run several properties, or you are dealing with part-payments and different due dates, the easiest reliable method is software built around rooms and tenants that records each payment and works out the outstanding balance for you.',
  },
  {
    question: 'How do I track rent arrears across multiple HMOs?',
    answer:
      'Record rent due and every payment against each tenant, so each room shows a live outstanding balance, then use a portfolio view to see who is behind across all properties at once. In PulseHub, the All Properties view rolls up collections and outstanding balances so arrears surface without you adding up separate spreadsheets.',
  },
  {
    question: 'Can I track HMO rent by room?',
    answer:
      'Yes, and for an HMO you should. Because each room can be a separate tenancy with its own rent and due date, rent needs tracking per room and per tenant rather than per property. PulseHub is organised as property, rooms and beds, so rent, payments and arrears are held at room and tenant level.',
  },
  {
    question: 'What should an HMO rent tracker include?',
    answer:
      'At a minimum: the tenant, property and room, the rent amount and due date, each payment received (including part-payments), the outstanding balance, the overdue amount, and a payment history you can look back on. Deposits and any extra charges belong there too.',
  },
  {
    question: 'Is HMO rent tracking software better than a spreadsheet?',
    answer:
      'It depends on scale. A spreadsheet is fine for a single small HMO. The point where software saves more time than it costs usually arrives around the second or third property, or as soon as part-payments, mixed due dates and shared editing start causing mistakes.',
  },
  {
    question: 'How can landlords keep track of overdue HMO rent?',
    answer:
      'Record payments as they arrive so balances stay current, keep a clear view of who is overdue and by how much, and check it on a regular weekly rhythm rather than at month end. Accurate, up-to-date records are what let you follow up early, before a small arrear becomes a large one.',
  },
]

const comparisonRows = [
  {
    aspect: 'Rent per room',
    spreadsheet: 'A column or row you set up and maintain by hand',
    software: 'Held per room and tenant by default',
  },
  {
    aspect: 'Part-payments',
    spreadsheet: 'A paid/unpaid cell cannot show "£450 of £900 in"',
    software: 'Each payment logged, balance updates itself',
  },
  {
    aspect: 'Outstanding balance',
    spreadsheet: 'A formula you have to get right and copy down',
    software: 'Calculated automatically per tenant',
  },
  {
    aspect: 'Arrears across properties',
    spreadsheet: 'Checked tab by tab, file by file',
    software: 'Rolled up in one portfolio view',
  },
  {
    aspect: 'Payment history',
    spreadsheet: 'Only what you remember to type in',
    software: 'Kept automatically against each tenant',
  },
  {
    aspect: 'Receipts',
    spreadsheet: 'Written or messaged separately',
    software: 'Produced from the recorded payment',
  },
  {
    aspect: 'Working as a team',
    spreadsheet: 'Risk of overwriting each other',
    software: 'Shared, with role-based access',
  },
  {
    aspect: 'Month roll-forward',
    spreadsheet: 'New tab and manual carry-over each month',
    software: 'Continuous, no rebuild',
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
      inLanguage: 'en-GB',
      articleSection: post.category,
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
        { '@type': 'ListItem', position: 3, name: 'HMO rent tracking', item: url },
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

const checklist: { group: string; items: string[] }[] = [
  {
    group: 'Set up',
    items: [
      'Every property, room and tenant recorded in one place',
      'The rent amount and due date set for each room',
      'Opening position entered: current balance, deposit held, any arrears',
    ],
  },
  {
    group: 'Record',
    items: [
      'Every payment logged when it lands, part-payments included',
      'Deposits and extra charges kept separate from rent',
      'A receipt produced for each payment',
    ],
  },
  {
    group: 'Review',
    items: [
      'A live outstanding balance for every room and tenant',
      'A weekly pass over who is overdue and by how much',
      'Collections and arrears compared across all properties',
    ],
  },
]

export default function HmoRentTrackingPost() {
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
            Rent tracking sounds like the simplest part of running an HMO, and with one property it is. You know
            who is in each room, roughly when they pay, and whether anyone is behind. The trouble is that an HMO
            is not one rent. A six-bed house is six tenancies, six rent amounts, and six due dates, and once you
            run three or four houses you are keeping thirty-odd separate rent positions in your head or in a
            spreadsheet that only you fully understand.
          </P>
          <P>
            That is where the questions get awkward. Who is actually overdue this week, and by how much? Did that
            tenant pay half now and promise the rest on the 20th, or did they pay in full late? What is the real
            outstanding balance across the whole portfolio right now, not last month? Getting these wrong is not
            just untidy; unnoticed arrears are money you have already lost the chance to chase early.
          </P>
          <P>
            This guide is for UK HMO landlords and operators who let by the room. It covers exactly what to track,
            how to build a system that survives more than one property, how to stay on top of rent arrears, and
            when it is worth moving from a spreadsheet to dedicated software.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>An HMO is many tenancies under one roof, so rent has to be tracked per room and per tenant, not per property.</li>
              <li>Track the tenant, room, rent amount, due date, every payment, the outstanding balance and the overdue amount.</li>
              <li>Part-payments and mixed due dates are what break a simple paid/unpaid spreadsheet.</li>
              <li>Record payments as they land, and the outstanding balance stays accurate instead of a month behind.</li>
              <li>The biggest win of software is an automatic balance per room and a portfolio view of arrears.</li>
            </ul>
          </aside>

          <H2 id="why-complicated">Why HMO rent tracking gets complicated</H2>
          <P>
            The complexity is not really about volume. It is that the same house holds several independent rent
            arrangements, and they rarely line up. A few things pull them out of step:
          </P>
          <UL>
            <li>
              <strong>Different rent amounts per room.</strong> An ensuite double and a small single in the same
              house are let at different rents, sometimes with bills included in one and not the other.
            </li>
            <li>
              <strong>Different due dates.</strong> Rooms are let as they fall vacant, so tenants pay on the day
              they moved in, not on a tidy shared date. One house can have payments due across the whole month.
            </li>
            <li>
              <strong>Part-payments.</strong> A tenant pays some now and the rest on payday. A single
              paid-or-unpaid marker cannot represent that, but it is completely normal in shared housing.
            </li>
            <li>
              <strong>Deposits and extra charges.</strong> Deposits, a late-payment note, a replaced key, a
              contribution to a shared bill: these sit alongside rent and are easy to muddle into the rent figure.
            </li>
            <li>
              <strong>Keeping the balance accurate.</strong> The outstanding balance is only true if every
              payment has been recorded. Fall a week behind on data entry and the number on screen is fiction.
            </li>
            <li>
              <strong>More than one property.</strong> Multiply all of the above by four houses and the honest
              answer to "how are we doing on rent?" becomes a manual tally across every file.
            </li>
          </UL>

          <H2 id="what-to-track">What HMO landlords need to track</H2>
          <P>
            Good rent tracking comes down to holding a small set of facts for every room, and keeping them
            current. For each tenancy you want to know:
          </P>
          <UL>
            <li><strong>The tenant, property and room.</strong> Who is renting which room in which house.</li>
            <li><strong>The rent amount and payment due date.</strong> What is owed and when it falls due.</li>
            <li><strong>Payments received.</strong> Each one, on the date it arrived, including part-payments.</li>
            <li><strong>The outstanding balance.</strong> Rent due minus what has been paid, kept live.</li>
            <li><strong>The overdue amount.</strong> The part of the balance that is now past its due date.</li>
            <li><strong>Deposits and other charges.</strong> Held separately so they never inflate the rent figure.</li>
            <li><strong>Payment history and notes.</strong> A record of what was paid and any arrangement agreed.</li>
          </UL>
          <P>
            The theme running through that list is room-by-room rent tracking. In an HMO the useful unit is the
            room and the tenant in it, not the building. A property-level total hides the one room that is two
            months behind.
          </P>

          <H2 id="spreadsheet">How to track HMO rent using a spreadsheet</H2>
          <P>
            A spreadsheet is a perfectly reasonable starting point, and for a single HMO it can be all you need.
            A workable layout is one row per room, with columns for the tenant, the rent, the due date, the amount
            paid and a simple formula for the balance (rent minus paid). Add a new tab each month and you have a
            basic rent ledger that costs nothing.
          </P>
          <P>
            It starts to strain in predictable places rather than all at once. Part-payments are the first: a
            single "paid" cell cannot show that £450 of a £900 rent is in and the rest is due on the 20th, so
            you end up with notes in the margins. Mixed due dates are the second: sorting who is overdue today
            means eyeballing dates by hand. Then comes the month roll-forward, where last month's arrears have to
            be carried into the new tab without dropping anyone. Add a second and third property, each in its own
            file or tab, and there is no single view of arrears across the portfolio. Share the file with a
            manager and you risk two people overwriting each other.
          </P>
          <P>
            None of this makes spreadsheets wrong. It just means the effort of keeping them accurate grows with
            the portfolio, and the cost of a small mistake (a missed part-payment, an arrear carried over wrong)
            grows with it.
          </P>

          <H2 id="system">How to track rent across multiple HMO properties</H2>
          <P>
            Whether you use a spreadsheet or software, the same simple system keeps rent under control across
            several houses. The order matters more than the tool:
          </P>
          <UL>
            <li><strong>Record each property and room.</strong> Set the structure up once so every room exists as its own line.</li>
            <li><strong>Assign each tenant to a room.</strong> Rent is owed by a person in a room, so that is where it should sit.</li>
            <li><strong>Set the rent and the due date.</strong> Per room, with any bills-included or extra-charge detail noted.</li>
            <li><strong>Record every payment when it lands.</strong> Full or partial, on the actual date, not in a monthly catch-up.</li>
            <li><strong>Let the balance and overdue flag follow.</strong> Rent due minus payments received, kept current per room, with anything past its due date flagged.</li>
          </UL>
          <P>
            The step people skip is the fourth one. Recording payments as they arrive, rather than in a monthly
            reconciliation, is the single habit that keeps every other number honest. If you want the wider weekly
            routine this fits into, our guide to{' '}
            <A href={postPath('manage-multiple-hmo-properties-without-spreadsheets')}>
              managing multiple HMO properties without spreadsheets
            </A>{' '}
            covers the full rhythm.
          </P>
          <figure className="mt-8">
            <ProductScreenshot
              src="/screenshots/all-properties.png"
              alt="PulseHub All Properties view comparing rent collected and still pending across three UK HMO properties"
              width={3024}
              height={1722}
              label="All Properties · collected and pending"
              sizes="(max-width: 1024px) calc(100vw - 2rem), 50rem"
            />
            <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              Rent collected and still pending across every property, in one view
            </figcaption>
          </figure>

          <H2 id="arrears">How to manage HMO rent arrears</H2>
          <P>
            Arrears management, and the rent collection that follows from it, is really the pay-off of good
            tracking. If your balances are accurate and current, chasing what is owed becomes routine rather than
            dramatic. A few principles do most of the work:
          </P>
          <UL>
            <li>
              <strong>Spot overdue payments quickly.</strong> The value of a live balance is that a room slipping
              behind shows up this week, not on next month's statement.
            </li>
            <li>
              <strong>Distinguish a late payment from a part-payment.</strong> "Paid in full, three days late" and
              "paid half, half still owed" need different responses, so your records should distinguish them clearly.
            </li>
            <li>
              <strong>Keep the balance accurate.</strong> Let the outstanding figure be calculated from recorded
              payments rather than re-added by hand, so the balance remains accurate if a payment dispute arises.
            </li>
            <li>
              <strong>Keep the records.</strong> A dated payment history and a record of any payment arrangement
              you agree are worth keeping if a tenancy later ends in dispute.
            </li>
            <li>
              <strong>Follow up consistently.</strong> A steady, early nudge on a small arrear works better than
              an awkward conversation about three months owed.
            </li>
          </UL>
          <P>
            What to do once rent is seriously overdue depends on the tenancy and is beyond the scope of this
            guide; it is not legal advice. The practical point is narrower: accurate, up-to-date records are what
            let you act early, and early is almost always cheaper than late.
          </P>
          <figure className="mx-auto mt-8 w-full max-w-[320px]">
            <ProductScreenshot
              src="/screenshots/member-ledger.png"
              alt="A tenant's payment history in PulseHub showing rent charged, part-payments, a deposit held and the running outstanding balance"
              width={866}
              height={1522}
              frame={false}
              sizes="320px"
              className="shadow-[0_28px_70px_-28px_rgb(0_0_0/0.35)]"
            />
            <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              A tenant's payment history and running balance
            </figcaption>
          </figure>

          <H2 id="software">What HMO rent tracking software should provide</H2>
          <P>
            If you decide a spreadsheet has run its course, judge any HMO rent tracking software on how well it
            handles the work above rather than the length of its feature list. The capabilities that actually
            matter are:
          </P>
          <UL>
            <li><strong>Room-level rent tracking.</strong> Rent held per room and tenant, not lumped at property level.</li>
            <li><strong>Tenant payment history.</strong> Every payment against each tenant, easy to look back on.</li>
            <li><strong>Automatic outstanding balances.</strong> Balances derived from recorded payments, not hand-maintained formulas.</li>
            <li><strong>Arrears visibility.</strong> A clear view of who is overdue and by how much, per room and across properties.</li>
            <li><strong>Part-payments and charges.</strong> Partial payments, deposits and extra charges handled without fudging.</li>
            <li><strong>Receipts.</strong> A record you can give a tenant for a payment made.</li>
            <li><strong>Reporting.</strong> Collections, outstanding balances and per-property performance you can actually read.</li>
            <li><strong>Multiple-property support.</strong> One account across every house, with a portfolio view.</li>
            <li><strong>Payment reminders.</strong> A prompt for tenants who are due or overdue, if that fits how you operate.</li>
            <li><strong>Access control.</strong> Role-based access so a manager sees only their sites.</li>
          </UL>

          <H2 id="vs-spreadsheets">HMO rent tracking software vs spreadsheets</H2>
          <P>
            The honest comparison is not "software good, spreadsheet bad". It is about where each one fits. A
            spreadsheet is free and flexible; software builds the structure and the maths in for you and keeps a
            history you did not have to maintain. Here is how they compare on the jobs that come up when tracking
            rent.
          </P>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-base">
              <caption className="sr-only">
                Comparison of spreadsheets and HMO rent tracking software across common rent, payment and arrears tasks.
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-3 pr-4 font-semibold">Tracking task</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Spreadsheet</th>
                  <th scope="col" className="py-3 pl-4 font-semibold">Rent tracking software</th>
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
            As a rough rule, the switch pays off around the second or third property, or the moment part-payments
            and mixed due dates start causing mistakes. For a single room let to a friend, a spreadsheet is still
            the sensible choice.
          </P>

          <H2 id="pulsehub">How PulseHub helps track HMO rent</H2>
          <P>
            PulseHub is accommodation management software organised the way an HMO actually works: property, then
            rooms and beds, then the tenant in each room. Because rent sits at room and tenant level, you track
            what is due and what has been paid per room rather than per building, which is the distinction that
            matters most for shared housing.
          </P>
          <P>
            Rent schedules, receipts, part-payments, deposits and overdue balances live on a dedicated payments
            screen. Each payment, including a partial one, is recorded against the tenant, so the outstanding
            balance stays accurate for that room and rolls up across the portfolio rather than being re-added by
            hand. Every tenant also has a{' '}
            <strong>member timeline</strong> that keeps their rent charges, payments, deposits and room moves in
            one record, so the full history for anyone is a single look.
          </P>
          <P>
            When you run more than one house, a property switcher moves you between sites and an All Properties
            view compares occupancy, collections and outstanding balances, so arrears across the portfolio are
            visible in one place instead of tab by tab. Reporting covers collections, outstanding balances and
            per-property performance. You can see the full toolset on the{' '}
            <A href={routes.features}>features page</A>, or how it works for UK operators on the{' '}
            <A href={routes.hmo}>HMO management software solution</A> page.
          </P>
        </div>

        <section className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <div className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8 lg:p-10">
            <div>
              <div className="min-w-0">
                <h2 id="pulsehub-flow" className="scroll-mt-28 font-display text-[clamp(1.55rem,3.4vw,2.35rem)] font-medium leading-tight tracking-tight">
                  Rent, from due to paid to arrears, in one place
                </h2>
                <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
                  Because every payment is recorded against the tenant, the balance and the arrears position
                  follow automatically, per room and across the portfolio:
                </p>
                <p className="mt-5 font-mono text-xs uppercase tracking-wide text-primary">
                  Rent set → Payment recorded → Balance updated → Arrears visible → Portfolio view
                </p>
                <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
                  See it in your own market on{' '}
                  <A href={routes.uk}>PulseHub for UK operators</A>, or read the companion guide,{' '}
                  <A href={postPath('hmo-management-software')}>what HMO management software is and how to choose</A>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-12 max-w-[50rem] sm:mt-16">
          <H2 id="checklist">HMO rent tracking checklist</H2>
          <P>
            Use this as a quick audit of how you track rent today. If most of it is true, arrears rarely take you
            by surprise.
          </P>
          <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-3">
              {checklist.map((section) => (
                <div key={section.group} className="min-w-0">
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{section.group}</h3>
                  <ul className="mt-3 space-y-2.5">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[1.0625rem] leading-[1.6] text-foreground/85">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <H2 id="faq">Frequently asked questions</H2>
          <div className="mt-6">
            <FaqList items={faqs} />
          </div>

          <H2 id="start">Track your HMO rent with PulseHub</H2>
          <P>
            Rent tracking goes wrong quietly: a missed part-payment here, an arrear carried over wrong there,
            until the portfolio total no longer matches reality. Keeping rent, payments and arrears at room and
            tenant level, and recording each payment as it lands, is what keeps the numbers honest. If you would
            like to see it working on your own rooms and rents, explore{' '}
            <A href={routes.hmo}>PulseHub for HMO operators</A>, compare plans on the{' '}
            <A href={routes.pricing}>pricing page</A>, or start a 14-day free trial. There is no card required.
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
        heading="Keep every room's rent and arrears in one place."
        text="Start a 14-day free trial with no card required, or book a demo to see PulseHub with your HMO portfolio in mind."
      />
    </SiteShell>
  )
}
