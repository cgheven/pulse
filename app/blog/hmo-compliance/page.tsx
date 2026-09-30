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

const post = getBlogPost('hmo-compliance')!
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
    question: 'What is HMO compliance?',
    answer:
      'HMO compliance is meeting the legal and safety requirements that apply to a house in multiple occupation, and keeping the records that show you have. It is broader than holding a licence: it covers safety checks such as gas and electrical inspections, working alarms, fire safety, the condition of the property, and the duties in the HMO management regulations. Exactly which rules apply depends on the property, its occupancy and the local council.',
  },
  {
    question: 'Do all HMOs need a licence?',
    answer:
      'Not automatically. In England a large HMO (rented to five or more people forming more than one household who share facilities) needs a mandatory licence. Smaller HMOs may also need one where the council runs an additional licensing scheme, so you have to check with your local authority. Rules and licensing differ elsewhere in the UK.',
  },
  {
    question: 'What records should an HMO landlord keep?',
    answer:
      'Typically: licence details and conditions, the gas safety record where there is gas, the electrical inspection report (EICR), fire safety and alarm records, an Energy Performance Certificate, who occupies each room and when, and a history of repairs and inspections with dates. Keeping these organised, with their renewal dates, is most of the day-to-day work of staying on top of compliance.',
  },
  {
    question: 'How often does an HMO need safety checks?',
    answer:
      'The common ones in England: a gas safety check every 12 months by a Gas Safe registered engineer where there is gas, and an electrical installation inspection (EICR) at least every 5 years. Smoke alarms must be on each storey with living accommodation and carbon monoxide alarms in rooms with a fixed combustion appliance (except gas cookers), kept working. Licence conditions can add more, so confirm the current rules on GOV.UK and with your council.',
  },
  {
    question: 'Do HMO requirements vary by council?',
    answer:
      'Yes. Beyond national rules, local authorities can run additional or selective licensing schemes and set their own HMO amenity standards, such as minimum room sizes and facilities. Two properties in different areas can face different requirements, which is why you should check the rules for every area you operate in.',
  },
  {
    question: 'What happens if an HMO certificate expires?',
    answer:
      'An expired certificate, such as a gas record or EICR that has run past its date, means the property may no longer meet the requirement it evidences, and you would need to arrange the check and obtain a current record. The practical fix is to track renewal dates and act before they pass. This is general information, not legal advice; confirm the consequences and any enforcement position with your local authority.',
  },
  {
    question: 'Can HMO management software help with compliance?',
    answer:
      'It can help with the organisation side: keeping property, room and tenant records, occupancy, maintenance history and documents in one place instead of scattered across spreadsheets, folders and email. It does not carry out inspections, replace qualified professionals, or make a property compliant on its own. Meeting the applicable requirements remains the landlord or manager’s responsibility.',
  },
  {
    question: 'Does PulseHub provide legal compliance advice?',
    answer:
      'No. PulseHub is a management and record-keeping platform, not a legal adviser. It helps you organise the records, documents and history involved in running an HMO. Landlords should verify the requirements that apply to their property with the relevant local authority and official government guidance.',
  },
]

const checklistRows = [
  { item: 'HMO licence', timing: 'Where required (all large HMOs; others depending on the council)', record: 'Licence document, its conditions and expiry date' },
  { item: 'Gas safety', timing: 'Every 12 months, where there is gas', record: 'Gas safety record, shared with tenants' },
  { item: 'Electrical (EICR)', timing: 'At least every 5 years', record: 'EICR report, shared with tenants' },
  { item: 'Fire safety', timing: 'Reviewed regularly and when circumstances change', record: 'Fire risk assessment and fire-safety measures, where applicable' },
  { item: 'Fire detection / alarms', timing: 'In place and working; checked and repaired when reported', record: 'Alarm locations and checks (smoke and carbon monoxide, where required)' },
  { item: 'Energy performance (EPC)', timing: 'Valid EPC (10 years); minimum energy efficiency rules apply', record: 'EPC certificate' },
  { item: 'Property inspections', timing: 'As you decide; licence conditions may require them', record: 'Inspection notes, findings and dates' },
  { item: 'Repairs & maintenance', timing: 'Ongoing', record: 'What was reported, the action taken and anything outstanding' },
  { item: 'Tenancy & occupancy', timing: 'Ongoing; a licence may cap occupancy', record: 'Who occupies which room, the dates and documents' },
  { item: 'Local authority requirements', timing: 'Check with your council', record: 'Additional licensing, amenity standards and any conditions' },
]

