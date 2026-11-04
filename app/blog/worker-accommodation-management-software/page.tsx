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

const post = getBlogPost('worker-accommodation-management-software')!
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
    question: 'What is worker accommodation management software?',
    answer:
      'It is software that runs housing provided to workers, where people rent a bed rather than a whole unit: who is in which bed, what they or their employer owe, what has been paid, what needs fixing, and how each site is performing. It is built for bed-level occupancy, high turnover and shared costs, which generic hotel or rental tools are not.',
  },
  {
    question: 'Who uses it?',
    answer:
      'Employers and accommodation providers who house workers: construction and project camps, factories, BPO and call-centre staff houses, hospitality and seasonal staff, hostels for workers, and labour or manpower providers who run beds as a service. It suits one house or a portfolio of sites.',
  },
  {
    question: 'Can I bill the employer instead of each worker?',
    answer:
      'Yes. PulseHub records who the payer is for each resident, so you can bill a worker directly or bill the employer that booked the beds, and track what each owes and has paid. It records payments and issues receipts; it is not a payroll system, so any salary deductions are handled in your payroll, not here.',
  },
  {
    question: 'Does it handle multiple camps or sites?',
    answer:
      'Yes. Run every site from one account, switch between them, move a worker or a room between sites, and use the All Properties view to compare occupancy, collections and costs per site side by side. Managers can be given access to only the site they run.',
  },
  {
    question: 'Can it bill shared utilities and meals, not just rent?',
    answer:
      'Yes. Alongside rent you can meter electricity and split it between residents by their move-in dates, add recurring charges such as water and gas, and charge for meals or a mess, so each resident has one monthly bill covering their whole share.',
  },
  {
    question: 'Does it cover worker-housing compliance and licensing?',
    answer:
      'PulseHub handles the operational side: who is housed where, their records and documents, billing and occupancy. It does not include a specific country or region’s worker-housing licensing, welfare or reporting regime, so handle those through the relevant authority. This is general information, not legal advice.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes. You can start a 14-day free trial with no card required, or book a demo first.',
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
        { '@type': 'ListItem', position: 3, name: 'Worker accommodation management software', item: url },
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

function Box({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{title}</p>
      <div className="mt-4 space-y-3 text-[1.0625rem] leading-[1.75] text-foreground/85 sm:text-lg">{children}</div>
    </div>
  )
}

export default function WorkerAccommodationPost() {
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
              Worker accommodation management software runs the housing an employer or provider gives workers, where
              people rent a bed rather than a whole unit: who is in which bed, what they or their employer owe, what
              has been paid, what needs fixing, and how each site is performing.
            </strong>{' '}
            It is the bed-level cousin of a hotel system, built for high turnover, shared bills and the fact that an
            employer is often in the loop.
          </P>
          <P>
            Worker and staff accommodation is one of the harder things to run on spreadsheets. Beds fill and empty as
            projects start and finish, several people share a room and its bills, meals are often part of the deal, and
            the person paying may be the worker, the employer, or a mix of both. This guide covers what the software
            does, why a hotel or residential tool does not fit, the features that matter, how billing usually works,
            and how to choose. It is written for employers and accommodation providers of any size.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Worker housing is rented by the bed, with high turnover and shared costs, so it needs bed-level software, not a hotel or whole-unit tool.</li>
              <li>The payer varies: the worker, the employer, or a split. The system should record who pays and track what each owes.</li>
              <li>One monthly bill per resident should gather rent, metered utilities and meals, with deposits settled at move-out.</li>
              <li>A portfolio view across every site, plus manager access scoped to one site, matters once you run more than one camp or house.</li>
              <li>Operational software is not a compliance or payroll system: licensing, welfare reporting and salary deductions sit elsewhere.</li>
            </ul>
          </aside>

          <H2 id="what-it-is">What worker accommodation management software is</H2>
          <P>
            It is software that runs the day-to-day of housing provided to workers from one place. Instead of a bed
            list in one spreadsheet, a rent tracker in another and maintenance notes on paper, it keeps them together:
            a record for every worker, true occupancy down to the bed, a running balance for whoever pays, and a clear
            view of occupancy and cost for each site. The same system can run a single staff house or a portfolio of
            camps.
          </P>
          <P>
            You will see it called worker accommodation, staff accommodation, labour accommodation or workforce
            housing software, and the underlying job is the same: manage beds, residents, rent, shared bills and
            maintenance across however many sites you run.
          </P>

          <H2 id="why-generic">Why a hotel or residential tool does not fit</H2>
          <P>
            A hotel system is built around nightly stays, a front desk and distribution to booking channels. A
            residential or rental system is built around one tenant signing for one whole unit on a long lease. Worker
            housing sits between the two and matches neither: many people live under one roof, each in a bed, staying
            weeks to months, sharing utilities and often meals, with the employer frequently paying or arranging the
            stay.
          </P>
          <P>
            Run that on a tool built for whole units and you fight it every month: you cannot bill a bed, you cannot
            split a shared meter, and a fast move-in or move-out as a project ramps up or ends becomes a manual
            rebuild. Worker accommodation needs software that models a room as several beds, keeps occupancy true, and
            bills each resident, or their employer, for their actual share.
          </P>

          <H2 id="features">The features that matter</H2>
          <P>Use this as a checklist when you compare tools:</P>
          <UL>
            <li><strong>Bed-level occupancy</strong> that cannot be over-filled, so a room with three of four beds taken reads as three-quarters full.</li>
            <li><strong>Fast admissions and a record per worker,</strong> with documents, the employer, an emergency contact and the deposit held in one place.</li>
            <li><strong>Flexible billing:</strong> bill each worker or the employer, on one monthly bill that gathers rent, utilities and meals, with part-payments tracked.</li>
            <li><strong>Metered utilities split</strong> between the residents who shared them, rather than a flat split.</li>
            <li><strong>Deposits</strong> held and settled against final dues at move-out.</li>
            <li><strong>Meals or a mess</strong> charged as part of the package where you provide them.</li>
            <li><strong>A portfolio view</strong> across every site, with occupancy, collections and cost per site side by side.</li>
            <li><strong>Roles and permissions,</strong> so a site manager sees only their own site.</li>
            <li><strong>Maintenance and complaints</strong> logged and tracked to resolution against the room.</li>
          </UL>

          <H2 id="billing">How workers, or their employers, get billed</H2>
          <P>
            Billing is where worker housing differs most from ordinary renting, because the payer is not always the
            person in the bed. Three setups are common: the worker pays their own rent; the employer pays for the beds
            it has booked; or the cost is shared, for example the employer covers the bed and the worker covers extras.
          </P>
          <P>
            Good software records who the payer is for each resident and tracks what each one owes and has paid, with
            one monthly bill that can gather rent, metered utilities and meals. It is worth being clear on one point:
            this is billing and record-keeping, not payroll. A system like this records payments and issues receipts,
            so if you recover rent through salary, the deduction itself happens in your payroll and the payment is
            recorded here.
          </P>

          <H2 id="pulsehub">How PulseHub handles worker and staff accommodation</H2>
          <P>
            <A href="/">PulseHub</A> is built for renting by the room and the bed, which is exactly the worker-housing
            model. It organises each site into floors, rooms and beds and keeps occupancy true so a bed is never
            double-booked. Every worker is one record with their documents, employer, deposit and full history.
            Each resident gets one monthly bill that gathers rent, metered electricity split between residents by their
            move-in dates, recurring charges such as water and gas, and meals where you provide them, and you can bill
            the worker or the employer. Deposits are settled against final dues at move-out, every site rolls up into
            one portfolio view, and a manager can be given access to just their own site.
          </P>

          <div className="mt-8">
            <ProductScreenshot
              src={screenshots.payments.src}
              alt="PulseHub payments screen showing each resident's rent and metered electricity on one monthly bill, with paid and pending status"
              width={screenshots.payments.width}
              height={screenshots.payments.height}
              label="Payments · each resident's rent & metered electricity"
              sizes="(max-width: 820px) calc(100vw - 2rem), 50rem"
            />
          </div>

          <P>
            One honest boundary: PulseHub handles the operations, not a given country’s worker-housing licensing,
            welfare reporting or payroll. Handle those through the relevant authority and your payroll. For the wider
            category, see{' '}
            <A href={routes.sharedHousing}>property management software for shared housing</A>,{' '}
            <A href="/blog/what-is-a-property-management-system">what a property management system is</A>, and our
            guide to an <A href="/blog/accommodation-management-system">accommodation management system</A>; for
            peso-billed Philippine dormitories specifically, see{' '}
            <A href="/blog/dormitory-bedspace-management-software">dormitory and bedspace management software</A>.
          </P>

          <H2 id="choose">How to choose</H2>
          <P>Work through these before the price and the feature list:</P>
          <UL>
            <li><strong>Does it fit the model?</strong> It has to bill a bed and split a shared room, not just a whole unit.</li>
            <li><strong>Does the billing match reality?</strong> Make sure it can bill the employer or the worker, and gather utilities and meals onto one bill.</li>
            <li><strong>Does it scale to more than one site</strong> without turning back into a spreadsheet?</li>
            <li><strong>Can you get your data in and out,</strong> with bulk import to start and export whenever you want?</li>
            <li><strong>Is the reporting clear enough</strong> to see cost and collections per site?</li>
            <li><strong>Is support there</strong> when a camp fills up overnight?</li>
          </UL>

          <Box title="In short">
            <P>
              If you house workers by the bed, across one site or many, you need software built for that model, not a
              hotel system or a single-let tool bent to fit. Look for true bed-level occupancy, billing that can charge
              the worker or the employer, shared utilities and meals on one bill, and a portfolio view across every
              site.
            </P>
          </Box>
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
        heading="Run your worker accommodation on one system."
        text="Beds and residents, a monthly bill per worker or employer, shared bills and every site in one view. Start a 14-day free trial with no card required."
        secondaryHref={routes.sharedHousing}
        secondaryLabel="Property management for shared housing"
      />
    </SiteShell>
  )
}
