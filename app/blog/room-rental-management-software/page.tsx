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
import { screenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('room-rental-management-software')!
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
    question: 'What is room rental management software?',
    answer:
      'It is software for letting a property by the room rather than as one whole unit: a record for each resident, occupancy down to the room or bed, one bill per resident, deposits, arrears and reporting, for one house or a whole portfolio. It is the model behind house shares, co-living, HMOs, hostels and student housing, where several people share a property and each pays their own rent.',
  },
  {
    question: 'How is it different from normal landlord software?',
    answer:
      'Normal landlord software assumes one tenant signs for one whole unit and pays one rent, so it cannot bill a room, show a house as part full, or keep separate balances for each person. Room rental software is built around the room and the bed: each resident is one record with one bill, and a five-bed house with four residents reads as four-fifths full.',
  },
  {
    question: 'Does it collect the rent, or just record it?',
    answer:
      'PulseHub records payments and issues receipts; it is not a payment gateway or direct-debit processor and does not move money. You collect by your usual method, and log what was paid so each resident’s balance, arrears and receipts stay correct. Part-payments are recorded as installments against one bill, with the balance carried forward.',
  },
  {
    question: 'Can it handle more than one property?',
    answer:
      'Yes. Every property sits in one portfolio view with occupancy, rent and collections per property, and you can scope a manager’s login to a single property. A resident can transfer between your properties, and move between rooms within a property, and their record and history follow them.',
  },
  {
    question: 'Who is room rental software for?',
    answer:
      'Anyone letting by the room: house-share and co-living operators, HMO landlords, hostel and boarding-house owners, and student-housing operators. If people rent a bed and pay monthly, or by the night, it fits. If you let whole flats to one tenant each, a standard landlord tool is enough.',
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
        { '@type': 'ListItem', position: 3, name: 'Room rental management software', item: url },
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

export default function RoomRentalManagementSoftwarePost() {
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
              Room rental management software lets a property by the room, not the whole unit: a record and one bill per
              resident, occupancy down to the room and bed, deposits and arrears, your own page to fill rooms, and every
              property in one view.
            </strong>{' '}
            It is built for the way house shares, co-living, HMOs, hostels and student housing actually run, where several
            people share a property and each pays their own rent.
          </P>
          <P>
            The problem with running that on ordinary landlord software is simple: it assumes one tenant, one unit, one
            rent. The moment a house holds five residents on five separate rents, each with their own deposit and their
            own arrears, a whole-unit tool cannot keep up. This guide covers what room rental software does, why generic
            tools do not fit, the features that matter, and one honest line on what it does with the money.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Room rental software is built around the room and the bed, not the whole unit.</li>
              <li>One bill per resident, with part-payments recorded as installments and a running balance.</li>
              <li>Occupancy stays true: a five-bed house with four residents reads as four-fifths full.</li>
              <li>It records payments and chases arrears; it is not a payment gateway and does not move money.</li>
              <li>One portfolio view for every property, with a free public page to fill rooms from your own link.</li>
            </ul>
          </aside>

          <H2 id="what-it-is">What room rental management software does</H2>
          <P>
            At its core it runs a property let by the room from one place: a record for each resident with their deposit,
            documents and history, true occupancy down to the room and bed, one bill that gathers rent and any shared
            costs, the payments against it, and a clear view of how each property is performing. Instead of a room list in
            one spreadsheet and a rent tracker in another, it keeps them together, for one house or a whole portfolio.
          </P>

          <H2 id="why-generic">Why ordinary landlord software does not fit</H2>
          <P>
            Most landlord tools are built on one assumption: one tenant signs for one whole unit and pays one rent. Letting
            by the room breaks every part of that. You have several residents under one roof, each on their own room or
            bed, each with a separate rent, deposit and move-in date. A whole-unit tool cannot bill a room, cannot show a
            house as part full, and turns every change of resident into a manual rebuild.
          </P>
          <P>
            Room rental software starts from the room instead. Each resident is one record with one bill, occupancy is
            tracked down to the bed and cannot be over-filled, and a resident moving out simply frees their bed for the
            next one, with the deposit settled and the history kept.
          </P>

          <H2 id="features">The features that matter</H2>
          <P>Use this as a checklist when you compare tools:</P>
          <UL>
            <li><strong>Room and bed-level occupancy</strong> that cannot be over-filled, so a five-bed house with four residents reads as four-fifths full.</li>
            <li><strong>One bill per resident,</strong> with rent and any shared costs together, part-payments tracked as installments and the real balance carried forward.</li>
            <li><strong>Deposits</strong> recorded against each resident and settled at move-out.</li>
            <li><strong>Arrears tracking and automatic reminders,</strong> so overdue rent is chased without you doing it by hand.</li>
            <li><strong>Shared-cost handling,</strong> such as metered electricity split between residents by their dates, and recurring charges for water, gas or broadband.</li>
            <li><strong>Your own public page,</strong> with live room availability, so prospects enquire with you directly.</li>
            <li><strong>Room and branch transfers,</strong> so a resident moving within or between your properties keeps their record and history.</li>
            <li><strong>Portfolio reporting,</strong> with occupancy and collections per property, and manager access scoped to one property.</li>
          </UL>

          <div className="mt-8">
            <ProductScreenshot src={screenshots.payments.src} alt={screenshots.payments.alt} width={screenshots.payments.width} height={screenshots.payments.height} label="Payments · rent & receipts per resident" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            <div className="mt-8">
              <ProductScreenshot src={screenshots.residents.src} alt={screenshots.residents.alt} width={screenshots.residents.width} height={screenshots.residents.height} label="Residents · deposits, arrears & history" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
            <div className="mt-8">
              <ProductScreenshot src={screenshots.properties.src} alt={screenshots.properties.alt} width={screenshots.properties.width} height={screenshots.properties.height} label="Every property · occupancy, rent & collections" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
          </div>

          <H2 id="pulsehub">How PulseHub fits</H2>
          <P>
            <A href={routes.sharedHousing}>PulseHub</A> is built for letting by the room and the bed, which is the whole
            point of room rental software. It organises each property into rooms and beds, keeps occupancy true, and every
            resident is one record with their deposit, documents and history. Each resident gets one bill, with
            part-payments recorded as installments, shared costs like metered electricity split between residents, arrears
            chased automatically, and every property in one portfolio view. Each property also gets a free public page with
            live availability, so you fill rooms from your own link.
          </P>
          <P>
            One honest boundary: PulseHub runs the operations and records payments, but it is not a payment gateway or
            direct-debit processor and does not move money. You collect your usual way and log what was paid, and the
            balances, arrears and receipts stay correct. It suits the shared-living models directly: see{' '}
            <A href={routes.hostel}>hostel management software</A>,{' '}
            <A href={routes.coliving}>co-living management software</A>,{' '}
            <A href={routes.hmo}>HMO management software</A> and{' '}
            <A href={routes.student}>student accommodation management software</A>. New to the category? Read{' '}
            <A href="/blog/what-is-a-property-management-system">what a property management system is</A>.
          </P>

          <Box title="In short">
            <P>
              If you let a property by the room, to several residents who each pay their own rent, you need software built
              around the room and the bed, not a whole-unit landlord tool. Look for true room and bed-level occupancy, one
              bill per resident, deposits and arrears handled, shared costs split fairly, your own page to fill rooms, and
              one view across every property.
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
        heading="Run your room rentals on one system."
        text="Rooms and beds, one bill per resident, deposits, arrears, shared costs and every property in one view. Start a 14-day free trial with no card required."
        secondaryHref={routes.sharedHousing}
        secondaryLabel="Property management software for shared housing"
      />
    </SiteShell>
  )
}