const licenceSteps = ['5 or more occupants', 'More than one household', 'Shared facilities', 'Check HMO licensing']

const withoutSoftware = ['Certificate arrives by email', 'Saved to a folder', 'Date typed into a spreadsheet', 'Reminder set in a calendar', 'Chased manually when it is due', 'Spreadsheet updated after the fact']
const withPulseHub = ['Each property held as a record', 'Rooms and tenants linked to it', 'Documents kept on the record', 'Maintenance and complaints logged with status', 'A portfolio view across every property', 'An activity history you did not have to keep by hand']

const checklistItems = [
  'HMO licence details recorded',
  'Licence expiry date tracked',
  'Gas safety documentation recorded (where there is gas)',
  'Electrical inspection (EICR) documentation recorded',
  'Fire safety and alarm records organised',
  'EPC information recorded',
  'Property inspection records maintained',
  'Repairs and maintenance history recorded',
  'Local authority requirements checked for each area',
  'Upcoming deadlines reviewed',
]

const exampleRecords: { label: string; status: 'green' | 'amber' | 'red' }[] = [
  { label: 'Gas safety record', status: 'green' },
  { label: 'EICR', status: 'green' },
  { label: 'Fire safety inspection', status: 'amber' },
  { label: 'Fire risk assessment', status: 'red' },
  { label: 'EPC', status: 'green' },
]

const statusDot: Record<'green' | 'amber' | 'red', string> = { green: '🟢', amber: '🟡', red: '🔴' }

