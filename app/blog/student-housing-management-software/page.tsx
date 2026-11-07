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
import { usScreenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('student-housing-management-software')!
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
    question: 'What is student housing management software?',
    answer:
      'It is software that runs off-campus student housing where people rent a bed rather than a whole unit: applications, bed-level occupancy, rent and shared costs on one bill per resident, deposits, guarantor records, arrears and reporting, for one property or a whole portfolio.',
  },
  {
    question: 'Does it do by-the-bed leasing?',
    answer:
      'Yes. PulseHub is built around the bed, not the unit, so a four-bed apartment with three residents reads as three-quarters full, each resident is billed for their own bed, and one resident falling behind does not muddle the others. That is the core of student housing and the thing generic landlord tools handle badly.',
  },
  {
    question: 'Does it match roommates?',
    answer:
      'PulseHub records room and bed assignments and keeps each resident, their guarantor and their documents on one record, but it does not run a roommate-matching questionnaire or algorithm. You decide who goes where; the software keeps the assignments, billing and history straight.',
  },
  {
    question: 'How are payments handled, and is it a payment processor?',
    answer:
      'Each resident has one bill, and part-payments are recorded as installments with their own date and receipt, with the balance carried forward. PulseHub records payments and issues receipts; it is not a payment gateway or ACH processor, so you log what was paid and a receipt goes out.',
  },
  {
    question: 'Is it for large purpose-built student housing or smaller operators?',
    answer:
      'It fits smaller and mid-sized off-campus operators best: owners with a few houses or apartment blocks near campus who want one straightforward system without per-bed fees. Large purpose-built student housing often runs on enterprise leasing platforms; PulseHub is the lighter, by-the-bed alternative.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes. You can start a 14-day free trial with no card required, then book a demo if you would like a walkthrough for your properties.',
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
      publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/`, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      isPartOf: { '@id': `${SITE_URL}${BLOG_BASE}#blog` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}${BLOG_BASE}` },
        { '@type': 'ListItem', position: 3, name: 'Student housing management software', item: url },
      ],
    },
    { '@type': 'FAQPage', mainEntity: faqs.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
  ],
}

function H2({ id, children }: { id?: string; children: ReactNode }) {
  return <h2 id={id} className="mt-12 scroll-mt-28 font-display text-[clamp(1.55rem,3.4vw,2.35rem)] font-medium leading-tight tracking-tight">{children}</h2>
}
function P({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-[1.0625rem] leading-[1.8] text-foreground/85 sm:text-lg">{children}</p>
}
function UL({ children }: { children: ReactNode }) {
  return <ul className="mt-6 space-y-3 text-[1.0625rem] leading-[1.75] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">{children}</ul>
}
function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http')
  const className = 'font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary'
  if (external) return <a href={href} className={className} rel="noopener noreferrer" target="_blank">{children}</a>
  return <Link href={href} className={className}>{children}</Link>
}
function Box({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{title}</p>
      <div className="mt-4 space-y-3 text-[1.0625rem] leading-[1.75] text-foreground/85 sm:text-lg">{children}</div>
    </div>
  )
}

