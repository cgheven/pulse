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

const post = getBlogPost('student-accommodation-management')!
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
    question: 'What is student accommodation management?',
    answer:
      'Student accommodation management is the day-to-day running of rooms let to students: rooms and beds, resident records, admissions and move-ins, rent and deposits, occupancy, maintenance and reporting, usually across one or more properties and organised around the academic year.',
  },
  {
    question: 'What does student accommodation management software do?',
    answer:
      'It replaces the spreadsheets and message threads with one system for rooms, residents, rent and occupancy. A good system holds a record for every resident, tracks what is paid and what is overdue, shows which beds are free, and keeps a history you did not have to maintain by hand.',
  },
  {
    question: 'How do you manage multiple student accommodation properties?',
    answer:
      'Run every property from one account rather than a file per house. PulseHub has a property switcher for moving between sites and an All Properties view that compares occupancy, collections and outstanding balances, so you can see each house and the whole portfolio without adding up tabs.',
  },
  {
    question: 'How do you track student accommodation payments?',
    answer:
      'Record rent against each resident on a schedule, log payments (including part-payments and deposits) as they arrive, and keep overdue balances visible. In PulseHub, rent, receipts, part-payments and arrears sit on a dedicated payments screen, separate from each resident’s history.',
  },
  {
    question: 'Can student accommodation software manage rooms and occupancy?',
    answer:
      'Yes. It should model the property as rooms and beds so you can allocate a resident to a specific bed, see which beds are available, and handle room changes and check-outs. PulseHub is built around properties, rooms and beds, with occupancy visible at a glance.',
  },
  {
    question: 'What should you look for in student accommodation management software?',
    answer:
      'Room and bed management, a proper resident record, clear rent and arrears, occupancy you can act on, real multi-property support, reporting and role-based access. For UK operators, GBP pricing and a free trial so you can test it on your own rooms and rents before committing.',
  },
  {
    question: 'Does PulseHub integrate with university or student-finance systems?',
    answer:
      'No. PulseHub focuses on operational records: rooms, residents, occupancy, payments, maintenance and reporting. It does not currently integrate with university admissions or student-finance systems.',
  },
]

