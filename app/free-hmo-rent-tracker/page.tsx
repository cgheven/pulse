import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowDownToLine, Check } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import SiteShell from '@/components/site-shell'
import { StartTrialButton } from '@/components/tracked-cta'
import { routes } from '@/lib/navigation'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const PATH = routes.hmoTracker
const FILE = '/downloads/hmo-rent-tracker.xlsx'

export const metadata = pageMetadata({
  title: 'Free HMO Rent Tracker Spreadsheet',
  description:
    'A free HMO rent tracker spreadsheet for UK landlords: log rent per room, see arrears and your rent roll, no email required. Works in Excel and Google Sheets.',
  path: PATH,
})

const inside = [
  { title: 'Setup', body: 'One row per room: property, room, tenant, monthly rent and deposit. Everything else reads from here.' },
  { title: 'Rent Tracker', body: 'Log what each tenant pays each month. Totals, part-payments and arrears work themselves out with built-in formulas.' },
  { title: 'Summary', body: 'Your rent roll, what you have collected, what is outstanding, your collection rate and deposits held, at a glance.' },
]

const steps = [
  'Download the file and open it in Excel, Google Sheets or Numbers.',
  'On the Setup tab, replace the example rooms with your own.',
  'Each month, enter what each tenant paid on the Rent Tracker tab.',
  'Check the Summary tab for arrears and your rent roll.',
]

const preview = [
  { property: '14 Mill Road', room: 'Room 1', tenant: 'A. Okafor', rent: '£650', paid: '£650', status: 'Up to date', tone: 'ok' },
  { property: '14 Mill Road', room: 'Room 2', tenant: 'B. Kaur', rent: '£620', paid: '£310', status: '£310 part-paid', tone: 'warn' },
  { property: '28 Bridge Street', room: 'Room 2', tenant: 'E. Reyes', rent: '£680', paid: '£0', status: '£680 overdue', tone: 'bad' },
]

const faqs = [
  {
    question: 'Is the HMO rent tracker really free?',
    answer:
      'Yes. Download it and use it, with no email required and no sign-up. It is a plain spreadsheet you own, not a trial.',
  },
  {
    question: 'Does it work in Google Sheets and Apple Numbers?',
    answer:
      'Yes. It is an Excel file (.xlsx). Open it directly in Excel, upload it to Google Sheets with File then Import, or open it in Apple Numbers. The formulas work in all three.',
  },
  {
    question: 'What is inside the spreadsheet?',
    answer:
      'Three working tabs plus a start page: Setup for your properties, rooms and tenants; Rent Tracker to log monthly payments with automatic totals and arrears; and Summary for your rent roll, collection rate, outstanding balances and deposits held.',
  },
  {
    question: 'Do you store my data if I use the tracker?',
    answer:
      'No. The file downloads to your own device and nothing is sent back to us. What you type into the spreadsheet stays with you.',
  },
  {
    question: 'How many rooms and properties does it handle?',
    answer:
      'It comes set up for a handful of rooms across two properties, and you can add rows for more. Once you are running several properties and chasing part-payments and arrears by hand, a spreadsheet starts to creak, which is where dedicated software helps.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Free HMO Rent Tracker Spreadsheet',
      url: `${SITE_URL}${PATH}`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Free HMO rent tracker', item: `${SITE_URL}${PATH}` },
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

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
      {children}
    </h2>
  )
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</p>
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
    >
      {children}
    </Link>
  )
}

function DownloadButton({ label = 'Download the free tracker' }: { label?: string }) {
  return (
    <a
      href={FILE}
      download
      className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-6 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
      <ArrowDownToLine className="h-5 w-5" aria-hidden="true" />
      {label}
    </a>
  )
}

const toneClass: Record<string, string> = {
  ok: 'bg-green-500/15 text-green-700 dark:text-green-400',
  warn: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
  bad: 'bg-red-500/15 text-red-700 dark:text-red-400',
}

export default function FreeHmoRentTrackerPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <section className="px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Free template</p>
          <h1 className="mt-3 text-balance font-display text-[clamp(2rem,4.6vw,3rem)] font-medium leading-[1.06] tracking-tight">
            Free HMO Rent Tracker Spreadsheet
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Track rent, part-payments and arrears across your HMO rooms in one tidy spreadsheet template. Log what
            each tenant pays, and see your rent roll, collection rate and who is behind, all worked out for you.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <DownloadButton />
            <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              Excel file · no email required · works in Google Sheets
            </p>
          </div>
        </div>
      </section>

      {/* Preview */}
      <section className="px-4 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" aria-hidden="true" />
            <span className="ml-2 truncate font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              HMO Rent Tracker · this month
            </span>
          </div>
          <div className="overflow-x-auto p-4 sm:p-6">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Property</th>
                  <th className="px-4 py-2 font-medium">Room</th>
                  <th className="px-4 py-2 font-medium">Tenant</th>
                  <th className="px-4 py-2 text-right font-medium">Rent</th>
                  <th className="px-4 py-2 text-right font-medium">Paid</th>
                  <th className="py-2 pl-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((row) => (
                  <tr key={row.property + row.room} className="border-b border-border/60">
                    <td className="py-3 pr-4 text-foreground/85">{row.property}</td>
                    <td className="px-4 py-3 text-foreground/85">{row.room}</td>
                    <td className="px-4 py-3 text-foreground/85">{row.tenant}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-foreground/85">{row.rent}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-foreground/85">{row.paid}</td>
                    <td className="py-3 pl-4">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${toneClass[row.tone]}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mx-auto mt-3 max-w-4xl text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          A preview. The file tracks every month and totals it for you.
        </p>
      </section>

      {/* What's inside */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <H2>What is inside</H2>
          <Lead>Three working tabs, already set up with example rooms you can overwrite.</Lead>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {inside.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{item.title}</p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <H2>How to use it</H2>
          <ol className="mt-6 space-y-3">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-3 text-base leading-relaxed text-foreground/85">
                <span className="font-mono text-sm text-primary">{String(i + 1).padStart(2, '0')}</span>
                {step}
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <DownloadButton />
          </div>
        </div>
      </section>

      {/* When you outgrow it */}
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <H2>When the spreadsheet starts to creak</H2>
          <Lead>
            A tracker like this is perfect for a room or two. As you add properties, part-payments, utilities and
            the monthly job of chasing arrears, the copying between tabs and the manual sums start to cost you time
            and the odd mistake.
          </Lead>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            PulseHub does everything this spreadsheet does, automatically: rooms and residents, rent and
            part-payments, deposits, metered utilities on one bill, and arrears across every property. See{' '}
            <A href={routes.hmo}>HMO management software</A>, read how to{' '}
            <A href="/blog/hmo-rent-tracking">track HMO rent, payments and arrears</A>, or how to{' '}
            <A href="/blog/bills-included-hmo-fair-usage">bill and split HMO utilities fairly</A>.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <StartTrialButton
              location="other"
              size="lg"
              className="min-h-12 whitespace-normal bg-primary px-6 text-base hover:bg-primary/90"
            />
            <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              14-day free trial · no card required
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.1] tracking-tight">
            Frequently asked questions
          </h2>
          <FaqList items={faqs} />
        </div>
      </section>

      <CtaBand
        heading="Start with the tracker, grow into the platform."
        text="Download the free HMO rent tracker, and when a spreadsheet is no longer enough, run rooms, rent and utilities on PulseHub. Start a 14-day free trial with no card required."
        secondaryHref={routes.hmo}
        secondaryLabel="HMO management software"
      />
    </SiteShell>
  )
}