export default function StudentHousingUsPost() {
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
          <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.08] tracking-tight">{post.heading}</h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">
            <time dateTime={post.datePublished}>{formatBlogDate(post.datePublished)}</time> · {post.readingMinutes} min read
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-5xl">
          <ProductScreenshot src={post.image.src} alt={post.image.alt} width={post.image.width} height={post.image.height} priority label={post.image.label} sizes="(max-width: 1024px) calc(100vw - 2rem), 64rem" />
        </div>

        <div className="mx-auto mt-10 max-w-[50rem]">
          <P>
            <strong>
              Student housing management software runs off-campus housing from one place: applications, bed-level
              occupancy, one bill per resident in dollars, deposits and guarantor records, your own page to fill beds, and
              every property in one view.
            </strong>{' '}
            It is built for leasing by the bed, the way off-campus operators actually run, not the whole-unit model a
            generic landlord tool assumes.
          </P>
          <P>
            Off-campus is where most of the beds are, and where the operations are hardest: several residents share an
            apartment, each on their own lease and their own rent, and the whole portfolio turns over at once each August.
            Run that on a single-lease landlord tool and you fight it every year. This guide covers what the software
            does, why a generic tool does not fit, the features that matter, and how to choose.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Off-campus student housing is leased by the bed, so it needs bed-level software, not a whole-unit tool.</li>
              <li>One bill per resident in dollars, with part-payments recorded as installments and a running balance.</li>
              <li>Each resident, their guarantor and their documents sit on one record; the software keeps assignments, not matching.</li>
              <li>PulseHub is the lighter, by-the-bed alternative to enterprise student-housing platforms, with no per-bed fees.</li>
              <li>It runs operations and records payments; it is not a payment processor and does not file compliance for you.</li>
            </ul>
          </aside>

          <H2 id="what-it-is">What student housing software is</H2>
          <P>
            It is software that runs a property&rsquo;s daily operations from one place: a record for every resident with
            their guarantor, deposit and history, true occupancy down to the bed, one bill that gathers rent and shared
            costs, the payments against it, and a clear view of how each property is doing. Instead of a bed list in one
            spreadsheet and a rent tracker in another, it keeps them together, for one house or a whole portfolio.
          </P>

          <H2 id="why-generic">Why a generic landlord tool does not fit</H2>
          <P>
            Most landlord tools assume one tenant signs for one whole unit and pays one rent. Student housing does not
            work like that: four residents share an apartment, each on their own by-the-bed lease, each with their own
            rent, deposit and guarantor. Run that on a whole-unit tool and you cannot bill a bed, you cannot see an
            apartment as part full, and the August turnover becomes a manual rebuild of every record.
          </P>
          <P>
            Enterprise student-housing platforms exist for large purpose-built schemes, with leasing engines and per-bed
            pricing to match. A smaller off-campus operator rarely needs all that and should not pay for it. What they
            need is a straightforward system that leases by the bed and bills each resident.
          </P>

          <H2 id="features">The features that matter for student housing</H2>
          <P>Use this as a checklist when you compare tools:</P>
          <UL>
            <li><strong>By-the-bed occupancy</strong> that cannot be over-filled, so a four-bed apartment with three residents reads as three-quarters full.</li>
            <li><strong>One bill per resident in dollars,</strong> with part-payments tracked as installments and the real balance carried forward.</li>
            <li><strong>Guarantor and document records,</strong> keeping a parent or guarantor as a contact on the resident&rsquo;s record, with signed documents uploaded and the resident&rsquo;s full payment history alongside.</li>
            <li><strong>Deposits</strong> held against each record and settled at move-out.</li>
            <li><strong>Arrears tracking and automatic reminders,</strong> so overdue rent is chased without you doing it by hand.</li>
            <li><strong>Your own public page,</strong> with live bed availability, so prospects enquire with you directly.</li>
            <li><strong>Portfolio reporting,</strong> with occupancy and collections per property, and manager access scoped to one property.</li>
            <li><strong>A pricing model that suits you,</strong> flat per property rather than a fee for every bed.</li>
          </UL>

          <div className="mt-8">
            <ProductScreenshot src={usScreenshots.payments.src} alt={usScreenshots.payments.alt} width={usScreenshots.payments.width} height={usScreenshots.payments.height} label="Payments · rent & receipts in dollars" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            <div className="mt-8">
              <ProductScreenshot src={usScreenshots.tenants.src} alt={usScreenshots.tenants.alt} width={usScreenshots.tenants.width} height={usScreenshots.tenants.height} label="Residents · deposits, waiting list & move-out" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
            <div className="mt-8">
              <ProductScreenshot src={usScreenshots.allProperties.src} alt={usScreenshots.allProperties.alt} width={usScreenshots.allProperties.width} height={usScreenshots.allProperties.height} label="Every property · occupancy, rent & collections" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
          </div>

          <H2 id="pulsehub">How PulseHub fits</H2>
          <P>
            <A href={routes.student}>PulseHub</A> is built for leasing by the room and the bed, which is exactly the
            off-campus student-housing model. It organizes each property into rooms and beds, keeps occupancy true, and
            every resident is one record with their guarantor, deposit and history. Each resident gets one bill in dollars,
            with part-payments recorded as installments, arrears chased automatically, and every property in one portfolio
            view. Each property also gets a free public page with live availability, so you fill beds from your own link,
            and plans are flat per property, with no per-bed fees. Also running student housing north of the border? See{' '}
            <A href="/blog/student-housing-management-software-canada">student housing software for Canada</A>.
          </P>
          <P>
            One honest boundary: PulseHub runs the operations and records payments, but it is not a payment processor, it
            does not match roommates for you, and compliance such as fair-housing and FERPA stays your responsibility. It
            keeps the records that make the rest easier. For the product in general, see{' '}
            <A href={routes.student}>student accommodation management software</A> and our guide to{' '}
            <A href="/blog/how-to-choose-student-accommodation-management-software">choosing student software</A>; new to
            the category? Read <A href="/blog/what-is-a-property-management-system">what a property management system is</A>.
          </P>

          <Box title="In short">
            <P>
              If you run off-campus student housing in the US, by the bed, in dollars, and often across more than one
              property, you need software built for that model, not a whole-unit landlord tool or an enterprise leasing
              suite. Look for true by-the-bed occupancy, one dollar bill per resident, guarantor records, deposits and
              arrears handled, your own page to fill beds, and flat per-property pricing.
            </P>
          </Box>

          <div className="mt-8">
            <StartTrialButton location="other" size="lg" className="min-h-12 whitespace-normal bg-primary px-6 text-base hover:bg-primary/90" />
          </div>
        </div>
      </article>

      <section className="px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-[50rem]">
          <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-8"><FaqList items={faqs} /></div>
        </div>
      </section>

      <CtaBand
        heading="Run your student housing on one system."
        text="Beds, one dollar bill per resident, guarantor records, deposits, arrears and every property in one view, with no per-bed fees. Start a 14-day free trial with no card required."
        secondaryHref={routes.student}
        secondaryLabel="Student accommodation management software"
      />
    </SiteShell>
  )
}
