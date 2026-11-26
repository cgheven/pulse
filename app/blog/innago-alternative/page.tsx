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

const post = getBlogPost('innago-alternative')!
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
    question: 'Is PulseHub a good Innago alternative?',
    answer:
      'If you rent by the room or the bed, yes. Innago is free, easy-to-use software for landlords letting whole units, with online rent collection, screening and maintenance. PulseHub is built for the opposite job: several residents under one roof, each renting a room, each with their own bill, deposit and move-in date. The more your operation is room-by-room, the better PulseHub fits.',
  },
  {
    question: 'How is PulseHub different from Innago?',
    answer:
      'The unit of management. Innago manages units and leases; PulseHub manages rooms and beds, with one bill per resident for rent and a metered share of utilities, bed-level occupancy, and deposits settled at move-out. There is also a payments difference: Innago collects rent online as a payment platform, while PulseHub records payments rather than processing them, so rent still arrives through your own bank, cash or payment app.',
  },
  {
    question: 'Is PulseHub free like Innago?',
    answer:
      'No. Innago is free to landlords and makes its money on payment and screening fees. PulseHub uses per-property plans with a 14-day free trial and no card required. If a free whole-unit tool covers your needs, Innago is hard to beat on price; if you need room-level operations it was not built for, PulseHub is built for that.',
  },
  {
    question: 'Does PulseHub collect rent online like Innago?',
    answer:
      'No, and it is worth being clear about it. PulseHub records payments, deposits, discounts and arrears and reports on them, but it is not a payment gateway. Residents pay you through your own bank, cash or payment app, and you mark it in PulseHub, which then issues a numbered receipt. If online card or ACH rent collection is essential, pair PulseHub with a payment tool or keep that part with Innago.',
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
        { '@type': 'ListItem', position: 3, name: 'Innago alternative', item: url },
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

export default function InnagoAlternativePost() {
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
              Innago is a genuinely good deal: free property management software for landlords, with online rent
              collection, tenant screening and maintenance requests. It is built around a clear model, though: whole
              units on their own leases. If you rent by the room or the bed, that model asks you to work around it.
            </strong>{' '}
            This is an honest look at where each fits. We make PulseHub, so treat it as our considered case, and check
            both against how you actually operate.
          </P>

          <H2 id="what-innago">What Innago is built for</H2>
          <P>
            Innago manages units and leases for small and mid-sized landlords: one tenant on one lease for one unit, with
            rent collected online, applicants screened, and maintenance tracked. It is free to the landlord, which is a
            real strength, and for a portfolio of flats or single-family rentals it covers the essentials well. The
            assumption underneath is one tenant per unit, and that is the assumption that breaks when you let a house room
            by room.
          </P>

          <H2 id="what-pulsehub">What PulseHub is built for</H2>
          <P>
            <A href={routes.us}>PulseHub</A> manages rooms and beds. It models each property as rooms and beds, so a
            six-bed house with four residents reads as four sixths full, bills each resident separately, and keeps
            occupancy true so a bed is never double-counted. It is built for co-living, rooming houses, SROs, off-campus
            student housing and shared houses, where the unit of management is the room, not the whole property.
          </P>
          <UL>
            <li><strong>One bill per resident,</strong> for room rent plus a metered share of electricity split between residents by room and move-in date, with water and gas as recurring charges.</li>
            <li><strong>Bed-level occupancy,</strong> so a part-full room reads as part-full and a vacancy shows the day it happens.</li>
            <li><strong>Deposits per resident,</strong> tracked and settled against the final bill at move-out, with the refund due visible.</li>
            <li><strong>A public listing page per property</strong> to advertise rooms and take inquiries directly, with live availability.</li>
          </UL>

          <H2 id="honest">Two honest differences</H2>
          <P>
            Being straight about the trade-offs: first, price. Innago is free and earns on payment and screening fees;
            PulseHub uses per-property plans with a 14-day free trial. Second, payments. Innago collects rent online as a
            payment platform, while PulseHub records payments rather than processing them, so rent reaches you through your
            own bank, cash or payment app and you mark it paid, which issues a receipt. If free, built-in online rent
            collection for whole units is what you need, Innago is excellent. If you need room-level operations, that is
            the lane PulseHub is built for.
          </P>

          <H2 id="next">See it on your own rooms</H2>
          <P>
            If you rent by the room, see <A href={routes.us}>PulseHub for US operators</A>, the guide to{' '}
            <A href={postPath('room-rental-management-software')}>room rental management software</A>, how to{' '}
            <A href={postPath('how-to-manage-a-rooming-house')}>manage a rooming house</A>, or{' '}
            <A href={routes.coliving}>co-living management</A>.
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
        heading="Built for renting by the room"
        text="If a whole-unit tool is fighting your room-by-room operation, see PulseHub on your own rooms. Start a 14-day free trial with no card required."
        secondaryHref={routes.us}
        secondaryLabel="PulseHub for the US"
      />
    </SiteShell>
  )
}
