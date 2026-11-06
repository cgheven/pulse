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
import { nigeriaScreenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('hostel-management-software-nigeria')!
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
    question: 'What is hostel management software?',
    answer:
      'It is software that runs a hostel from one place: a record for every student, true occupancy down to the bed, one bill per resident for rent and any extras, the payments against it, and a view of how each hostel is doing. It replaces the register, the rent book and the scattered WhatsApp chats with one system.',
  },
  {
    question: 'Does it work for hostels in Nigeria, in naira?',
    answer:
      'Yes. PulseHub sets the currency, date format and wording to your market, so your rooms, rent and receipts are in naira. It suits private student hostels near universities and polytechnics, shared apartments and self-contained blocks run as hostels.',
  },
  {
    question: 'Can students pay in instalments, and how are payments handled?',
    answer:
      'Yes. Each resident has one bill, and part-payments are recorded as instalments with their own date and receipt, with the balance carried forward. PulseHub records payments and issues receipts; it is not a payment gateway, so you log what the student sent, whether a bank transfer, cash or a transfer from an agent, and a receipt goes out.',
  },
  {
    question: 'Can I advertise my own rooms instead of relying on agents?',
    answer:
      'Yes, and this is one of the bigger wins. Each hostel gets its own public page with live room availability, photos and prices, and a contact button, so students find and enquire with you directly rather than through a middleman. You control your own listing.',
  },
  {
    question: 'Can I run more than one hostel?',
    answer:
      'Yes. Switch between hostels on one login, move a student between them, and see every hostel together with occupancy, collections and dues side by side. A caretaker or manager can be given access to just their own hostel.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes. You can start a 14-day free trial with no card required, then book a demo if you would like a walkthrough for your hostel.',
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
        { '@type': 'ListItem', position: 3, name: 'Hostel management software in Nigeria', item: url },
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

export default function HostelNigeriaPost() {
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
              Hostel management software for Nigeria runs a student hostel from one place: a record for every student,
              true occupancy down to the bed, one bill per resident in naira, the payments and deposits against it, your
              own public page to fill rooms, and every hostel in one view.
            </strong>{' '}
            It is built for how private hostels near Nigerian campuses actually run, by the bed, not the whole-flat model
            a generic rental tool assumes.
          </P>
          <P>
            If you run a hostel near a university or polytechnic, in Lagos, Abuja, Ibadan, Nsukka or anywhere else, a
            paper register stops coping once you pass a few rooms. Rent comes in parts, students chase you for receipts,
            agents sit between you and your tenants, and at resumption everyone wants a bed at once. This guide covers
            what the software does, why a generic tool does not fit, the features that matter here, and how to choose.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Nigerian hostels are let by the bed, so they need bed-level software, not a whole-flat rental tool.</li>
              <li>One bill per student in naira, with part-payments recorded as instalments and a running balance.</li>
              <li>Your own public page fills rooms directly, so you lean less on agents and avoid the rent-scam middle.</li>
              <li>Payments are recorded with instant receipts; the software logs what the student sent, it is not a gateway.</li>
              <li>Once you run more than one hostel, a single view across all of them keeps it manageable.</li>
            </ul>
          </aside>

          <H2 id="what-it-is">What hostel management software is</H2>
          <P>
            It is software that runs a hostel&rsquo;s daily operations from one place: a record for every student with
            their deposit and history, true occupancy down to the bed, one bill that gathers rent and any extras, the
            payments against it, and a clear view of how each hostel is doing. Instead of a bed list in one book and a
            rent diary in another, it keeps them together, and the same system runs a single hostel or several.
          </P>

          <H2 id="why-generic">Why a generic rental tool does not fit</H2>
          <P>
            Most property tools assume one tenant signs for one whole flat and pays one rent. A Nigerian hostel does not
            work like that: many students live under one roof, each renting a bed or a room in a self-contained, each
            paying their own rent, often in parts. Run that on a whole-unit tool and you fight it every session, you
            cannot bill a bed, you cannot see a room as half full, and a rush at resumption becomes a manual rebuild.
          </P>
          <P>
            The other common options miss too. University portals run the institution&rsquo;s own halls, not your
            private hostel. Listing sites help students find rooms but do not run your operations or your money. A hostel
            needs software built to let beds and bill each student for their own stay.
          </P>

          <H2 id="features">The features that matter for a Nigerian hostel</H2>
          <P>Use this as a checklist when you compare tools:</P>
          <UL>
            <li><strong>Bed-level occupancy</strong> that cannot be over-filled, so a four-bed room with three students reads as three-quarters full.</li>
            <li><strong>One bill per student in naira,</strong> with part-payments tracked as instalments and the real balance carried forward.</li>
            <li><strong>Instant receipts,</strong> issued the moment you record a payment, so there is no argument later about what was paid.</li>
            <li><strong>Your own public page,</strong> with live room availability and prices, so students enquire with you directly rather than through an agent.</li>
            <li><strong>Deposits</strong> held against each record and settled at check-out.</li>
            <li><strong>Documents and a record per student,</strong> with their next of kin and full payment history.</li>
            <li><strong>Complaints logged</strong> and tracked, so an issue raised by a student does not get lost.</li>
            <li><strong>Every hostel in one view,</strong> with occupancy and collections per hostel, and caretaker access scoped to one hostel.</li>
          </UL>

          <div className="mt-8">
            <ProductScreenshot src={nigeriaScreenshots.payments.src} alt={nigeriaScreenshots.payments.alt} width={nigeriaScreenshots.payments.width} height={nigeriaScreenshots.payments.height} label="Payments · rent & receipts in naira" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            <div className="mt-8">
              <ProductScreenshot src={nigeriaScreenshots.tenants.src} alt={nigeriaScreenshots.tenants.alt} width={nigeriaScreenshots.tenants.width} height={nigeriaScreenshots.tenants.height} label="Residents · deposits, waiting list & check-out" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
            <div className="mt-8">
              <ProductScreenshot src={nigeriaScreenshots.allProperties.src} alt={nigeriaScreenshots.allProperties.alt} width={nigeriaScreenshots.allProperties.width} height={nigeriaScreenshots.allProperties.height} label="Every hostel · occupancy, rent & collections" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
          </div>

          <H2 id="pulsehub">How PulseHub fits</H2>
          <P>
            <A href={routes.hostel}>PulseHub</A> is built for renting by the room and the bed, which is exactly the
            hostel model. It organises each hostel into floors, rooms and beds, keeps occupancy true, and every student
            is one record with their documents, deposit and history. Each resident gets one bill in naira, with
            part-payments recorded as instalments and an instant receipt, and every hostel rolls up into one view. Each
            hostel also gets a free public page with live availability, so you fill rooms from your own link.
          </P>
          <P>
            One honest point: PulseHub records payments and issues receipts, it is not a payment gateway, so it does not
            collect rent for you, it records what the student sent (a bank transfer, cash or a transfer through an agent)
            and keeps the ledger straight. It adapts to naira and local wording, but a specific Nigerian tax or
            regulatory filing is yours to handle. For the product in general, see{' '}
            <A href={routes.hostel}>hostel management software</A> and{' '}
            <A href={routes.sharedHousing}>property management software for shared housing</A>; new to the category? Read{' '}
            <A href="/blog/what-is-a-property-management-system">what a property management system is</A>.
          </P>

          <Box title="In short">
            <P>
              If you run a student hostel in Nigeria, by the bed, in naira, and often more than one, you need software
              built for that model, not a whole-flat rental tool or a university portal. Look for true bed-level
              occupancy, one naira bill per student with instant receipts, your own page to fill rooms, and a single view
              across every hostel.
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
        heading="Run your hostel on one system."
        text="Beds and students, one naira bill per resident with instant receipts, your own page to fill rooms, and every hostel in one view. Start a 14-day free trial with no card required."
        secondaryHref={routes.hostel}
        secondaryLabel="Hostel management software"
      />
    </SiteShell>
  )
}
