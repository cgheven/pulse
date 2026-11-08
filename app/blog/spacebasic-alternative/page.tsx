import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { indiaScreenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('spacebasic-alternative')!
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
    question: 'What is SpaceBasic?',
    answer:
      'SpaceBasic is a campus and hostel management platform used mainly by universities, colleges and schools in India, with student hostels as its core use case. It covers student hostel allocation, attendance, gate security, mess, fee management, complaints and leave, and it runs parent, student and warden apps. It also serves some independent hostels and PGs, and it is priced per student per month.',
  },
  {
    question: 'Is PulseHub a good SpaceBasic alternative?',
    answer:
      'It depends on who you are. If you run a commercial PG, hostel or co-living business rather than a university hostel, PulseHub is built for your side of the job: one bill per resident for rent, a metered share of electricity and meals, bed-level occupancy, deposits, WhatsApp receipts and reminders, and a public listing page to fill empty beds. SpaceBasic is stronger if you are an institution that needs student attendance, gate security and parent engagement, which PulseHub does not do.',
  },
  {
    question: 'What does SpaceBasic do that PulseHub does not?',
    answer:
      'SpaceBasic is built for campuses, so it includes student-specific tools PulseHub leaves out on purpose: student attendance, gate or security check-in, parent engagement apps and deeper student-information records tied to an institution. If those matter to you because you manage hostels for a college or university, SpaceBasic is the closer fit.',
  },
  {
    question: 'How does PulseHub pricing compare with SpaceBasic?',
    answer:
      'They price on different units. SpaceBasic publishes per-student, per-month pricing, so your bill scales with headcount. PulseHub uses per-property plans, so your bill scales with the number of properties, not the number of residents. For a commercial operator with full properties, per-property pricing is often more predictable, but check both against your own numbers and each provider’s current pricing page.',
  },
  {
    question: 'Does PulseHub work outside India?',
    answer:
      'Yes. SpaceBasic is focused on India. PulseHub runs the same model across India, Pakistan, the UAE, the UK, the US, the Philippines and more, with the currency, terminology and date format set per country. If you operate in more than one market, or might, PulseHub is not tied to a single one.',
  },
  {
    question: 'Can I move from SpaceBasic to PulseHub without re-keying everything?',
    answer:
      'Yes. PulseHub has bulk import for residents and rooms, so you can bring an existing property across rather than typing it in, and you can export to PDF and spreadsheet at any time. Start a 14-day free trial to test it with your own data before you commit.',
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
        { '@type': 'ListItem', position: 3, name: 'SpaceBasic alternative', item: url },
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

const comparisonRows: { dimension: string; spacebasic: string; pulsehub: string }[] = [
  {
    dimension: 'Built for',
    spacebasic: 'University, college and school hostels, plus some independent hostels and PGs',
    pulsehub: 'Commercial operators of PG, hostels, co-living, boarding houses and bedspaces',
  },
  {
    dimension: 'Primary market',
    spacebasic: 'India',
    pulsehub: 'Multi-market: India, Pakistan, the UAE, the UK, the US, the Philippines and more, with currency and terminology set per country',
  },
  {
    dimension: 'Student-campus tools',
    spacebasic: 'Attendance, gate security, parent and student apps, student information',
    pulsehub: 'Not included: PulseHub focuses on the operator’s side, not campus administration',
  },
  {
    dimension: 'Resident billing',
    spacebasic: 'Fee management and mess billing',
    pulsehub: 'One bill per resident: rent, a metered share of electricity, water and gas, and meals',
  },
  {
    dimension: 'Occupancy',
    spacebasic: 'Hostel and room allocation',
    pulsehub: 'Bed-level, modelled as floors, rooms and beds, with a waiting list and no double-booking',
  },
  {
    dimension: 'Filling empty beds',
    spacebasic: 'Campus allocation, not marketing',
    pulsehub: 'A branded public listing page per property, with live availability and an application form',
  },
  {
    dimension: 'Payments',
    spacebasic: 'Fee management',
    pulsehub: 'Records payments and issues WhatsApp receipts; not a payment gateway, so money moves through your own bank or wallet',
  },
  {
    dimension: 'Pricing model',
    spacebasic: 'Per student, per month',
    pulsehub: 'Per-property plans',
  },
]

function ComparisonTable() {
  return (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[40rem] border-collapse text-left text-[0.95rem] leading-[1.6] sm:text-base">
        <thead>
          <tr className="bg-muted/60">
            <th scope="col" className="w-[22%] px-4 py-3 align-top font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground sm:px-5">
              &nbsp;
            </th>
            <th scope="col" className="w-[39%] px-4 py-3 align-top font-display text-base font-medium tracking-tight sm:px-5">
              SpaceBasic
            </th>
            <th scope="col" className="w-[39%] px-4 py-3 align-top font-display text-base font-medium tracking-tight text-primary sm:px-5">
              PulseHub
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row) => (
            <tr key={row.dimension} className="border-t border-border align-top">
              <th scope="row" className="px-4 py-4 text-left font-medium text-foreground/90 sm:px-5">
                {row.dimension}
              </th>
              <td className="px-4 py-4 text-foreground/80 sm:px-5">{row.spacebasic}</td>
              <td className="px-4 py-4 text-foreground/80 sm:px-5">{row.pulsehub}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function SpaceBasicAlternativePost() {
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
              SpaceBasic is built for university, college and school hostels, with student attendance, gate security and
              parent apps at its core. PulseHub is a SpaceBasic alternative built for commercial PG, hostel and co-living
              operators: one bill per resident for rent, a metered share of electricity and meals, bed-level occupancy,
              and a public listing page to fill empty beds.
            </strong>{' '}
            If you run accommodation as a business rather than a campus, PulseHub is built for that side of the job.
          </P>
          <P>
            This is a straight comparison, not a takedown. SpaceBasic is a real product and the facts below are accurate
            as far as its own material goes. We make PulseHub, so treat this as our considered case rather than a neutral
            review, and check both against how you actually operate.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>SpaceBasic is campus-first: universities, colleges and schools, with student attendance, gate security and parent engagement.</li>
              <li>PulseHub is operator-first: commercial PG, hostel and co-living businesses that rent beds and collect rent through the month.</li>
              <li>PulseHub puts rent, a metered share of electricity, water and gas, and meals on one bill per resident, with WhatsApp receipts and reminders.</li>
              <li>PulseHub is multi-market and prices per property; SpaceBasic is India-focused and prices per student.</li>
              <li>SpaceBasic is the stronger fit if you are an institution that needs attendance, security and parent apps, which PulseHub does not do.</li>
            </ul>
          </aside>

          <H2 id="what-spacebasic-is">What SpaceBasic is</H2>
          <P>
            SpaceBasic describes itself as campus and hostel management software, used mainly by universities, colleges
            and schools in India, with student hostels as the core use case. Its named customers are institutions. In
            outline, it does a few things:
          </P>
          <UL>
            <li><strong>Student hostel administration</strong>: allocation, student information, attendance and gate or security check-in.</li>
            <li><strong>Mess and fee management</strong>, with reminders and escalations.</li>
            <li><strong>Complaints and leave approvals</strong>, routed through warden and administrator roles.</li>
            <li><strong>Parent, student and warden apps</strong>, so a campus community can see what it needs to.</li>
          </UL>
          <P>
            On pricing, SpaceBasic publishes a per-student, per-month model, which suits an institution counting heads.
            Check SpaceBasic&rsquo;s own site for current rates, as third-party listings and its own pages do not always
            agree.
          </P>

          <H2 id="what-pulsehub-is">What PulseHub is</H2>
          <P>
            <A href="/">PulseHub</A> is an operating system for the commercial side of shared living: PG and hostels,
            co-living, boarding houses and bedspaces, where the operator rents a bed rather than a flat and money arrives
            in pieces through the month. It models each property as floors, rooms and beds, keeps occupancy true so a bed
            is never double-booked, and runs across many markets with the currency, terminology and date format set per
            country.
          </P>
          <P>
            Its centre of gravity is billing and collection. Each resident gets one monthly bill that gathers rent, a
            metered share of electricity split between the residents who shared it by their move-in dates, recurring
            charges such as water and gas, and meals where you serve them. Partial payments, deposits, discounts and
            receipts are handled, dues carry forward as a single running balance, and reminders and receipts go out over
            WhatsApp. PulseHub records payments and issues receipts; it is not a payment gateway, so money still moves
            through your own bank or wallet.
          </P>

          <div className="mt-8">
            <ProductScreenshot
              src={indiaScreenshots.payments.src}
              alt="PulseHub payments screen showing each resident's rent and a metered share of electricity on one monthly bill in rupees, with paid and pending status"
              width={indiaScreenshots.payments.width}
              height={indiaScreenshots.payments.height}
              label="One bill per resident · rent + metered electricity"
              sizes="(max-width: 820px) calc(100vw - 2rem), 50rem"
            />
          </div>

          <H2 id="at-a-glance">PulseHub vs SpaceBasic at a glance</H2>
          <P>
            The table below sets the two side by side on the things operators ask about most. The detail, and the honest
            caveats, follow underneath.
          </P>
          <ComparisonTable />
          <P>
            Feature lists change, so treat this as a map rather than a contract, and confirm the current detail with each
            provider. The row that matters most is usually &ldquo;built for&rdquo;, because a campus tool and an operator
            tool are solving different problems.
          </P>

          <H2 id="where-pulsehub-differs">Where PulseHub differs</H2>
          <P>
            Four differences tend to decide it for operators who choose PulseHub over SpaceBasic:
          </P>
          <UL>
            <li>
              <strong>Built for a business, not a campus.</strong> PulseHub is designed for operators who let beds for
              profit, so its heart is billing, collection, occupancy and marketing, rather than student attendance and
              parent engagement. See <A href={routes.pg}>PG management</A> and <A href={routes.hostel}>hostel management</A>.
            </li>
            <li>
              <strong>Shared-cost billing.</strong> Beyond rent, PulseHub meters electricity and splits it between
              residents fairly, adds water and gas as recurring charges, and bills meals, all on one per-resident bill.
              That is the hard part of running a PG or hostel, and it is where fee management alone leaves you doing sums
              by hand.
            </li>
            <li>
              <strong>More than one market.</strong> SpaceBasic is India-focused. PulseHub runs the same model across{' '}
              <A href={routes.india}>India</A>, <A href={routes.pakistan}>Pakistan</A>, the UAE, the UK, the US, the
              Philippines and more, so if you operate across borders, or might, you are not tied to one.
            </li>
            <li>
              <strong>Your own listing site.</strong> PulseHub gives each property a branded public page with live
              availability, prices, photos and an application form, so you fill empty beds from your own site rather than
              only allocating students handed to you by an institution.
            </li>
          </UL>
          <P>
            Be honest about the trade-off, though: SpaceBasic does things PulseHub does not. If you need student
            attendance, gate or security check-in, parent engagement apps or a campus ERP tied to an institution,
            SpaceBasic is built for that and PulseHub is not.
          </P>

          <H2 id="how-to-judge">How to judge a SpaceBasic alternative</H2>
          <P>
            PulseHub will not be the only tool you look at. However you compare them, judge each one on the same handful
            of questions rather than the length of its feature list:
          </P>
          <UL>
            <li>Is it built for an <strong>institution or a business</strong>, and which are you?</li>
            <li>Can it bill a <strong>room and a bed</strong>, and split a shared utility bill, or only track fees?</li>
            <li>Does it match your <strong>markets</strong>, now and where you are heading?</li>
            <li>Does it help you <strong>fill empty beds</strong>, not just manage the ones that are full?</li>
            <li>Does the <strong>pricing model</strong> suit you: per property, or per student?</li>
          </UL>

          <H2 id="who-should-pick-which">Who should pick which</H2>
          <P>
            The short version: <strong>PulseHub</strong> is the one to pick if you run PG, hostels or co-living as a
            business and want one bill per resident for rent, metered utilities and meals, bed-level occupancy, WhatsApp
            receipts and reminders, your own listing page, and the option to operate in more than one market. SpaceBasic
            is the one to pick if you are a university, college or school that needs student attendance, gate security
            and parent engagement for campus hostels.
          </P>
          <P>
            If you are leaning PulseHub, the quickest way to be sure is to see it on your own property type:{' '}
            <A href={routes.pg}>PG management</A>, <A href={routes.hostel}>hostel management</A>, or{' '}
            <A href={routes.coliving}>co-living management</A>. New to the category? Start with{' '}
            <A href="/blog/what-is-a-property-management-system">what a property management system is</A>, or the{' '}
            <A href="/blog/rentok-alternative">RentOk alternative</A> comparison if you are weighing Indian tools.
          </P>

          <Box title="In short">
            <P>
              SpaceBasic is a campus-first platform for university and college hostels, priced per student. PulseHub is
              an operator-first platform for commercial PG, hostels and co-living, priced per property: one bill per
              resident for rent, metered utilities and meals, bed-level occupancy, WhatsApp receipts, your own listing
              page, and more than one market. If you run accommodation as a business, PulseHub is built for it. Start a
              free trial and see it on your own property.
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
        heading="See PulseHub on your own PG or hostel."
        text="Run PG, hostels and co-living with one bill per resident for rent, metered utilities and meals, bed-level occupancy and WhatsApp receipts. Start a 14-day free trial with no card required."
        secondaryHref={routes.pg}
        secondaryLabel="PG management software"
      />
    </SiteShell>
  )
}
