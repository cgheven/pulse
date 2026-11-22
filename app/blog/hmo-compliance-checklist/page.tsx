import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { screenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('hmo-compliance-checklist')!
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
    question: 'What is on an HMO compliance checklist?',
    answer:
      'The core items in England are: the HMO licence and its conditions where one is required; a gas safety check every 12 months where there is gas; an electrical installation inspection (EICR) at least every 5 years; fire safety, including a fire risk assessment and working smoke and carbon monoxide alarms; a valid Energy Performance Certificate (EPC); and the room and amenity standards set by your council. You also keep records of who occupies each room, inspections and repairs. Which rules apply depends on the property and the local authority.',
  },
  {
    question: 'Do all HMOs need a licence?',
    answer:
      'Not automatically. In England a large HMO, rented to five or more people forming more than one household who share facilities, needs a mandatory licence. Smaller HMOs may still need one where the council runs an additional or selective licensing scheme, so you have to check with your local authority for every area you operate in.',
  },
  {
    question: 'How often do HMO certificates need renewing?',
    answer:
      'Gas safety every 12 months where there is gas; the EICR at least every 5 years; the EPC is valid for 10 years; the HMO licence runs for a fixed term set by the council (often up to 5 years). Fire risk assessments are reviewed regularly and whenever circumstances change. The practical job is tracking each renewal date and acting before it passes.',
  },
  {
    question: 'Does PulseHub make my HMO compliant?',
    answer:
      'No. PulseHub helps with the organisation: it records your licence and certificates with their renewal dates, shows a compliant-or-not view across your portfolio, holds the evidence files and reminds you before deadlines. It does not carry out inspections, replace qualified professionals, protect deposits with a government scheme or make a property compliant on its own. Meeting the requirements remains the landlord or manager’s responsibility, and this is general information, not legal advice.',
  },
  {
    question: 'Do I need to protect tenants’ deposits?',
    answer:
      'If you take a deposit on an assured shorthold tenancy in England, you must protect it in a government-approved deposit protection scheme and give the prescribed information within the legal time limit. PulseHub records the deposit and settles it against the final bill at check-out, but it does not lodge it with a scheme on your behalf, so that step stays with you.',
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
        { '@type': 'ListItem', position: 3, name: 'HMO compliance checklist', item: url },
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
  const external = href.startsWith('http')
  const className = 'font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary'
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

const checklist: { item: string; frequency: string; record: string }[] = [
  { item: 'HMO licence', frequency: 'Where required; term set by the council', record: 'Licence document, its conditions and expiry date' },
  { item: 'Gas safety (CP12)', frequency: 'Every 12 months, where there is gas', record: 'Gas safety record, shared with tenants' },
  { item: 'Electrical (EICR)', frequency: 'At least every 5 years', record: 'EICR report, shared with tenants' },
  { item: 'Fire risk assessment', frequency: 'Reviewed regularly and when things change', record: 'Written assessment and the actions taken' },
  { item: 'Smoke and CO alarms', frequency: 'In place and working; checked when reported', record: 'Alarm locations and check dates' },
  { item: 'Energy performance (EPC)', frequency: 'Valid for 10 years; minimum rating rules apply', record: 'EPC certificate' },
  { item: 'Room and amenity standards', frequency: 'Set by the council; checked at inspection', record: 'Floor areas and shared facilities provision' },
  { item: 'Deposit protection', frequency: 'Within the legal time limit of taking it', record: 'Scheme reference and prescribed information' },
  { item: 'Right to rent', frequency: 'Before a tenancy, and follow-up checks', record: 'Checks and copies of documents' },
  { item: 'Inspections and repairs', frequency: 'As you decide; a licence may require them', record: 'Inspection notes, findings and dates' },
]

function ChecklistTable() {
  return (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[44rem] border-collapse text-left text-[0.95rem] leading-[1.6] sm:text-base">
        <thead>
          <tr className="bg-muted/60">
            <th scope="col" className="w-[26%] px-4 py-3 align-top font-display text-base font-medium tracking-tight sm:px-5">Item</th>
            <th scope="col" className="w-[36%] px-4 py-3 align-top font-display text-base font-medium tracking-tight sm:px-5">How often</th>
            <th scope="col" className="w-[38%] px-4 py-3 align-top font-display text-base font-medium tracking-tight sm:px-5">Record to keep</th>
          </tr>
        </thead>
        <tbody>
          {checklist.map((row) => (
            <tr key={row.item} className="border-t border-border align-top">
              <th scope="row" className="px-4 py-4 text-left font-medium text-foreground/90 sm:px-5">{row.item}</th>
              <td className="px-4 py-4 text-foreground/80 sm:px-5">{row.frequency}</td>
              <td className="px-4 py-4 text-foreground/80 sm:px-5">{row.record}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function HmoComplianceChecklistPost() {
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

        <div className="mx-auto mt-10 max-w-[50rem]">
          <P>
            <strong>
              HMO compliance is the set of safety, licensing and record-keeping duties that come with letting a house
              in multiple occupation. This is a practical checklist of the items that matter in England, what record to
              keep for each, and how often they need renewing.
            </strong>{' '}
            It is general information, not legal advice. Exactly which rules apply depends on the property, its
            occupancy and the local council, so confirm current requirements on{' '}
            <A href="https://www.gov.uk/house-in-multiple-occupation-licence">GOV.UK</A> and with your local authority.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Use this safely</p>
            <p className="mt-3 text-[1.0625rem] leading-[1.7] text-foreground/85 sm:text-lg">
              Rules and licensing differ across the UK and between councils, and they change. Treat this as a starting
              point for organising your records, not a definitive legal list, and check every area you operate in.
            </p>
          </aside>

          <H2 id="checklist">The HMO compliance checklist</H2>
          <P>The items below are the backbone of staying compliant. Keep the dated record for each, and track the renewal date so nothing lapses.</P>
          <ChecklistTable />

          <H2 id="licence">1. Licence</H2>
          <P>
            A large HMO, rented to five or more people forming more than one household who share facilities, needs a
            mandatory licence in England. Smaller HMOs may still need one where the council runs an additional or
            selective licensing scheme. Keep the licence, its conditions and its expiry date, and check with the local
            authority for each property, because licensing is set locally.
          </P>

          <H2 id="gas-electrical">2. Gas and electrical safety</H2>
          <P>
            Where there is gas, a Gas Safe registered engineer must carry out a gas safety check every 12 months, and
            you share the record with tenants. The fixed electrical installation needs an inspection (an EICR) at least
            every 5 years. These are the two that most often catch operators out, because the clock runs quietly in the
            background.
          </P>

          <H2 id="fire">3. Fire safety</H2>
          <P>
            Carry out a fire risk assessment and act on it. Smoke alarms should be on each storey with living
            accommodation, with carbon monoxide alarms in rooms with a fixed combustion appliance, all kept working.
            Fire doors, escape routes and the duties in the HMO management regulations also sit here. Licence conditions
            can add more, so confirm the detail for your property.
          </P>

          <H2 id="epc-standards">4. EPC and room standards</H2>
          <P>
            Keep a valid Energy Performance Certificate on file, and note that minimum energy efficiency rules apply to
            letting. Separately, councils set room and amenity standards, such as minimum room sizes and the ratio of
            kitchens and bathrooms to occupants, which they check at inspection. Record your floor areas and shared
            facilities so you can show them.
          </P>

          <H2 id="tenancy">5. Tenancy duties</H2>
          <P>
            If you take a deposit on an assured shorthold tenancy, protect it in a government-approved scheme and serve
            the prescribed information within the legal time limit. Carry out right to rent checks before a tenancy, and
            keep copies. Keep your tenancy agreements, inspection notes and a history of repairs with their dates, so
            your records match the property.
          </P>

          <H2 id="track">How to keep on top of it without a spreadsheet</H2>
          <P>
            Running one HMO, this is a short mental list. Running several, it becomes a scatter of certificates in email,
            renewal dates in a spreadsheet and reminders in a calendar, and the day a certificate lapses is the day you
            find out it was your job to notice. <A href={routes.hmo}>PulseHub HMO management software</A> keeps the
            licence and each certificate with its renewal date, shows a compliant-or-not view across the whole portfolio,
            holds the evidence files, and sends a daily reminder before anything is due. It organises the records and the
            reminders. It does not carry out inspections, protect deposits with a scheme, or make a property compliant,
            and it is not legal advice.
          </P>
          <P>
            For the wider picture, read our guide to <A href={postPath('hmo-compliance')}>HMO compliance</A>, see how
            PulseHub handles <A href={routes.hmoBilling}>HMO utility billing</A>, or compare it as{' '}
            <A href={routes.hmo}>HMO management software</A>.
          </P>

          <div className="mt-10">
            <ProductScreenshot
              src={screenshots.dashboard.src}
              alt="A PulseHub dashboard for an HMO portfolio in pounds, with certificate and licence renewal dates tracked per property"
              width={screenshots.dashboard.width}
              height={screenshots.dashboard.height}
              label="One portfolio view · certificates and renewal dates"
              sizes="(max-width: 820px) calc(100vw - 2rem), 50rem"
            />
          </div>

          <section className="mt-16">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">Frequently asked questions</h2>
            <div className="mt-6">
              <FaqList items={faqs} />
            </div>
          </section>
        </div>
      </article>

      <CtaBand
        heading="Track every HMO certificate in one place"
        text="Record your licence, gas, EICR, fire and EPC dates per property, see what is due, and get reminded before it lapses. Start a 14-day free trial with no card required."
        secondaryHref={routes.hmo}
        secondaryLabel="HMO management software"
      />
    </SiteShell>
  )
}
