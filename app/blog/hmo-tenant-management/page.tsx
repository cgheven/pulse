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
import { screenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('hmo-tenant-management')!
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
    question: 'What is HMO tenant management?',
    answer:
      'HMO tenant management is the day-to-day running of each tenant through their whole stay: taking their details and deposit at move-in, keeping their record current during the tenancy, handling changes such as a room move, and settling rent, utilities and the deposit at move-out. In a house of several tenancies, it is about keeping each tenant accurate and up to date, not just the property.',
  },
  {
    question: 'What information should an HMO landlord keep about tenants?',
    answer:
      'For each tenant: contact details, the room they occupy, tenancy start and end dates, the rent and payment schedule, the deposit held, documents such as the tenancy agreement and Right to Rent check, any meter readings, and a running history of payments, charges, room moves and issues raised.',
  },
  {
    question: 'How do you manage HMO tenant check-ins?',
    answer:
      'Confirm the room and bed, record the check-in date, take and record the deposit, note the opening meter reading where utilities are recharged, store the signed documents, confirm the rent amount and due date, and link the tenant to the correct property and room so everything after that attaches to the right record.',
  },
  {
    question: 'How do you manage HMO tenant check-outs?',
    answer:
      'Confirm the departure date, take a final meter reading where relevant, total any outstanding rent and utility charges, apply any legitimate deductions, settle the balance against the deposit, and record what is refunded or still owed. The room then returns to vacant and the tenant record is closed without deleting its history.',
  },
  {
    question: 'How should HMO tenant rent and deposits be tracked?',
    answer:
      'Hold the rent schedule and deposit against the individual tenant, and record every payment (including part-payments) as it arrives so the outstanding balance stays accurate. Keep the deposit separate from rent. For the detail on rent, payments and arrears, see the dedicated guide linked in this article.',
  },
  {
    question: 'What happens to a tenant record after they move out?',
    answer:
      'Keep it. The tenancy dates, payment history, documents, final settlement and room history are worth retaining in case a question or dispute comes up later, and they build a history for the room itself. Closing a tenancy should archive the record, not erase it.',
  },
  {
    question: 'When should an HMO landlord consider tenant management software?',
    answer:
      'A spreadsheet can cope with a handful of tenants in one house. Software usually earns its place once you are keeping connected information (rooms, tenants, payments, deposits, documents, meter readings and check-in and check-out records) across more tenants or more than one property, where a single source of truth saves real time.',
  },
]

const lifecycleRows = [
  { stage: 'Before move-in', manage: 'Tenant details, room and bed, tenancy dates, deposit and documents' },
  { stage: 'Move-in', manage: 'Check-in date, room confirmed, deposit, documents, opening meter reading' },
  { stage: 'During the tenancy', manage: 'Rent and payments, deposit, documents, utility charges, issues' },
  { stage: 'Changes', manage: 'Room transfers, rent changes, renewals and updated details' },
  { stage: 'Move-out', manage: 'Departure date, final readings, outstanding balances, deposit settlement, room back to vacant' },
  { stage: 'After move-out', manage: 'Final settlement, payment history, documents and room history' },
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
        { '@type': 'ListItem', position: 3, name: 'HMO tenant management', item: url },
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
    group: 'Before move-in',
    items: [
      'Tenant details and emergency contact recorded',
      'Room and bed assigned, tenancy dates set',
      'Rent, payment schedule and deposit agreed',
      'Documents and room condition captured, opening meter read',
    ],
  },
  {
    group: 'Move-in',
    items: [
      'Check-in date and deposit recorded',
      'Signed documents stored on the tenant record',
      'Tenant linked to the correct property and room',
    ],
  },
  {
    group: 'During the tenancy',
    items: [
      'Payments logged as they arrive, balance kept current',
      'Utility charges, issues and key events recorded',
      'Any change made on the record, with history preserved',
    ],
  },
  {
    group: 'Move-out',
    items: [
      'Departure date and final meter reading recorded',
      'Outstanding rent, utilities and deductions totalled',
      'Deposit settled, refund or amount owed recorded',
      'Room returned to vacant',
    ],
  },
  {
    group: 'After move-out',
    items: [
      'Tenancy dates, payments and documents retained',
      'Final settlement and room history kept as an audit trail',
    ],
  },
]

