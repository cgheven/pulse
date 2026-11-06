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

const post = getBlogPost('rooming-house-management-software-australia')!
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
    question: 'What is rooming house management software?',
    answer:
      'It is software that runs a rooming or boarding house, where residents rent a room rather than a whole property: who is in which room, what they owe, what has been paid, maintenance, and how each house is performing. It is built for room-by-room letting with its own residents, rents and turnover.',
  },
  {
    question: 'Does it work for rooming houses in Australia, in Australian dollars?',
    answer:
      'Yes. PulseHub sets the currency, date format and wording to your market, so your rooms, rent and receipts are in Australian dollars. It suits rooming and boarding house operators and share-house managers in Victoria, New South Wales, Queensland and beyond.',
  },
  {
    question: 'Does it handle rooming house registration and compliance?',
    answer:
      'Being clear: PulseHub runs the operational side, who is in which room, their rent, bond and maintenance, and the records behind them. It does not register your rooming house with Consumer Affairs Victoria or the relevant state body, or give legal advice, so meeting rooming house standards and registration stays your responsibility. It keeps the records that make that easier.',
  },
  {
    question: 'How are rent and bonds handled?',
    answer:
      'Each resident has one bill, and part-payments are recorded as instalments with their own date and receipt, with the balance carried forward. Bonds are held against each record and settled at the end. PulseHub records payments and issues receipts; it is not a payment gateway, so you log what was paid and a receipt goes out.',
  },
  {
    question: 'Can I run more than one house?',
    answer:
      'Yes. Switch between houses on one login, move a resident or a room between them, and see every house together with occupancy, collections and costs side by side. A manager can be given access to just their own house.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes. You can start a 14-day free trial with no card required, then book a demo if you would like a walkthrough for your houses.',
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
        { '@type': 'ListItem', position: 3, name: 'Rooming house management software in Australia', item: url },
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

export default function RoomingHouseAustraliaPost() {
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
              Rooming house management software for Australia runs a rooming or boarding house from one place: who is in
              which room, one bill per resident in Australian dollars, bonds and payments, maintenance, and every house in
              one view.
            </strong>{' '}
            It is built for letting room by room, each with its own resident and rent, the way rooming houses actually
            run, not the whole-property model a standard rental tool assumes.
          </P>
          <P>
            Rooming houses are some of the hardest properties to run on a spreadsheet: rooms turn over often, residents
            pay weekly or fortnightly, bonds come and go, maintenance is constant, and the rules are strict. If you run
            rooming or boarding houses in Melbourne, Sydney, Brisbane or a regional town, this guide covers what the
            software does, why a standard rental tool does not fit, the features that matter here, and how to choose.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Rooming houses are let room by room, so they need room-level software, not a whole-property tool.</li>
              <li>One bill per resident in Australian dollars, with rent paid weekly, fortnightly or monthly and recorded as part-payments.</li>
              <li>Bonds are held and settled; payments are recorded with receipts, it is not a gateway.</li>
              <li>PulseHub runs operations and keeps records, but does not register your house with Consumer Affairs Victoria.</li>
              <li>A single view across every house keeps a growing portfolio manageable.</li>
            </ul>
          </aside>

          <H2 id="what-it-is">What rooming house software is</H2>
          <P>
            It is software that runs a house&rsquo;s daily operations from one place: a record for every resident with
            their bond and history, true occupancy room by room, one bill that gathers rent and any charges, the payments
            against it, and a clear view of how each house is doing. Instead of a room list in one spreadsheet and a rent
            book in another, it keeps them together, for one house or a whole portfolio.
          </P>

          <H2 id="why-generic">Why a standard rental tool does not fit</H2>
          <P>
            Most property tools assume one tenant signs for one whole property and pays one rent. A rooming house does not
            work like that: each room is let on its own, to its own resident, with its own rent and bond, and residents
            come and go often. Run that on a whole-property tool and you cannot bill a room, cannot see a house as part
            full, and every move-in and move-out becomes a manual edit.
          </P>

          <H2 id="features">The features that matter in Australia</H2>
          <P>Use this as a checklist when you compare tools:</P>
          <UL>
            <li><strong>Room-level occupancy</strong> that cannot be over-filled, so a house with eight of ten rooms taken reads as eighty per cent full.</li>
            <li><strong>One bill per resident in Australian dollars,</strong> with rent collected weekly, fortnightly or monthly and recorded as part-payments.</li>
            <li><strong>Bonds</strong> held against each record and settled at the end of the residency.</li>
            <li><strong>Payments recorded with receipts,</strong> so collections are never a guess and you have a clean record for your accountant.</li>
            <li><strong>Complaints logged</strong> and tracked to resolution against the room.</li>
            <li><strong>A record per resident,</strong> with documents, emergency contact and full history.</li>
            <li><strong>A portfolio view</strong> across every house, with occupancy and collections per house, and manager access scoped to one house.</li>
            <li><strong>Your own public page,</strong> with live room availability, so you fill rooms directly.</li>
          </UL>

          <div className="mt-8">
            <ProductScreenshot src={usScreenshots.payments.src} alt={usScreenshots.payments.alt} width={usScreenshots.payments.width} height={usScreenshots.payments.height} label="Payments · rent & receipts in dollars" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            <div className="mt-8">
              <ProductScreenshot src={usScreenshots.tenants.src} alt={usScreenshots.tenants.alt} width={usScreenshots.tenants.width} height={usScreenshots.tenants.height} label="Residents · deposits, waiting list & check-out" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
            <div className="mt-8">
              <ProductScreenshot src={usScreenshots.allProperties.src} alt={usScreenshots.allProperties.alt} width={usScreenshots.allProperties.width} height={usScreenshots.allProperties.height} label="Every house · occupancy, rent & collections" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
          </div>

          <H2 id="pulsehub">How PulseHub fits</H2>
          <P>
            <A href={routes.sharedHousing}>PulseHub</A> is built for renting by the room and the bed, which is exactly the
            rooming house model. It organises each house into rooms, keeps occupancy true, and every resident is one
            record with their documents, bond and history. Each resident gets one bill in Australian dollars, with rent
            paid weekly, fortnightly or monthly and recorded as part-payments, bonds settled at the end, and every house
            in one portfolio view. Each house also gets a free public page with live availability, so you fill rooms from your
            own link.
          </P>
          <P>
            One honest boundary: PulseHub runs the operations and records payments, but it does not register your rooming
            house with Consumer Affairs Victoria or the relevant state authority, and it is not legal advice, so meeting
            rooming house standards stays your responsibility. For related reading, see{' '}
            <A href="/blog/how-to-run-a-boarding-house">how to run a boarding house</A> and{' '}
            <A href={routes.sharedHousing}>property management software for shared housing</A>; for the market, see{' '}
            <A href={routes.australia}>PulseHub for Australia</A>.
          </P>

          <Box title="In short">
            <P>
              If you run rooming or boarding houses in Australia, room by room, in Australian dollars, and often more than
              one, you need software built for that model, not a whole-property rental tool. Look for true room-level
              occupancy, one bill per resident, bonds held and settled, payments recorded with receipts, and a single view
              across every house.
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
        heading="Run your rooming houses on one system."
        text="Rooms and residents, one bill per resident in Australian dollars, bonds, maintenance and every house in one view. Start a 14-day free trial with no card required."
        secondaryHref={routes.sharedHousing}
        secondaryLabel="Property management for shared housing"
      />
    </SiteShell>
  )
}
