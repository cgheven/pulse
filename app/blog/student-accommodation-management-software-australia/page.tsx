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

const post = getBlogPost('student-accommodation-management-software-australia')!
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
    question: 'What is student accommodation management software?',
    answer:
      'It is software that runs student housing where people rent a room or a bed rather than a whole unit: applications, room and bed occupancy, rent and shared costs on one bill per resident, bonds, arrears and reporting, for a single property or a whole portfolio.',
  },
  {
    question: 'Does it work for student accommodation in Australia, in dollars?',
    answer:
      'Yes. PulseHub sets the currency, date format and wording to your market, so your rooms, rent and receipts are in Australian dollars. It suits smaller operators, share houses and student digs in Sydney, Melbourne, Brisbane, Adelaide and Perth, letting by the room and the bed.',
  },
  {
    question: 'Does it lodge bonds or handle state tenancy rules?',
    answer:
      'PulseHub records each resident’s bond and settles it at move-out against any dues, but it does not lodge bonds with a state authority such as the RTBA or the RTA for you, and it does not give legal advice. Lodgement and the residential tenancy or rooming house rules that apply in your state stay your responsibility; the software keeps the records that make them easier.',
  },
  {
    question: 'Is it for large purpose-built student accommodation or smaller operators?',
    answer:
      'It fits smaller and mid-sized operators best: owners with a few share houses or student properties who want one straightforward system without per-bed fees. Large purpose-built student accommodation often runs on enterprise leasing platforms; PulseHub is the lighter, room-and-bed alternative.',
  },
  {
    question: 'Can students pay in parts, and how are payments handled?',
    answer:
      'Yes. Each resident has one bill, and part-payments are recorded as installments with their own date and receipt, with the balance carried forward. PulseHub records payments and issues receipts; it is not a payment gateway, so you log what was paid and a receipt goes out.',
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
        { '@type': 'ListItem', position: 3, name: 'Student accommodation management software in Australia', item: url },
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

export default function StudentAustraliaPost() {
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
              Student accommodation management software for Australia runs student housing from one place: applications,
              room and bed occupancy, one bill per resident in dollars, bonds and arrears, your own page to fill rooms,
              and every property in one view.
            </strong>{' '}
            It is built for letting by the room and the bed, the way smaller operators, share houses and student digs
            actually run, not the whole-unit model a generic rental tool assumes.
          </P>
          <P>
            With international students back in force and housing tight across the capital cities, filling rooms is rarely
            the problem, running them is. If you let student rooms in Sydney, Melbourne, Brisbane, Adelaide or Perth, a
            spreadsheet stops coping once you pass a few rooms: rent arrives fortnightly or monthly, bonds pile up, and
            the start of semester is a scramble. This guide covers what the software does, why a generic tool does not
            fit, the features that matter here, and how to choose.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Share houses and student digs are let by the room, so they need room-and-bed software, not a whole-unit tool.</li>
              <li>One bill per resident in dollars, with fortnightly or monthly rent recorded as part-payments and a running balance.</li>
              <li>PulseHub is the lighter alternative to enterprise PBSA platforms, with no per-bed fees.</li>
              <li>It records bonds and runs operations, but does not lodge bonds with a state authority for you.</li>
              <li>A single view across every property keeps a growing portfolio manageable.</li>
            </ul>
          </aside>

          <H2 id="what-it-is">What student accommodation software is</H2>
          <P>
            It is software that runs a property&rsquo;s daily operations from one place: a record for every student with
            their bond and history, true occupancy down to the bed, one bill that gathers rent and shared costs, the
            payments against it, and a clear view of how each property is doing. Instead of a bed list in one spreadsheet
            and a rent tracker in another, it keeps them together, for one house or a whole portfolio.
          </P>

          <H2 id="why-generic">Why a generic rental tool does not fit</H2>
          <P>
            Most property tools assume one tenant signs for one whole unit and pays one rent. Student housing does not
            work like that: several students share a house, each renting a room, each with their own rent and bond, often
            paying fortnightly. Run that on a whole-unit tool and you fight it every semester, you cannot bill a room
            within a share house, you cannot see a house as part full, and the start-of-semester churn becomes a manual
            rebuild.
          </P>
          <P>
            Enterprise purpose-built student accommodation platforms exist for large schemes, with leasing engines and
            per-bed pricing to match. A smaller operator rarely needs all that, and should not pay for it. What they need
            is a straightforward system that lets rooms and bills each student.
          </P>

          <H2 id="features">The features that matter in Australia</H2>
          <P>Use this as a checklist when you compare tools:</P>
          <UL>
            <li><strong>Room and bed-level occupancy</strong> that cannot be over-filled, so a four-room house with three students reads as three-quarters full.</li>
            <li><strong>One bill per resident in dollars,</strong> with fortnightly or monthly rent tracked as part-payments and the real balance carried forward.</li>
            <li><strong>Bonds</strong> recorded against each resident and settled at the end of the tenancy.</li>
            <li><strong>Arrears tracking and automatic reminders,</strong> so overdue rent is chased without you doing it by hand.</li>
            <li><strong>Your own public page,</strong> with live room availability, so students enquire with you directly.</li>
            <li><strong>Shared bills,</strong> such as a split of utilities, on the same bill as rent where you provide them.</li>
            <li><strong>Portfolio reporting,</strong> with occupancy and collections per property, and manager access scoped to one property.</li>
            <li><strong>A pricing model that suits you,</strong> flat per property rather than a fee for every bed.</li>
          </UL>

          <div className="mt-8">
            <ProductScreenshot src={usScreenshots.payments.src} alt="A payments screen showing monthly rent collection in dollars, with rent and metered electricity charged per resident and paid, unpaid and partial status" width={usScreenshots.payments.width} height={usScreenshots.payments.height} label="Payments · rent & receipts in dollars" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            <div className="mt-8">
              <ProductScreenshot src={usScreenshots.tenants.src} alt="A residents screen showing active residents, the waiting list, bonds, notice periods and move-out, with name and phone search" width={usScreenshots.tenants.width} height={usScreenshots.tenants.height} label="Residents · bonds, waiting list & move-out" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
            <div className="mt-8">
              <ProductScreenshot src={usScreenshots.allProperties.src} alt="A portfolio view comparing occupancy, rent collected, costs and profit across several student properties in dollars" width={usScreenshots.allProperties.width} height={usScreenshots.allProperties.height} label="Every property · occupancy, rent & collections" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
          </div>

          <H2 id="pulsehub">How PulseHub fits</H2>
          <P>
            <A href={routes.student}>PulseHub</A> is built for letting by the room and the bed, which is exactly the
            share-house and student-digs model. It organises each property into rooms and beds, keeps occupancy true, and
            every student is one record with their bond and history. Each resident gets one bill in dollars, with
            fortnightly or monthly rent recorded as installments, arrears chased automatically, and every property in
            one portfolio view. Each property also gets a free public page with live availability, so you fill rooms from
            your own link, and plans are flat per property, with no per-bed fees. Run other shared housing too? See{' '}
            <A href="/blog/rooming-house-management-software-australia">rooming house management software for Australia</A>.
          </P>
          <P>
            One honest boundary: PulseHub runs the operations and records payments, but it does not lodge bonds with a
            state authority or give legal advice, and it is not a payment gateway. For the product in general, see{' '}
            <A href={routes.student}>student accommodation management software</A> and our guide to{' '}
            <A href="/blog/how-to-choose-student-accommodation-management-software">choosing student accommodation software</A>;
            new to the category? Read{' '}
            <A href="/blog/what-is-a-property-management-system">what a property management system is</A>.
          </P>

          <Box title="In short">
            <P>
              If you let student rooms in Australia, by the room, in dollars, and often across more than one house, you
              need software built for that model, not a whole-unit rental tool or an enterprise PBSA suite. Look for true
              room-and-bed occupancy, one dollar bill per resident, bonds and arrears handled, your own page to fill
              rooms, and flat per-property pricing.
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
        heading="Run your student lettings on one system."
        text="Rooms and beds, one dollar bill per resident, bonds, arrears and every property in one view, with no per-bed fees. Start a 14-day free trial with no card required."
        secondaryHref={routes.student}
        secondaryLabel="Student accommodation management software"
      />
    </SiteShell>
  )
}
