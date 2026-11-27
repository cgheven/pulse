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

const post = getBlogPost('padsplit-alternative')!
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
    question: 'Is PulseHub like PadSplit?',
    answer:
      'No, and the difference matters before you choose. PadSplit is a marketplace: it lists rooms, screens and places members, handles their weekly payments and takes a share, and residents join on PadSplit&rsquo;s terms. PulseHub is software you run yourself. Your residents are your residents, your brand is your brand, and the operation (beds, bills, deposits, occupancy) sits in one place you control. One brings you a platform and its audience; the other gives you the tools to run your own rooms.',
  },
  {
    question: 'Does PulseHub find tenants for me?',
    answer:
      'No. PulseHub is not a marketplace and does not bring you residents. What it gives you is a free public listing page for each property at yourname.hostels.yourpulse.io, with live availability, photos, prices and an application form you can share anywhere. You market your own rooms through that page, local channels and word of mouth. If being handed a stream of ready members is the main thing you want, a marketplace like PadSplit does that job and PulseHub does not.',
  },
  {
    question: 'Are there marketplace fees or a cut of rent?',
    answer:
      'PulseHub does not sit between you and your residents, so it takes no share of rent and charges no per-member marketplace fee. You pay per property to use the software, with a 14-day free trial and no card required. Rent is paid to you directly through your own bank, cash or local wallets, and the full amount is yours. That is the trade: a marketplace earns its cut by sending you members, while PulseHub is a tool you run on rooms you fill yourself.',
  },
  {
    question: 'How are payments handled?',
    answer:
      'PulseHub records payments, it does not process them. It is not a payment gateway and does no card processing. Rent arrives through your own bank, cash or local wallets, and you log it against each resident&rsquo;s monthly bill. The system supports partial payments and installments, carries dues forward, applies discounts, and issues numbered receipt PDFs and single-use shareable receipt links. So you get a clear running record of who has paid what, without handing collection or a cut of the money to a platform.',
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
        { '@type': 'ListItem', position: 3, name: 'PadSplit alternative', item: url },
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

export default function PadSplitAlternativePost() {
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
              If you want to run rent-by-the-room housing on your own terms, under your own brand and keeping the full
              rent, you are not looking for another marketplace. You are looking for software to run the operation.
            </strong>{' '}
            That is a different kind of tool from PadSplit, and the choice turns on whether you want a platform to place
            members for you, or the system to fill and run your own rooms. Here is the honest version of that choice.
          </P>

          <H2 id="what-padsplit-is">What PadSplit is, and why operators look past it</H2>
          <P>
            PadSplit is a US marketplace and management platform for affordable rent-by-the-room housing. It lists your
            rooms to its audience, screens and places members, handles weekly member payments and a slice of the
            management, and in return charges hosts fees and takes a share. For an operator who wants demand handed to
            them and does not mind running on someone else&rsquo;s platform, that is a genuine service and it suits plenty
            of hosts well.
          </P>
          <P>
            The reasons operators look past it are just as real. Your residents are PadSplit members on PadSplit&rsquo;s
            terms, not yours. The brand the resident sees is the platform&rsquo;s, the payment relationship runs through
            the platform, and the fees come out of your margin. None of that is a flaw in PadSplit; it is simply what a
            marketplace is. The question is whether you would rather own that relationship yourself.
          </P>

          <H2 id="own-rooms">What changes when you run your own rooms</H2>
          <P>
            Running your own rooms flips a few things. The listing is yours, so the name residents remember is yours. The
            resident is your tenant on your agreement, not a member placed by a platform. Rent comes to you in full,
            because no one is taking a cut on the way through. And the margin that a marketplace fee would have absorbed
            stays in the business. The trade is that filling the rooms is now your job, not a platform&rsquo;s, which is
            exactly what the right software should make easier.
          </P>

          <H2 id="pulsehub">What PulseHub gives you</H2>
          <P>
            <A href={routes.us}>PulseHub</A> is software you run to operate shared-living housing, and it is built around
            the parts of rent-by-the-room that spreadsheets handle badly.
          </P>
          <UL>
            <li><strong>Bed-level occupancy</strong>, modelling floors, rooms and beds so a 6-bed room with 3 residents reads as half full and a vacancy shows the day it opens.</li>
            <li><strong>One automatic monthly bill per resident</strong> for room rent plus a metered share of electricity, split between roommates by their join dates, with recurring water and gas.</li>
            <li><strong>A metered utility split</strong> from meter photos, re-priced if a reading is corrected, so each person pays their real share rather than a flat guess.</li>
            <li><strong>Deposits tracked per resident</strong>, settled against the final bill at move-out.</li>
            <li><strong>A free public listing page</strong> for each property at yourname.hostels.yourpulse.io, with live availability, photos, prices and an application form for your own rooms.</li>
          </UL>

          <H2 id="not-replace">Where PulseHub does not replace PadSplit</H2>
          <P>
            To be upfront: PulseHub is software you run, not a marketplace that brings you tenants. It will not place
            members or send you demand. You market your own rooms through your listing page and your own channels, and if
            a steady supply of ready members is the main reason you use PadSplit, PulseHub does not do that part. It also
            records payments rather than processing them, so it is not a payment gateway and does no card processing; rent
            arrives through your own bank, cash or local wallets and you log it against each bill. If you want to own the
            residents, the brand and the full rent, read{' '}
            <A href={postPath('how-to-manage-a-rooming-house')}>how to manage a rooming house</A>, see{' '}
            <A href={postPath('sro-management-software')}>SRO management software</A>, or explore{' '}
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
        heading="Run your own rooms, keep the full rent"
        text="Own the residents, the brand and the margin instead of renting them from a marketplace. Start a 14-day free trial with no card required."
        secondaryHref={routes.us}
        secondaryLabel="PulseHub for the US"
      />
    </SiteShell>
  )
}
