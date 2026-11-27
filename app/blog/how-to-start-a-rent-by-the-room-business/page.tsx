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

const post = getBlogPost('how-to-start-a-rent-by-the-room-business')!
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
    question: 'Is renting by the room more profitable than a single lease?',
    answer:
      'Usually yes. Letting a four-bedroom house room by room typically brings in more than letting the whole house to one household, because you are selling four spaces instead of one. The trade-off is more turnover, more bills to split and more admin per property, which is exactly why room-by-room operators lean on software to keep the extra work manageable.',
  },
  {
    question: 'Do I need a licence to rent out rooms?',
    answer:
      'It depends entirely on where you are. Many cities and states have zoning, occupancy and licensing rules for renting rooms or running a boarding or rooming house, and some cap the number of unrelated people in one dwelling. Rules vary widely, so check your city and state requirements before you start. This is general information, not legal advice.',
  },
  {
    question: 'How do I split utilities between rooms?',
    answer:
      'Two common approaches work well. You can charge each resident a metered share of electricity, split by the dates they actually lived there, plus a recurring amount for water and gas. Or you can fold a flat fair-usage utility figure into the room rent. PulseHub itemises the share on one monthly bill per resident, so everyone can see what they are paying for.',
  },
  {
    question: 'Does PulseHub find tenants for my rooms?',
    answer:
      'No. PulseHub gives each property a free public listing page with live availability and an application form, which is a link you share and advertise yourself. It is not a marketplace or booking site that brings you residents. You still market your rooms on room-rental sites and your own channels; PulseHub then runs the operation once people apply and move in.',
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
        { '@type': 'ListItem', position: 3, name: 'How to start a rent-by-the-room business', item: url },
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

export default function HowToStartRentByTheRoomPost() {
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
              Starting a rent-by-the-room business means treating each room as its own little tenancy: its own rent, its
              own share of the bills, its own deposit and agreement, and its own line in your records.
            </strong>{' '}
            Done right, letting a house room by room earns more than a single lease. The catch is the admin, which multiplies
            with every resident. Here is a practical step-by-step way to set it up and keep it under control.
          </P>

          <H2 id="rules">Step 1: Check the local rules first</H2>
          <P>
            Before you advertise a single room, understand what your city and state allow. Zoning can limit which
            properties may be let as rooms, occupancy rules can cap how many unrelated people share a dwelling, and some
            places require a licence to run a rooming or boarding house. These rules vary a lot from one city to the next,
            so check with your local authority first. It is worth a short conversation with a local attorney or your city
            planning office before you commit money to a property, because a rule you missed can turn a profitable house
            into one you are forced to unwind. Treat this as general information, not legal advice, and confirm the
            specifics for your area.
          </P>

          <H2 id="rooms">Step 2: Set up rooms and per-room rent</H2>
          <P>
            Map the property the way you will actually let it. PulseHub models floors, then rooms, then beds, and keeps
            occupancy true at bed level, so a four-bedroom house with one shared double reads correctly rather than as a
            single unit. Set a rent for each room based on size, light and whether it has its own bathroom. Pricing per
            room, not per house, is the core move that makes this model work. For the mechanics, see{' '}
            <A href={postPath('room-rental-management-software')}>room rental management software</A>.
          </P>

          <H2 id="bills">Step 3: Split the bills fairly</H2>
          <P>
            With several residents under one roof, the bills question comes up fast. The fair approach is to give each
            resident a metered or fair share of utilities rather than one lump sum for the house. PulseHub produces one
            automatic monthly bill per resident: rent, plus a metered share of electricity split by join dates, plus
            recurring water and gas, plus meals if you provide them. Because the electricity share follows the dates people
            actually lived there, a resident who moves in halfway through the month pays for half the month, not a full one,
            which is the detail that makes a split feel fair. Everyone sees what they owe and why, which heads off most
            arguments.
          </P>

          <H2 id="deposits">Step 4: Handle deposits and agreements</H2>
          <P>
            Take a deposit per resident and give each room its own written agreement, so one person leaving does not unravel
            the others. PulseHub records each deposit against the resident and helps you settle it against the final bill at
            move-out, with deductions itemised. It records the agreement and documents too. Note that it records payments
            rather than processing them: it is not a payment gateway, so money still moves through your own bank or
            processor.
          </P>

          <H2 id="residents">Step 5: Find your residents</H2>
          <P>
            Marketing is on you, and you want two channels working together. First, your own free public listing page: every
            PulseHub property gets one, with live availability and an application form you can link anywhere. Second, the
            room-rental sites your audience already browses. Post the rooms there and point applicants to your page. Be
            clear-eyed about what the software does here: it gives you a page to advertise, it is not a marketplace that
            finds residents for you.
          </P>

          <H2 id="run">Step 6: Run it room by room</H2>
          <P>
            Once people move in, the day-to-day is where this model lives or dies. Bed-level software keeps it simple: one
            bill per resident, true occupancy so you spot a vacancy the day it happens, receipts for every payment, and
            automated reminders (WhatsApp-first) when rent is due or late. As you add properties, it all rolls up into one
            portfolio view. For a related operating model, read{' '}
            <A href={postPath('how-to-manage-a-rooming-house')}>how to manage a rooming house</A>, or see how PulseHub works
            as a <A href={routes.sharedHousing}>shared-housing platform</A>.
          </P>
          <P>
            One last note: <A href={routes.us}>PulseHub</A> helps you run the business, but it does not replace legal, tax or
            licensing advice, and local rules differ from place to place. Always check the rules that apply where your
            property sits.
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
        heading="Run your rooms the easy way"
        text="One bill per resident, true bed-level occupancy and a free listing page for every property. Start a 14-day free trial with no card required."
        secondaryHref={routes.sharedHousing}
        secondaryLabel="Shared-housing platform"
      />
    </SiteShell>
  )
}