const comparisonRows = [
  {
    aspect: 'Rooms and beds',
    spreadsheet: 'Columns you design and maintain per house',
    software: 'Property, rooms and beds built in',
  },
  {
    aspect: 'Several houses',
    spreadsheet: 'A separate tab or file per property',
    software: 'One account across every property',
  },
  {
    aspect: 'Rent and part-payments',
    spreadsheet: 'Formulas that break when rent arrives in parts',
    software: 'Tracked per resident, part-payments included',
  },
  {
    aspect: 'Occupancy and voids',
    spreadsheet: 'Counted by hand',
    software: 'Available beds visible at a glance',
  },
  {
    aspect: 'Academic-year turnover',
    spreadsheet: 'Rebuilt from scratch each year',
    software: 'Roll residents through check-out and move-in',
  },
  {
    aspect: 'Resident history',
    spreadsheet: 'Scattered across email and chat',
    software: 'One timeline per resident',
  },
  {
    aspect: 'Working as a team',
    spreadsheet: 'Risk of overwriting each other',
    software: 'Shared, with role-based access',
  },
  {
    aspect: 'Reporting',
    spreadsheet: 'Added up at term end',
    software: 'Occupancy and collections updated as you go',
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
        { '@type': 'ListItem', position: 3, name: 'Student accommodation management', item: url },
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

const checklist: { group: string; items: string[] }[] = [
  {
    group: 'Setup',
    items: [
      'Every property added, with rooms and beds mapped to the real layout',
      'Room types and rents set so the portfolio view means something',
    ],
  },
  {
    group: 'Residents',
    items: [
      'A record for each resident with documents and deposit',
      'Allocations kept current as people move in, move room or leave',
      'Applications and the waiting list tracked in one place',
    ],
  },
  {
    group: 'Money',
    items: [
      'Rent schedules set for each resident',
      'Payments recorded as they arrive, part-payments included',
      'Arrears reviewed weekly so they never drift a month behind',
    ],
  },
  {
    group: 'Operations',
    items: [
      'Maintenance and complaints logged, assigned and closed',
      'Room changes updated the day they happen',
    ],
  },
  {
    group: 'Oversight',
    items: [
      'Occupancy checked before each intake so voids are filled in time',
      'Reports reviewed monthly, per property and across the portfolio',
      'Access given by role, so managers see only their sites',
    ],
  },
]

export default function StudentAccommodationPost() {
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
            One student house is manageable on paper. You know the tenants, you remember who has paid, and the
            boiler is the only thing that surprises you. The trouble starts when there are three or four houses,
            forty-odd beds, and a September when most of them turn over in the same fortnight.
          </P>
          <P>
            Suddenly the questions get harder. Which beds are still free for the new intake? Who is a fortnight
            behind on rent? Which room did that maintenance request come from, and did anyone actually book the
            plumber? The work has not become more complicated, there is just more of it, and it is spread across
            a spreadsheet, an inbox and a group chat that no one fully trusts.
          </P>
          <P>
            This guide is for UK operators who let student accommodation by the room, whether that is a handful
            of shared houses or a purpose-built block. It covers what you actually need to keep on top of, where
            it tends to go wrong, and how the right system takes the admin out of it without pretending to run
            the business for you.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Student accommodation is managed at the room and bed level, and it lives or dies by the academic-year turnover.</li>
              <li>The core jobs are rooms and beds, resident records, rent and deposits, occupancy, maintenance and reporting.</li>
              <li>Spreadsheets cope with one house and fall apart across several, especially at part-payments and re-lets.</li>
              <li>The biggest wins are visible voids before term, accurate arrears, and one history per resident.</li>
              <li>Look for software built around rooms and beds, with real multi-property support and a trial on your own data.</li>
            </ul>
          </aside>

          <H2 id="what-is-it">What is student accommodation management?</H2>
          <P>
            Student accommodation management is the day-to-day running of rooms let to students: filling beds,
            keeping records for each resident, collecting rent and deposits, tracking who lives where, handling
            repairs, and reporting on how each property is doing. It differs from standard buy-to-let in two
            ways. You are letting by the room or bed rather than the whole property, and the whole operation is
            shaped by the academic year, with most tenancies starting and ending within the same short window.
          </P>
          <P>
            That covers a range of operators: landlords with a few student houses, letting agents managing them
            on an owner’s behalf, and teams running purpose-built student accommodation. Many student houses are
            also houses in multiple occupation, which brings its own responsibilities. If that applies to you,
            our guides to{' '}
            <A href={postPath('hmo-management-software')}>HMO management software</A> and{' '}
            <A href={postPath('manage-multiple-hmo-properties-without-spreadsheets')}>
              managing multiple HMO properties without spreadsheets
            </A>{' '}
            are useful companions, and you can check licensing rules for your area on{' '}
            <A href="https://www.gov.uk/house-in-multiple-occupation-licence">GOV.UK</A>. Software helps you run
            the property; it does not decide your legal obligations.
          </P>

          <H2 id="what-to-manage">What does a student accommodation operator need to manage?</H2>
          <P>
            Strip away the jargon and the job comes down to a handful of moving parts that all have to stay in
            step. Here is what each one looks like in practice.
          </P>

          <H3>Properties, rooms and beds</H3>
          <P>
            Everything starts with an accurate picture of the space you let. That means the property, the rooms
            inside it, and the beds inside those rooms, because a four-bed house can hold four separate
            tenancies. PulseHub is organised this way, so a bed is something you can allocate and fill, not a
            line buried inside a single tenancy. Room types matter too: a studio, an ensuite and a shared twin
            are priced and let differently.
          </P>

          <H3>Residents and the letting cycle</H3>
          <P>
            Each resident needs their own record: contact details, tenancy dates, documents, deposit and payment
            history. For UK student lets that record usually also holds the guarantor agreement and any Right to
            Rent check, kept as documents against the resident rather than in a separate file. In student
            accommodation that record moves through a predictable cycle, from enquiry and
            application, to move-in, to the occasional room change, to a notice period and check-out at the end
            of the year. PulseHub keeps it on a per-resident timeline, and tracks applications and a waiting list
            so an enquiry in July is not a scrap of paper by the time you need it in September.
          </P>

          <H3>Rent, deposits and payments</H3>
          <P>
            Rent in student housing rarely arrives as one clean monthly figure. Some pay by term, some by
            instalment, some are a fortnight late because a loan has not landed, and part-payments are normal,
            while international students often pay a term or the whole year up front. You need to see what is
            due, what has been paid and what is outstanding, per resident, without
            rebuilding it each month. Deposits sit alongside that and usually need protecting in a
            government-backed scheme; you can read the rules on{' '}
            <A href="https://www.gov.uk/tenancy-deposit-protection">GOV.UK</A>. PulseHub records rent schedules,
            receipts, part-payments, deposits and overdue balances on a dedicated payments screen, so the money
            stays clean and separate from the resident’s wider history.
          </P>

          <H3>Occupancy, maintenance and records</H3>
          <P>
            An empty bed earns nothing, and in student lettings a bed empty in October may stay empty until the
            next academic year. Knowing your occupancy, which beds are taken, free or allocated, is what lets
            you plan re-lets and viewings before the income stops. Repairs and complaints need logging and
            closing out with a record of what was done, and you will want a way to keep documents and send the
            occasional announcement to a house. PulseHub covers occupancy, records maintenance and complaints
            with their status and history, and its complaints screen supports QR-based submission so a resident
            can report an issue from the property.
          </P>

          <H3>Reporting across the portfolio</H3>
          <P>
            Finally, you need to answer two questions without a weekend of spreadsheet work: how is this property
            doing, and how is the portfolio doing? Useful reporting covers occupancy, rent collected,
            outstanding balances and per-property performance. You can see the full set of tools on the{' '}
            <A href={routes.features}>features page</A>.
          </P>

          <H2 id="why-hard">Why student accommodation becomes difficult to manage</H2>
          <P>The problems that push operators off spreadsheets tend to be the same ones:</P>
          <UL>
            <li>
              <strong>Everything turns over at once.</strong> A portfolio that is calm in February becomes a
              scramble at the start of the academic year, when dozens of check-outs and move-ins land in the
              same few weeks.
            </li>
            <li>
              <strong>Rent that does not line up.</strong> Term-time instalments, late loans and part-payments
              mean a single paid or unpaid column stops telling the truth quickly.
            </li>
            <li>
              <strong>Voids you cannot see.</strong> Across several houses it is easy to lose track of which beds
              are free and from when, and an unfilled bed in autumn is a long, expensive gap.
            </li>
            <li>
              <strong>Room changes mid-year.</strong> Someone swaps rooms in November and the rent, the deposit
              and the occupancy all have to move with them.
            </li>
            <li>
              <strong>History no one can find.</strong> The tenancy PDF is in email, the rent is in a
              spreadsheet, the repair is in a chat, and the deposit is in your head.
            </li>
            <li>
              <strong>No shared, trusted view.</strong> When a colleague updates their copy of the spreadsheet,
              yours is already out of date.
            </li>
          </UL>
          <P>
            On their own, each of these is a minor annoyance. Stacked across several houses and squeezed into a
            few weeks of turnover, they are how a good student portfolio quietly loses income.
          </P>

          <H2 id="manage-efficiently">How to manage student accommodation more efficiently</H2>
          <P>
            The fix is less about working harder in September and more about keeping a steady rhythm the rest of
            the year. A workable approach looks like this:
          </P>
          <UL>
            <li>
              <strong>Keep one record per resident.</strong> Put contact details, documents, deposit and
              payments in one place so you are never reconstructing a tenancy from your inbox.
            </li>
            <li>
              <strong>Watch occupancy on a schedule.</strong> A short weekly sweep of available beds catches
              voids while there is still time to re-let, especially in the run-up to a new intake.
            </li>
            <li>
              <strong>Record payments as they happen.</strong> Log part-payments the day they arrive so arrears
              are current rather than a month stale.
            </li>
            <li>
              <strong>Close the loop on maintenance.</strong> Log every issue, assign it, and mark it done, so
              nothing lives only in someone’s memory.
            </li>
          </UL>
          <P>
            None of this is glamorous, but it is the difference between a September you plan for and one you
            survive.
          </P>

          <H2 id="vs-spreadsheets">Student accommodation software vs spreadsheets</H2>
          <P>
            A spreadsheet is free, flexible and familiar, and for a single house it can be all you need. The
            picture changes as you add properties, beds and part-payments, and as the whole thing turns over
            each year. Here is how the two compare on the jobs that come up most.
          </P>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-base">
              <caption className="sr-only">
                Comparison of spreadsheets and student accommodation management software across common tasks.
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-3 pr-4 font-semibold">What you’re managing</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Spreadsheet</th>
                  <th scope="col" className="py-3 pl-4 font-semibold">Management software</th>
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
            The real difference shows up at the ends of the year. A spreadsheet has to be rebuilt every time the
            cohort turns over, and every re-let, room swap and part-payment is a manual edit someone has to
            remember. Software already knows the property as rooms and beds and simply rolls residents through
            check-out and move-in, keeping the history without you retyping it. That is worth a monthly fee once
            you are past a single house. For one shared house let to friends, a spreadsheet is still the
            sensible choice.
          </P>

          <H2 id="what-to-look-for">What to look for in student accommodation management software</H2>
          <P>
            Good student accommodation property management keeps rooms, residents and rent in step. Whether a
            tool is sold as student housing management software or a student accommodation management system,
            judge it on how well it handles the jobs in this guide rather than the length of its feature list:
          </P>
          <UL>
            <li>
              <strong>Built for rooms and beds.</strong> If it cannot let a room or a bed, it is not the right
              tool for shared student housing.
            </li>
            <li>
              <strong>A proper resident record.</strong> Documents, deposit and payment history in one place,
              ideally as a single timeline you can scan.
            </li>
            <li>
              <strong>Clear rent and arrears.</strong> Part-payments, deposits and overdue balances handled
              without heroics.
            </li>
            <li>
              <strong>Occupancy you can act on.</strong> Available beds surfaced clearly, so voids show up
              before term does.
            </li>
            <li>
              <strong>Real multi-property support.</strong> One account, easy switching between houses, and a
              portfolio view that compares them.
            </li>
            <li>
              <strong>Reporting and access control.</strong> Enough reporting to catch a problem early, and
              role-based access for the people who run each site.
            </li>
            <li>
              <strong>A UK fit and a trial.</strong> GBP pricing, familiar terminology, and a free trial so you
              can try it against your own properties before you commit.
            </li>
          </UL>

          <H2 id="pulsehub">How PulseHub helps student accommodation operators</H2>
          <P>
            PulseHub is accommodation management software for operators who run rooms rather than whole units,
            which is exactly how student housing works. It is organised around properties, rooms and beds, so you
            allocate residents to a specific bed and keep occupancy current as people move in, swap rooms and
            leave. Each resident has a record, and their history, from admission through charges, payments,
            deposits, room changes and check-out, sits on a single{' '}
            <strong>member timeline</strong>, so a question about any resident is answered on one screen.
          </P>
          <P>
            On the money side, rent schedules, receipts, part-payments, deposits and overdue balances live on a
            dedicated payments screen. When you run more than one house, a property switcher moves you between
            sites and an All Properties view compares occupancy, collections and outstanding balances across the
            portfolio. Maintenance and complaints are logged with their status and history, and reporting gives
            you per-property and portfolio figures without rebuilding it by hand. Every property also gets a
            free public page where students can see available rooms, beds, rent and amenities and enquire or join
            the waitlist, which feeds straight back into your applications.
          </P>
        </div>

        <section className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <div className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div className="min-w-0">
                <h2 id="pulsehub-workflow" className="scroll-mt-28 font-display text-[clamp(1.55rem,3.4vw,2.35rem)] font-medium leading-tight tracking-tight">
                  How PulseHub fits the student letting cycle
                </h2>
                <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
                  PulseHub follows the way a student property actually runs, with each step leading to the next:
                </p>
                <p className="mt-5 font-mono text-xs uppercase tracking-wide text-primary">
                  Property → Rooms &amp; beds → Resident → Rent → Payments → Timeline → Portfolio
                </p>
                <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">
                  You can see it framed for your market on the{' '}
                  <A href={routes.student}>student accommodation management software</A> page and{' '}
                  <A href={routes.uk}>PulseHub for UK operators</A>.
                </p>
              </div>
              <figure className="mx-auto w-full max-w-[300px] shrink-0 lg:mx-0">
                <ProductScreenshot
                  src="/screenshots/member-ledger.png"
                  alt="A student resident’s member timeline in PulseHub, showing rent charged, part-payments, a deposit held, a room change and check-out notices in one record"
                  width={866}
                  height={1522}
                  frame={false}
                  sizes="300px"
                  className="shadow-[0_28px_70px_-28px_rgb(0_0_0/0.35)]"
                />
                <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground lg:text-left">
                  A resident’s member timeline
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-12 max-w-[50rem] sm:mt-16">
          <H2 id="checklist">A practical student accommodation management checklist</H2>
          <P>
            Use this as a quick audit of your own operation. If you can tick most of it, the turnover weeks will
            feel a lot less like firefighting.
          </P>
          <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
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

          <H2 id="start">Running student accommodation with PulseHub</H2>
          <P>
            Student accommodation is not hard to understand, it is just relentless to keep in order, and the
            pressure lands all at once when the academic year turns. Keeping rooms, residents, rent and occupancy
            in one place is what turns that scramble into a routine. If you would like to see how it fits your
            houses, explore{' '}
            <A href={routes.student}>PulseHub for student accommodation</A>, compare plans on the{' '}
            <A href={routes.pricing}>pricing page</A>, or start a 14-day free trial and set up your first
            property. There is no card required.
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
        heading="Run your student accommodation from one platform."
        text="Start a 14-day free trial with no card required, or book a demo to see PulseHub with your properties in mind."
      />
    </SiteShell>
  )
}
