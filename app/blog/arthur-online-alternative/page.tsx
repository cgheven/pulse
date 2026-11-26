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

const post = getBlogPost('arthur-online-alternative')!
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
    question: 'Is PulseHub a replacement for Arthur Online?',
    answer:
      'For HMO and shared-housing operators who let by the room, it can be. PulseHub is built around bed-level occupancy, one monthly bill per resident, and deposits tracked per person, which is the daily work of running a room-let property. Arthur Online is a broader platform for landlords and agents with mixed or larger portfolios, with lettings, maintenance workflows and owner portals. If you let whole units and need agency features, Arthur fits that lane better.',
  },
  {
    question: 'Does PulseHub integrate with Xero or QuickBooks?',
    answer:
      'No. Arthur Online integrates with accounting packages such as Xero and QuickBooks, which suits operators who run their books in those tools. PulseHub records payments and produces reports, but it is not a full accounting suite and does not sync to a general ledger. If a tight accounting integration is central to how you work, that is a reason to stay with a platform built around it.',
  },
  {
    question: 'Can PulseHub split bills between tenants in a shared house?',
    answer:
      'Yes. PulseHub produces one automatic monthly bill per resident: rent, a metered share of electricity split by each person’s join dates, recurring water and gas, and meals if they are included. That per-resident split is the point. It means each person sees only their own charge rather than a single invoice for the whole house that someone then has to divide by hand.',
  },
  {
    question: 'Does PulseHub have an owner or landlord portal like Arthur?',
    answer:
      'No. Arthur Online offers tenant and owner portals, which matter if you manage property on behalf of other landlords and need to report to them. PulseHub is built for the operator running the property directly, not for an agency serving third-party owners. If owner reporting through a portal is a core requirement, an agency platform is the better match.',
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
        { '@type': 'ListItem', position: 3, name: 'Arthur Online alternative', item: url },
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

export default function ArthurOnlineAlternativePost() {
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
              If you run HMOs or shared housing and let by the room, the honest question is not whether Arthur Online is
              good software, it is whether a broad agency platform matches work that happens at the level of a single bed.
            </strong>{' '}
            Arthur Online is a capable, well-established tool. This is a straight look at who it suits, and where a
            purpose-built room-let system like PulseHub earns its place instead.
          </P>

          <H2 id="arthur">What Arthur Online is built for</H2>
          <P>
            Arthur Online is a UK property management platform aimed at landlords and letting agents who run mixed or
            larger portfolios. Its strengths are breadth: lettings management across property types, structured
            maintenance workflows, tenant and owner portals, and integrations with accounting packages such as Xero and
            QuickBooks. Priced from around £19 a month, it is agency-friendly and designed to sit at the centre of a
            business that manages whole units, often on behalf of other owners.
          </P>
          <P>
            If that describes you (a varied portfolio of flats and houses let as whole units, or an agency reporting to
            landlord clients) Arthur does that job well. It is a genuine fit for operators whose complexity lives in the
            spread of property types and the relationships with owners, rather than in the mechanics of a single shared
            house.
          </P>

          <H2 id="by-the-room">When you let by the room, not the unit</H2>
          <P>
            Room-let operators have a different kind of complexity. The property is not one tenancy, it is five, eight or
            twelve people sharing a kitchen, each on their own dates, each owing a slightly different amount once bills are
            split. A whole-unit view cannot see a half-full room or tell you the day a bed fell vacant. The work that
            actually eats the week, who is in which bed, what each person owes this month, whose deposit is still held, is
            exactly the work a broad platform treats as a footnote.
          </P>

          <H2 id="pulsehub">What PulseHub does for shared-housing operators</H2>
          <P>
            <A href={routes.hmo}>PulseHub</A> is built from the bed up. Properties break down into floors, rooms and beds,
            and occupancy is kept true at bed level, so a part-full room reads as part-full and a vacancy shows the day it
            happens.
          </P>
          <UL>
            <li><strong>One monthly bill per resident</strong> covering rent, a metered electricity share split by each person&rsquo;s join dates, recurring water and gas, and meals where included.</li>
            <li><strong>Deposits tracked per resident</strong> and settled against the final bill at move-out, rather than held against a whole tenancy.</li>
            <li><strong>A free public listing page per property</strong> with live availability and an application form, so empty beds can be advertised without a channel manager.</li>
            <li><strong>An England-only compliance certificate tracker</strong> for gas safety, EICR, EPC, fire alarm and HMO licence, with per-property deadlines (this is a reminder tool, not legal advice).</li>
          </UL>
          <P>
            PulseHub records payments rather than processing them, so it is not a payment gateway, but it handles partial
            payments, dues carried forward, discounts and numbered receipt PDFs with shareable links. It runs a
            multi-property portfolio and adapts per market, with per-property pricing and a 14-day free trial that needs no
            card.
          </P>

          <H2 id="not">Where PulseHub is not the answer</H2>
          <P>
            It is worth being blunt about the limits. PulseHub is <strong>not a full accounting or general-ledger
            suite</strong>: it records income and produces reports, but there is no automatic bank reconciliation or
            open-banking rent matching, and it is not tax-filing software. It is also <strong>not an agency or
            owner-portal platform</strong>. If you manage property for third-party landlords and need owner portals and
            accounting-package sync, Arthur Online is built for that and PulseHub is not.
          </P>
          <P>
            The deciding question is simple. If your difficulty is a spread of whole units and owner reporting, stay broad.
            If it is running shared houses bed by bed, see{' '}
            <A href={postPath('hmo-management-software')}>HMO management software</A>, read how to{' '}
            <A href={postPath('manage-multiple-hmo-properties-without-spreadsheets')}>manage multiple HMO properties without spreadsheets</A>, or look at PulseHub for{' '}
            <A href={routes.sharedHousing}>shared and co-living housing</A>.
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
        heading="Built for operators who let by the room"
        text="If your complexity lives at bed level, see PulseHub on your own properties. Start a 14-day free trial with no card required."
        secondaryHref={routes.hmo}
        secondaryLabel="HMO management software"
      />
    </SiteShell>
  )
}