export default function HmoTenantManagementPost() {
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
            A single tenant in a single flat is easy to keep in your head. An HMO is not that. A six-bed house is
            six tenants, six sets of dates, six deposits and six people who each move in, occasionally change
            rooms, raise the odd issue and eventually leave, all on their own timeline. Manage four houses and
            you are running dozens of these little lifecycles at once.
          </P>
          <P>
            Most of the friction in running an HMO is not the big moments; it is the small records that quietly go
            missing. The move-in meter reading no one wrote down. The deposit amount you are now unsure about. The
            tenant who swapped rooms in March, so their rent no longer matches the spreadsheet. By the time
            someone moves out, the gaps show up all at once, right when you need to settle a deposit fairly.
          </P>
          <P>
            This guide to HMO tenant management walks through the tenant lifecycle stage by stage, from before a
            tenant arrives to after they leave, and sets out what to record at each point so nothing has to be
            reconstructed later. It is written for UK HMO landlords and property managers who let by the room.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>HMO tenant management is a lifecycle: before move-in, move-in, the active tenancy, changes, move-out and after move-out.</li>
              <li>Capture the details, deposit, documents and meter reading at move-in, when they are easy to get.</li>
              <li>When something changes mid-tenancy, keep the old record; a room move or rent change needs a history, not an overwrite.</li>
              <li>Move-out is where good records pay off: final readings, deductions and a fair deposit settlement.</li>
              <li>Closing a tenancy should archive the record and free the room, not delete the history.</li>
            </ul>
          </aside>

          <H2 id="what-is-it">What is HMO tenant management?</H2>
          <P>
            HMO tenant management is the work of running each tenant through their entire stay, rather than
            managing the building as a whole. Because an HMO holds several separate tenancies under one roof, the
            useful unit is the tenant in a room: their dates, their rent, their deposit, their documents and their
            history. Property management keeps the house running; tenant management keeps each person&rsquo;s record
            accurate from the day they enquire to well after they have gone.
          </P>
          <P>
            It helps to think of it as a lifecycle rather than a filing job. Each tenant moves through the same
            stages, and each stage has a small set of things worth recording. Get them at the right moment and the
            rest of the tenancy looks after itself.
          </P>

          <H2 id="lifecycle">The HMO tenant lifecycle</H2>
          <P>
            Here is the whole lifecycle at a glance. The sections that follow take each stage in turn.
          </P>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-base">
              <caption className="sr-only">The HMO tenant lifecycle and what needs to be managed at each stage.</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-3 pr-4 font-semibold">Stage</th>
                  <th scope="col" className="py-3 pl-4 font-semibold">What needs to be managed</th>
                </tr>
              </thead>
              <tbody>
                {lifecycleRows.map((row) => (
                  <tr key={row.stage} className="border-b border-border/70 align-top">
                    <th scope="row" className="py-3 pr-4 font-medium whitespace-nowrap">{row.stage}</th>
                    <td className="py-3 pl-4 text-foreground/85">{row.manage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <H2 id="before-move-in">1. Preparing for a new tenant</H2>
          <P>
            Good tenant management starts before anyone has a key. Once you have agreed to let a room, capture the
            essentials while they are fresh: the tenant&rsquo;s contact and emergency details, the specific room and
            bed they are taking, the tenancy start and end dates, the rent and its payment schedule, and the
            deposit amount. Note which documents you need (the tenancy agreement, ID and the Right to Rent check)
            and record the room&rsquo;s condition. Where you recharge utilities, take an opening meter reading now, not
            later, because a missing start reading is impossible to recreate at the end.
          </P>
          <P>
            The point of doing this up front is that everything you record afterwards, every payment and every
            issue, attaches to a record that already exists and is already correct. A waiting list is a natural
            home for this: an incoming tenant sits there with their move-in date and deposit recorded, ready to
            activate on the day they arrive.
          </P>
          <figure className="mt-8">
            <ProductScreenshot
              src={screenshots.residentsWaiting.src}
              alt={screenshots.residentsWaiting.alt}
              width={screenshots.residentsWaiting.width}
              height={screenshots.residentsWaiting.height}
              label="Waiting list · deposits before move-in"
              sizes="(max-width: 1024px) calc(100vw - 2rem), 50rem"
            />
            <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              Incoming tenants on the waiting list, with deposits recorded before move-in
            </figcaption>
          </figure>

          <H2 id="move-in">2. Managing the tenant move-in</H2>
          <P>
            Move-in day turns the plan into a live tenancy. Confirm the tenant is going into the room you assigned,
            record the check-in date, and take and record the deposit. Store the signed documents against the
            tenant rather than in a separate folder, confirm the rent amount and due date one more time, and, most
            importantly, link the tenant to the correct property and room. That link is what makes occupancy,
            rent and history line up for the rest of the stay.
          </P>
          <P>
            On deposits, most assured shorthold tenancy deposits in England must be protected in a
            government-approved scheme; the rules are on{' '}
            <A href="https://www.gov.uk/tenancy-deposit-protection">GOV.UK</A>. Recording the deposit in your own
            system is operational housekeeping, and separate from that legal duty to protect it.
          </P>

          <H2 id="active">3. Managing an active tenancy</H2>
          <P>
            During the tenancy, the tenant record becomes the single place you look when a question comes up. A
            useful record holds the tenant profile, the room and property they belong to, their rent and payment
            history, the deposit held, their documents and any utility charges, plus maintenance and issues, notes
            and the key events of the tenancy. The value is not any single field; it is that a question about a
            specific tenant is answered on one screen instead of across an inbox, a spreadsheet and a chat.
          </P>
          <P>
            In PulseHub, this lives on the resident record as a <strong>member timeline</strong>: admissions,
            rent charges, payments, deposits, room moves and issues sit in one running record, so the full picture
            of a tenant is a single look rather than a reconstruction.
          </P>

          <H2 id="changes">4. Managing changes during the tenancy</H2>
          <P>
            Tenancies rarely stay still. A tenant moves to a bigger room in the same house, the rent is reviewed at
            renewal, a fixed term rolls into a periodic tenancy, an extra charge is agreed, or a phone number
            changes. Each of these is routine, but each one has the same trap: overwriting the old value loses the
            history you may later need.
          </P>
          <P>
            A room transfer is the clearest example. When a tenant moves from Room 3 to Room 5 in March, the rent,
            the occupancy of both rooms and the tenant&rsquo;s record all have to move together, and you want the
            record to show that Room 3 was theirs until March and Room 5 after it. If you simply edit the room
            field, you cannot answer &ldquo;who was in Room 3 in February?&rdquo; six months later. Treat changes as new
            entries on the record rather than replacements, so the timeline stays honest.
          </P>

          <H2 id="payments">5. Managing tenant payments</H2>
          <P>
            Payments belong on the tenant record too: the rent schedule, the deposit held separately from rent,
            any utility charges, and a ledger that ties them to the tenant. Kept current, this is the tenant-level
            view of the money, and each tenancy&rsquo;s position stays clear instead of being pieced back together
            later.
          </P>
          <P>
            The mechanics of rent schedules, part-payments, arrears and chasing
            overdue amounts across a portfolio are a topic in their own right, so rather than repeat them here,
            see our dedicated guide to{' '}
            <A href={postPath('hmo-rent-tracking')}>HMO rent tracking, payments and arrears</A>.
          </P>

          <H2 id="maintenance">6. Managing maintenance and tenant issues</H2>
          <P>
            Issues are part of the tenancy too, and they are easiest to handle when they live on the record rather
            than in memory. When something is reported, capture the issue, the property and room it affects, its
            status, any notes, and how it was resolved, so there is a history for both you and the tenant. In a
            shared house, that record also helps when an issue affects more than one room. PulseHub logs
            maintenance and complaints with their status and history, and its complaints screen supports QR-based
            submission so a tenant can report a problem from the property itself.
          </P>

          <H2 id="move-out">7. The tenant move-out process</H2>
          <P>
            Move-out is where the whole tenancy is settled, and it is the stage most exposed by weak records. Work
            through it in order. Confirm the departure date. Take a final meter reading where you recharge
            utilities, and compare it with the opening reading you captured at move-in. Total any outstanding rent
            and utility charges, apply any legitimate deductions for damage beyond fair wear and tear, and set
            that against the deposit you are holding. What is left is either a refund to the tenant or a balance
            still owed to you, and it should be clear enough that the tenant can see how you reached it. Finally,
            return the room to vacant so it is ready to re-let, and close the tenant record without deleting its
            history.
          </P>
          <P>
            This is exactly the calculation PulseHub&rsquo;s check-out screen is built for: it takes the final meter
            reading, works out the closing charges, settles outstanding dues against the deposit, and shows the
            amount to refund or collect, then frees the room.
          </P>
          <figure className="mx-auto mt-8 w-full max-w-[300px]">
            <ProductScreenshot
              src={screenshots.checkout.src}
              alt={screenshots.checkout.alt}
              width={screenshots.checkout.width}
              height={screenshots.checkout.height}
              frame={false}
              sizes="300px"
              className="rounded-lg shadow-[0_28px_70px_-28px_rgb(0_0_0/0.35)]"
            />
            <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              Settling a tenant&rsquo;s final charges against the deposit at check-out
            </figcaption>
          </figure>

          <H2 id="after-move-out">8. What should happen to the tenant record after move-out?</H2>
          <P>
            A tenancy ending is not a reason to delete the record. Keep the tenancy dates, the payment history, the
            documents, the final settlement and the room history, so that if a question or dispute surfaces weeks
            later you can answer it from your own files. Retained records also build a history for the room itself:
            who lived there, what it let for, and how it performed over time. Closing a tenancy should archive it
            and free the room, not erase what happened.
          </P>
          <P>
            Retention periods for tenancy and financial records are a legal and tax question rather than an
            operational one, and they depend on your circumstances, so check current guidance on{' '}
            <A href="https://www.gov.uk/renting-out-a-property">GOV.UK</A> rather than relying on a rule of thumb.
            Operationally, the safe default is simple: keep the history intact.
          </P>
          <figure className="mx-auto mt-8 w-full max-w-[300px]">
            <ProductScreenshot
              src="/screenshots/member-ledger.png"
              alt="A tenant's member timeline in PulseHub, showing admissions, rent charges, payments, a deposit held and a room move retained as history"
              width={866}
              height={1522}
              frame={false}
              sizes="300px"
              className="rounded-lg shadow-[0_28px_70px_-28px_rgb(0_0_0/0.35)]"
            />
            <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              A tenant&rsquo;s history, retained after the tenancy ends
            </figcaption>
          </figure>

          <H2 id="checklist">HMO tenant management checklist</H2>
          <P>Use this as a quick audit of how you run a tenancy from start to finish.</P>
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

          <H2 id="software">HMO tenant management software: when does it become useful?</H2>
          <P>
            None of this needs software. A careful landlord with a couple of tenants in one house can run the
            whole lifecycle on a spreadsheet and a document folder. It works because everything still fits in one
            place and one head.
          </P>
          <P>
            The case for software appears when the information has to stay connected across more moving parts:
            several properties, many rooms and tenants, payments and deposits, documents, utilities, check-ins and
            check-outs, and the historical records behind all of them. At that point the job stops being data
            entry and becomes keeping everything in step, which is where a single system pays off. PulseHub is one
            example: it holds tenants against their property and room, keeps each tenant&rsquo;s history on a timeline,
            records rent, deposits and utility charges, and handles check-in and check-out, so the lifecycle in
            this guide lives in one place. You can see how it is framed for the UK on the{' '}
            <A href={routes.hmo}>HMO management software</A> page, or read the wider guide to{' '}
            <A href={postPath('hmo-management-software')}>what HMO management software is and how to choose</A>.
            If you are moving off spreadsheets across several houses, our guide to{' '}
            <A href={postPath('manage-multiple-hmo-properties-without-spreadsheets')}>
              managing multiple HMOs without spreadsheets
            </A>{' '}
            covers that transition. If you also let student rooms, the same lifecycle applies in our guide to{' '}
            <A href={postPath('student-accommodation-management')}>student accommodation management</A>.
          </P>

          <H2 id="faq">Frequently asked questions</H2>
          <div className="mt-6">
            <FaqList items={faqs} />
          </div>

          <H2 id="start">Manage your HMO tenants with PulseHub</H2>
          <P>
            Run the tenancy lifecycle well and the hard moments get easier: the deposit settles fairly because the
            readings and charges are there, the room re-lets quickly because its status is current, and a question
            months later has an answer because nothing was overwritten. If you would like to keep every tenant, from
            move-in to move-out, in one place, explore{' '}
            <A href={routes.hmo}>PulseHub for HMO operators</A>, see it for{' '}
            <A href={routes.uk}>UK operators</A>, or start a 14-day free trial. There is no card required.
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
        heading="Every tenant, from move-in to move-out, in one place."
        text="Start a 14-day free trial with no card required, or book a demo to see PulseHub with your HMO in mind."
      />
    </SiteShell>
  )
}