const sources = [
  { label: 'Houses in multiple occupation: licensing (GOV.UK)', href: 'https://www.gov.uk/house-in-multiple-occupation-licence' },
  { label: 'Renting out a property: landlord responsibilities (GOV.UK)', href: 'https://www.gov.uk/renting-out-a-property' },
  { label: 'Private renting: houses in multiple occupation (GOV.UK)', href: 'https://www.gov.uk/private-renting/houses-in-multiple-occupation' },
  { label: 'Gas safety for landlords (HSE)', href: 'https://www.hse.gov.uk/gas/landlords/index.htm' },
  { label: 'Electrical safety standards in the private rented sector (GOV.UK)', href: 'https://www.gov.uk/government/publications/electrical-safety-standards-in-the-private-rented-sector-guidance-for-landlords-tenants-and-local-authorities/guide-for-landlords-electrical-safety-standards-in-the-private-rented-sector' },
  { label: 'Smoke and carbon monoxide alarm rules (GOV.UK)', href: 'https://www.gov.uk/government/publications/smoke-and-carbon-monoxide-alarms-explanatory-booklet-for-landlords/the-smoke-and-carbon-monoxide-alarm-england-regulations-2015-qa-booklet-for-the-private-rented-sector-landlords-and-tenants' },
  { label: 'Energy Performance Certificates (GOV.UK)', href: 'https://www.gov.uk/buy-sell-your-home/energy-performance-certificates' },
  { label: 'The Management of Houses in Multiple Occupation (England) Regulations 2006 (legislation.gov.uk)', href: 'https://www.legislation.gov.uk/uksi/2006/372/contents/made' },
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
        { '@type': 'ListItem', position: 3, name: 'HMO compliance in England', item: url },
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

export default function HmoCompliancePost() {
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
          <p className="mt-1 font-mono text-xs uppercase tracking-wide text-muted-foreground">
            Last reviewed <time dateTime={post.dateModified}>{formatBlogDate(post.dateModified)}</time>
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
            Running one HMO, compliance is a short mental checklist: the licence, the gas record, the alarms, the
            odd repair. Running several, it becomes a scatter of certificates in email, renewal dates in a
            calendar, inspection notes in a folder and repairs in a message thread. The requirements have not
            changed; there are just more of them, spread across more properties, and the day a certificate lapses
            is rarely the day you meant to check.
          </P>
          <P>
            This guide sets out what an HMO operator in England should keep track of to stay organised and support
            compliance: whether the property needs a licence, the records and certificates that matter, the local
            authority layer, and how to keep it all in order as a portfolio grows.
          </P>

          <aside className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Important</p>
            <p className="mt-2 text-[1.0625rem] leading-[1.7] text-foreground/85">
              HMO requirements can vary depending on the property, licence and local authority. This guide is
              intended as a practical overview, not legal advice. Always check the requirements that apply to your
              property with the relevant local authority and official government guidance. Rules and licensing also
              differ across the UK.
            </p>
          </aside>

          <aside className="mt-8 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Compliance is broader than a licence: it also covers safety checks, alarms, fire safety, condition and record-keeping.</li>
              <li>Which rules apply depends on the property, its occupancy and the local council, so check both GOV.UK and your authority.</li>
              <li>The records that matter most carry dates: the licence, gas (yearly), electrical (at least every 5 years), alarms and the EPC.</li>
              <li>Local authorities can add licensing and standards, so it helps to track compliance property by property.</li>
              <li>Software can organise those records and dates; it does not make a property compliant or replace inspections.</li>
            </ul>
          </aside>

          <H2 id="what-it-involves">What HMO compliance actually involves</H2>
          <P>
            It is easy to treat the licence as the whole job. In practice the licence is one part of it. Compliance
            is the wider set of duties that come with letting a shared property: keeping it safe, keeping the
            required certificates current, meeting the standards in the{' '}
            <A href="https://www.gov.uk/renting-out-a-property/landlord-responsibilities">landlord responsibilities</A> and, for HMOs, the{' '}
            <A href="https://www.legislation.gov.uk/uksi/2006/372/contents/made">management regulations</A>, and
            being able to show the records that prove it. A property can hold a valid licence and still fall short
            if an alarm is missing or a gas check has lapsed. The useful way to think about it is by category: the
            licence and property records, the safety checks and certificates, who occupies the property, and the
            condition and maintenance history.
          </P>

          <H2 id="licence">Does my HMO need a licence?</H2>
          <P>
            In England, a large HMO always needs a mandatory licence. The general test is straightforward, and it
            is worth checking against your property first:
          </P>
          <ol className="mt-6 grid gap-3 sm:grid-cols-4">
            {licenceSteps.map((step, index) => (
              <li key={step} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 sm:flex-col sm:items-start sm:gap-2">
                <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-[15px] font-medium leading-snug text-foreground/90">{step}</span>
              </li>
            ))}
          </ol>
          <P>
            Put simply, a property let to five or more people who form more than one household and share a kitchen,
            bathroom or toilet is a large HMO and needs a licence. Smaller HMOs are not automatically exempt:
            councils can run additional licensing schemes that bring smaller shared properties into scope, and the
            conditions attached to a licence vary too. Confirm what applies on the{' '}
            <A href="https://www.gov.uk/house-in-multiple-occupation-licence">GOV.UK licence guidance</A> and with
            your local authority, rather than assuming one rule covers your whole portfolio.
          </P>

          <H2 id="records">Which records should an HMO landlord track?</H2>
          <P>
            Most of the day-to-day work is keeping a small set of records current, each with a date or a trigger
            attached. The table below is a practical tracking framework, not a statement of what the law requires
            for your specific property: exactly what applies depends on the property, its occupancy and your
            council, and licence conditions can add more. Treat timings as typical for England and confirm them at
            the sources linked later.
          </P>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-base">
              <caption className="sr-only">A practical HMO compliance tracking framework: item, typical timing and the record to keep.</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-3 pr-4 font-semibold">Compliance item</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Typical timing or trigger</th>
                  <th scope="col" className="py-3 pl-4 font-semibold">Record to keep</th>
                </tr>
              </thead>
              <tbody>
                {checklistRows.map((row) => (
                  <tr key={row.item} className="border-b border-border/70 align-top">
                    <th scope="row" className="py-3 pr-4 font-medium">{row.item}</th>
                    <td className="px-4 py-3 text-muted-foreground">{row.timing}</td>
                    <td className="py-3 pl-4 text-foreground/85">{row.record}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 rounded-xl border border-border bg-muted/40 p-5">
            <p className="text-[15px] font-medium text-foreground">In a tracker, each item also carries a status:</p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-foreground/85">
              <li>🟢 Current</li>
              <li>🟡 Action required</li>
              <li>🔴 Overdue or needs attention</li>
            </ul>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              A simple status per item is what turns a list of records into something you can scan and act on.
            </p>
          </div>

          <H2 id="licensing">Licensing and property records</H2>
          <P>
            Where a licence applies, keep the essentials in one place: the licence number and the property it
            covers, the conditions attached to it, the issue and expiry dates, and the evidence the council asked
            for. A licence lasts up to five years, so a renewal date belongs on your calendar well before it
            lapses. Because occupancy limits are often a licence condition, the licence and the occupancy records
            are worth keeping side by side.
          </P>

          <H2 id="safety">Safety checks and certificates</H2>
          <P>
            These are the records auditors and tenants ask about, and the ones with dates that catch operators
            out. For the current rules, go to the source: gas safety on the{' '}
            <A href="https://www.hse.gov.uk/gas/landlords/index.htm">HSE landlords&rsquo; pages</A> (a check every 12
            months where there is gas), the{' '}
            <A href="https://www.gov.uk/government/publications/electrical-safety-standards-in-the-private-rented-sector-guidance-for-landlords-tenants-and-local-authorities/guide-for-landlords-electrical-safety-standards-in-the-private-rented-sector">
              electrical safety standards
            </A>{' '}
            (an EICR at least every five years), the{' '}
            <A href="https://www.gov.uk/government/publications/smoke-and-carbon-monoxide-alarms-explanatory-booklet-for-landlords/the-smoke-and-carbon-monoxide-alarm-england-regulations-2015-qa-booklet-for-the-private-rented-sector-landlords-and-tenants">
              smoke and carbon monoxide alarm rules
            </A>, and{' '}
            <A href="https://www.gov.uk/buy-sell-your-home/energy-performance-certificates">Energy Performance Certificates</A>.
            Fire safety in an HMO goes beyond alarms, from fire doors to escape routes, and the{' '}
            <A href="https://www.gov.uk/private-renting/houses-in-multiple-occupation">standards for a large HMO</A>{' '}
            can be set by your council, so treat it as its own area and confirm locally.
          </P>

          <H2 id="occupancy">Tenancy and occupancy records</H2>
          <P>
            Compliance is not only about the building; it is also about who lives in it. Licence conditions often
            limit how many people may occupy a property or a room, so it matters to know who is in which room and
            when. Keep the occupancy picture current: the tenants in each room, their move-in and move-out dates,
            and changes such as room moves. This is the tenant side of the operation rather than the compliance
            side, and we cover it in full in our guides to{' '}
            <A href={postPath('hmo-tenant-management')}>HMO tenant management</A> and{' '}
            <A href={postPath('hmo-rent-tracking')}>HMO rent tracking, payments and arrears</A>.
          </P>

          <H2 id="maintenance">Condition, repairs and maintenance records</H2>
          <P>
            The condition of a property is where compliance and everyday operations meet. Routine inspections catch
            issues early, and a clear maintenance history is the evidence that you acted on them. For each issue, it
            is worth recording what was reported and when, which room or property it affects, the action taken, who
            did the work, and whether anything is still outstanding. Kept consistently, that history answers most
            condition questions without a search through messages, and it shows a pattern of upkeep rather than a
            scramble after the fact.
          </P>

          <H2 id="calendar">Important dates and a compliance calendar</H2>
          <P>
            If one habit prevents most compliance slips, it is keeping the dates in one place. Certificates and
            licences expire on their own schedule, and across several properties those dates rarely line up. A
            simple compliance calendar, with a reminder ahead of each one, covers the essentials: the gas check each
            year, the electrical inspection on its five-year cycle, the EPC, the licence renewal, and any follow-up
            actions from an inspection or a report. The aim is to act before a date passes, not to discover it
            afterwards.
          </P>

          <H2 id="multiple">Why HMO compliance gets hard across multiple properties</H2>
          <P>
            One property is manageable by memory. The difficulty is multiplication. Each property has its own
            licence, its own certificates on their own dates, its own occupancy and its own repair history, and by
            default each ends up in a different place. Nothing is wrong with any one of them, but together they
            fragment, and the gap between them is where a lapsed certificate hides. Moving off that sprawl is a
            theme in itself, which we cover in{' '}
            <A href={postPath('manage-multiple-hmo-properties-without-spreadsheets')}>
              managing multiple HMOs without spreadsheets
            </A>.
          </P>

          <H2 id="local-authority">Local authority requirements</H2>
          <P>
            HMO compliance is not only national rules. Local authorities can introduce additional licensing, attach
            their own conditions, and set amenity standards such as minimum room sizes and shared facilities. The
            practical consequence is that it helps to track compliance at the property level, because two
            properties in different areas can carry different requirements. Here is an illustrative example of what
            a property-level view can look like.
          </P>
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">Illustrative example, not actual legal requirements</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dl className="space-y-3 text-[15px]">
                  <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Property</dt><dd className="font-medium text-foreground">25 Example Street</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Council</dt><dd className="font-medium text-foreground">Example Council</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-muted-foreground">HMO licence</dt><dd className="font-medium text-foreground">Valid</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Licence expiry</dt><dd className="font-medium text-foreground">14 March 2028</dd></div>
                </dl>
              </div>
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">Compliance records</p>
                <ul className="mt-3 space-y-2 text-[15px] text-foreground/85">
                  {exampleRecords.map((rec) => (
                    <li key={rec.label} className="flex items-center gap-2.5">
                      <span aria-hidden="true">{statusDot[rec.status]}</span>
                      {rec.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <H2 id="software">Can HMO management software help with compliance?</H2>
          <P>
            It can help with the part that is really an organisation problem. Software can hold your property and
            room records, who occupies them, the maintenance and complaints history, the documents attached to a
            tenancy, an activity history, and reporting across every property, so the operational evidence lives in
            one place instead of five. Some systems also let you record important dates and set reminders against
            them.
          </P>
          <P>
            What it cannot do is more important to be clear about. Software does not make a property compliant by
            itself. It does not carry out a gas or electrical inspection, replace a qualified professional, satisfy
            a licensing requirement, or decide which rules apply to your property. Understanding and meeting the
            applicable requirements remains the landlord or manager&rsquo;s responsibility; software just removes the
            excuse of not being able to find the records.
          </P>

          <H2 id="comparison">Without a system vs with PulseHub</H2>
          <P>
            The difference is not the work; it is where the work lives. On the left is the familiar path a single
            certificate takes when everything is manual. On the right is how the same records sit when a property is
            managed in one place.
          </P>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-muted/30 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Without a system</p>
              <ol className="mt-4 space-y-2.5 text-[15px] text-foreground/80">
                {withoutSoftware.map((step) => (
                  <li key={step} className="border-l-2 border-border pl-3">{step}</li>
                ))}
              </ol>
            </div>
            <div className="rounded-2xl border-2 border-primary bg-card p-6 shadow-lg shadow-primary/10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">With PulseHub</p>
              <ol className="mt-4 space-y-2.5 text-[15px] text-foreground/85">
                {withPulseHub.map((step) => (
                  <li key={step} className="border-l-2 border-primary/40 pl-3">{step}</li>
                ))}
              </ol>
            </div>
          </div>

          <H2 id="pulsehub">How PulseHub fits into the HMO compliance workflow</H2>
          <P>
            PulseHub is accommodation management software, so it sits on the operational side of this guide rather
            than the legal side. It helps landlords organise and track the records, documents and history involved
            in running an HMO, in one place instead of scattered spreadsheets and folders. In practice you can use
            it to:
          </P>
          <UL>
            <li>Keep each property, with its rooms and beds, as a single record.</li>
            <li>Keep a record for every tenant and who occupies which room, with documents on the record.</li>
            <li>Log maintenance and complaints with their status and history, including QR-based submission so a resident can report an issue from the property.</li>
            <li>See occupancy against the property, which matters where a licence caps how many people may live there.</li>
            <li>Compare properties in one portfolio view, with an activity history you did not have to keep by hand.</li>
          </UL>
          <P>
            To be clear about the boundary: PulseHub helps organise and track compliance-related records; it does
            not make a property compliant, provide legal advice, satisfy licensing requirements, or replace
            inspections or qualified professionals. You can see the wider platform on the{' '}
            <A href={routes.hmo}>HMO management software</A> page and how it is set up for{' '}
            <A href={routes.uk}>UK operators</A>, or read the companion guide to{' '}
            <A href={postPath('hmo-management-software')}>what HMO management software is and how to choose</A>.
          </P>

          <H2 id="checklist">HMO compliance tracking checklist</H2>
          <P>
            Use this to sense-check how organised your records are. It is an organisation aid, not a statement of
            what the law requires for your specific property; confirm that with your local authority.
          </P>
          <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <ul className="grid gap-3 sm:grid-cols-2">
              {checklistItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[1.0625rem] leading-[1.6] text-foreground/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border bg-card">
                    <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <H2 id="faq">Frequently asked questions</H2>
          <div className="mt-6">
            <FaqList items={faqs} />
          </div>

          <H2 id="start">Keep your HMO records organised in one place</H2>
          <P>
            Managing multiple HMOs becomes easier when property, tenant and maintenance records are organised in one
            place, with the history and dates you need already there. PulseHub will not make a property compliant
            for you, but it helps keep the operational records that support it out of scattered folders and
            spreadsheets. Explore{' '}
            <A href={routes.hmo}>PulseHub for HMO operators</A>, or start a 14-day free trial. There is no card
            required.
          </P>
          <div className="mt-6">
            <StartTrialButton
              location="other"
              size="lg"
              className="min-h-12 whitespace-normal bg-primary px-6 text-base hover:bg-primary/90"
            />
          </div>

          <H2 id="sources">Sources and further reading</H2>
          <P>Official sources for the requirements referenced above. Always check the current version and your local authority.</P>
          <UL>
            {sources.map((source) => (
              <li key={source.href}>
                <A href={source.href}>{source.label}</A>
              </li>
            ))}
          </UL>
        </div>
      </article>

      <CtaBand
        heading="Keep your HMO records, deadlines and history in one place."
        text="Track property records, compliance documents, inspections, repairs and important information without relying on scattered spreadsheets and folders."
        secondaryHref={routes.hmo}
        secondaryLabel="Explore PulseHub"
      />
    </SiteShell>
  )
}
