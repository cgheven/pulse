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

const post = getBlogPost('tenant-deposit-management')!
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
    question: 'What is tenant deposit management?',
    answer:
      'It is keeping track of the deposit you hold for each resident: how much it is, what it covers, and settling it against the final bill when they move out, so you know exactly what to refund or collect. For room-by-room operators it is per resident, not per property, because each room has its own deposit.',
  },
  {
    question: 'How does PulseHub handle deposits?',
    answer:
      'PulseHub records the deposit against each resident, shows the refundable balance, and at move-out settles it against any outstanding rent and the final utility charge, so the amount to refund or collect is clear. You can also set an optional fixed monthly maintenance charge drawn from the deposit instead of billed, where you use that model.',
  },
  {
    question: 'Does PulseHub protect deposits in a government scheme?',
    answer:
      'No. In places that require it, such as England, a deposit taken on an assured shorthold tenancy must be protected in a government-approved scheme within a legal time limit. PulseHub records and settles the deposit, but it does not lodge it with a scheme on your behalf, so that step stays with you. This is general information, not legal advice.',
  },
  {
    question: 'Can I see what to refund at move-out?',
    answer:
      'Yes. At check-out PulseHub brings the final charges, outstanding dues and the deposit together, so you can see the net amount to refund to the resident or still collect from them, and record it against their history.',
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
        { '@type': 'ListItem', position: 3, name: 'Tenant deposit management', item: url },
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

export default function TenantDepositManagementPost() {
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
              Deposits are simple until a resident moves out. Then the questions arrive at once: how much did we hold,
              what do we owe them, what do they owe us, and can we prove it? Tenant deposit management is just keeping
              those answers straight from the day the deposit comes in, room by room.
            </strong>{' '}
            Here is how to do it cleanly, and one legal step that is yours alone.
          </P>

          <H2 id="record">Record the deposit against the resident</H2>
          <P>
            For room-by-room operators, a deposit belongs to a resident, not a property, so record it on each
            resident&rsquo;s own record: the amount, when it was taken, and what it is held against. PulseHub keeps the
            deposit on the resident and shows the refundable balance at a glance, so it is never a figure you have to go
            looking for later.
          </P>

          <H2 id="settle">Settle it against the final bill at move-out</H2>
          <P>
            The move-out is where deposits get messy if the numbers live in different places. The clean way is to bring
            them together: the final rent, any outstanding dues, the last utility charge, and the deposit. PulseHub does
            this at check-out, settling the deposit against what is owed and showing the net amount to refund to the
            resident or still collect from them. The room returns to vacant and the resident&rsquo;s history stays on
            file.
          </P>

          <H2 id="scheme">The one step that stays with you</H2>
          <P>
            There is a legal step that software does not do for you. In places that require it, such as England, a deposit
            taken on an assured shorthold tenancy must be protected in a government-approved deposit protection scheme
            within a legal time limit, and the prescribed information served to the tenant. PulseHub records and settles
            the deposit, but it does not lodge it with a scheme on your behalf. Confirm what applies where you operate;
            this is general information, not legal advice.
          </P>

          <H2 id="good">What good deposit management looks like</H2>
          <UL>
            <li>Every deposit recorded against the right resident, with its amount and date.</li>
            <li>The refundable balance visible without digging through receipts.</li>
            <li>Move-out settlement that nets the deposit against final charges in one view.</li>
            <li>A clear record of what was refunded or collected, kept with the resident&rsquo;s history.</li>
            <li>Where required, the deposit protected in the correct scheme, on time.</li>
          </UL>

          <H2 id="next">Where to go next</H2>
          <P>
            Deposits are one part of running rooms. See how PulseHub handles{' '}
            <A href={routes.hmoBilling}>rent and utility billing</A>, read the{' '}
            <A href="/blog/how-to-manage-a-rooming-house">rooming house</A> guide, or explore the wider{' '}
            <A href={routes.sharedHousing}>shared-housing platform</A>.
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
        heading="Keep every deposit straight"
        text="Record deposits per resident, settle them at move-out, and see exactly what to refund. Start a 14-day free trial with no card required."
        secondaryHref={routes.sharedHousing}
        secondaryLabel="Shared-housing platform"
      />
    </SiteShell>
  )
}
