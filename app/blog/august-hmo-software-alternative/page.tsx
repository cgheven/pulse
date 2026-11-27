import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('august-hmo-software-alternative')!
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
    question: 'Does PulseHub do open-banking rent matching like August?',
    answer:
      'No. Connecting to your bank and automatically matching incoming rent is one of August’s standout features, and if automated reconciliation is what you want, August is built for it. PulseHub records payments as you log them and produces reports, but reconciliation is a manual report rather than automatic bank matching. The two tools focus on different parts of the job.',
  },
  {
    question: 'Can PulseHub file my Making Tax Digital returns?',
    answer:
      'No. August handles Making Tax Digital (MTD) tax submissions, which suits self-managing landlords who want tax filing built into their software. PulseHub is not MTD or tax-filing software. It keeps records of rent, bills and deposits and reports on them, so you or your accountant still handle the tax submission separately.',
  },
  {
    question: 'What does PulseHub do that tax-focused software does not?',
    answer:
      'PulseHub runs the day-to-day operation of a shared house. It keeps bed-level occupancy true, produces one monthly bill per resident with a metered electricity share, tracks deposits per resident, costs the kitchen or mess, and gives each property a free public listing page. That operational layer, who is in which bed and what each person owes this month, is separate from the bank-matching and tax focus of a tool like August.',
  },
  {
    question: 'Can I use PulseHub and tax software together?',
    answer:
      'Yes, and many operators will. PulseHub runs the operation and keeps clean records of income, bills and deposits, which you can hand to an accountant or into tax software for the submission itself. PulseHub does not replace MTD filing or automatic bank reconciliation, so pairing it with a tool that covers those is a sensible setup rather than a compromise.',
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
        { '@type': 'ListItem', position: 3, name: 'August alternative', item: url },
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
  return (
    <Link href={href} className="font-medium text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
      {children}
    </Link>
  )
}

export default function AugustAlternativePost() {
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
              August and PulseHub both serve HMO operators, but they point at different problems: August automates the
              money and the tax, while PulseHub runs the day-to-day operation of the house.
            </strong>{' '}
            This is not a ranking. It is a question of which focus fits the way you work, so here is what each tool is built
            to do and how to tell which lane is yours.
          </P>

          <H2 id="august">What August is built for</H2>
          <P>
            August is UK property software aimed at self-managing landlords and HMO operators who want the finances to look
            after themselves. Its standout features are automation on the money side: it connects to your bank via open
            banking to automatically match incoming rent against what is due, and it handles Making Tax Digital (MTD) tax
            submissions. For a landlord whose main pain is chasing which payment landed and getting the tax return filed,
            that is a strong, focused offering, and August does it well.
          </P>
          <P>
            If your portfolio is settled, your billing is simple, and the friction you feel is reconciliation and tax, that
            is a genuine fit. August is built to take those two jobs off your desk.
          </P>

          <H2 id="operation">PulseHub&rsquo;s different focus: the day-to-day operation</H2>
          <P>
            <A href={routes.hmo}>PulseHub</A> aims at a different part of the week. Its focus is the running of the house
            itself: who is in which bed, what each person owes once bills are split, and whose deposit is still held.
          </P>
          <UL>
            <li><strong>Bed-level occupancy</strong> kept true across floors, rooms and beds, so a part-full room and a new vacancy are visible the day they happen.</li>
            <li><strong>One bill per resident</strong> for rent plus a metered electricity share split by each person&rsquo;s join dates, with recurring water and gas and meals where included.</li>
            <li><strong>Deposits tracked per resident</strong> and settled against the final bill at move-out.</li>
            <li><strong>Kitchen and mess costing</strong> where you feed residents, and a free public listing page per property with live availability and an application form.</li>
          </UL>
          <P>
            For England there is also a compliance certificate tracker for gas safety, EICR, EPC, fire alarm and HMO
            licence, with per-property deadlines. It is a reminder tool to keep certificates current, not legal advice.
          </P>

          <H2 id="not">Being clear about what PulseHub does not do</H2>
          <P>
            PulseHub does <strong>not</strong> do August&rsquo;s headline jobs. There is <strong>no open-banking automatic
            rent matching</strong>: PulseHub records payments as you enter them, it is not a payment gateway, and
            reconciliation is a manual report rather than automatic bank matching. There is also <strong>no MTD or
            tax filing</strong>. PulseHub is not a full accounting or general-ledger suite. It keeps the records and
            reports; it does not submit your tax or reconcile your bank feed for you.
          </P>

          <H2 id="which">Which one fits you</H2>
          <UL>
            <li><strong>Pain is reconciliation and tax?</strong> August&rsquo;s open-banking matching and MTD filing are built for exactly that.</li>
            <li><strong>Pain is running the house?</strong> Bed-level occupancy, per-resident bills and deposits are where PulseHub lives.</li>
            <li><strong>Both?</strong> Run the operation in PulseHub and keep August, or similar, for bank matching and tax; clean records flow from one to the other.</li>
          </UL>
          <P>
            To see PulseHub&rsquo;s operational side in detail, read about{' '}
            <A href={postPath('hmo-tenant-management')}>HMO tenant management</A>, how{' '}
            <A href={postPath('bills-included-hmo-fair-usage')}>bills-included HMO fair usage</A> is handled, and the{' '}
            <A href={postPath('hmo-compliance')}>HMO compliance</A> tracker.
          </P>

          <section className="mt-16">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">Frequently asked questions</h2>
            <div className="mt-6">
              <FaqList items={faqs} />
            </div>
          </section>
        </div>
      </article>

      <CtaBand
        heading="For operators whose focus is running the house"
        text="If your day goes on beds, bills and deposits rather than bank feeds, see PulseHub on your own properties. Start a 14-day free trial with no card required."
        secondaryHref={routes.hmo}
        secondaryLabel="HMO management software"
      />
    </SiteShell>
  )
}
