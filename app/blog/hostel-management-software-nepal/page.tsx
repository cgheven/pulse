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
import { nepalScreenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('hostel-management-software-nepal')!
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
      'It is software that runs a hostel from one place: a record for every student, true occupancy down to the bed, one bill per resident for rent, meals and any extras, the payments against it, and a view of how each hostel is doing. It replaces the register and the rent book with one system.',
  },
  {
    question: 'Does it work for hostels in Nepal, in rupees?',
    answer:
      'Yes. PulseHub sets the currency, date format and wording to your market, so your rooms, rent and receipts are in Nepali rupees. It suits private student and working hostels in Kathmandu, Lalitpur, Pokhara, Bharatpur and elsewhere, including those that provide meals.',
  },
  {
    question: 'Can it bill meals and other extras, not just rent?',
    answer:
      'Yes. Many Nepali hostels include food, so meals can be part of a resident’s package or an add-on, and the kitchen’s own costs are tracked so you can see the real cost per resident. Rent, meals and any extras land on one monthly bill per resident, with part-payments recorded.',
  },
  {
    question: 'How are payments handled?',
    answer:
      'PulseHub records payments and issues receipts; it is not a payment gateway, so you record what the student sent, whether a bank transfer, wallet or cash, and a numbered receipt goes out. Automatic reminders chase rent that is due, and the real balance carries forward.',
  },
  {
    question: 'Can I run more than one hostel?',
    answer:
      'Yes. Switch between hostels on one login, move a student between them, and see every hostel together with occupancy, collections and dues side by side. A warden or manager can be given access to just their own hostel.',
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
        { '@type': 'ListItem', position: 3, name: 'Hostel management software in Nepal', item: url },
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

export default function HostelNepalPost() {
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
              Hostel management software for Nepal runs a hostel where rent and a shared mess sit on one bill: it records
              each payment, cash, bank or a wallet like eSewa or Khalti, against the right bed in rupees, tracks the mess
              so you see the real cost per resident, and sends an instant receipt.
            </strong>{' '}
            Around that it covers bed-level occupancy, deposits, a public page to fill rooms and every hostel in one
            view, built for how Nepali hostels actually run, by the bed with a shared mess, not the whole-flat model a
            generic rental tool assumes.
          </P>
          <P>
            Whether you run a student or working hostel in Kathmandu, Lalitpur, Pokhara or Bharatpur, the session starts
            with everyone needing a bed at once, the mess has to be accounted for every month, and rent arrives in parts.
            A register and a rent book stop coping past a few rooms. PulseHub records the eSewa, Khalti, bank or cash
            payment and issues the receipt; it is not a gateway, so the money still moves through your own account. This
            guide covers what the software does, why a generic rental tool does not fit a Nepali hostel, and how to
            choose.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>Nepali hostels are let by the bed with a shared mess, so they need bed-level software, not a whole-flat tool.</li>
              <li>One bill per student in rupees for rent and meals, with part-payments recorded and a running balance.</li>
              <li>Payments are recorded with instant receipts; the software logs a transfer or wallet, it is not a gateway.</li>
              <li>Mess and kitchen costs are tracked so you can see the real cost per resident.</li>
              <li>A single view across every hostel keeps a growing portfolio manageable.</li>
            </ul>
          </aside>

          <H2 id="what-it-is">What hostel management software is</H2>
          <P>
            It is software that runs a hostel&rsquo;s daily operations from one place: a record for every student with
            their deposit and history, true occupancy down to the bed, one bill that gathers rent, meals and any extras,
            the payments against it, and a clear view of how each hostel is doing. Instead of a bed list in one book and a
            rent diary in another, it keeps them together, for one hostel or several.
          </P>

          <H2 id="why-generic">Why a generic rental tool does not fit</H2>
          <P>
            Most property tools assume one tenant signs for one whole flat and pays one rent. A Nepali hostel does not
            work like that: many students live under one roof, each renting a bed, sharing a mess and a meter, each paying
            their own rent, often in parts. Run that on a whole-unit tool and you cannot bill a bed, cannot split the mess
            or electricity, and the start-of-session rush becomes a manual rebuild.
          </P>

          <H2 id="features">The features that matter for a Nepali hostel</H2>
          <P>Use this as a checklist when you compare tools:</P>
          <UL>
            <li><strong>Bed-level occupancy</strong> that cannot be over-filled, so a four-bed room with three students reads as three-quarters full.</li>
            <li><strong>One bill per student in rupees,</strong> gathering rent, meals and any extras, with part-payments tracked and the real balance carried forward.</li>
            <li><strong>Mess and kitchen costs</strong> tracked, so you can see the real cost per resident rather than guessing.</li>
            <li><strong>Payments recorded with numbered receipts,</strong> ready to share on WhatsApp, whether paid by transfer, wallet or cash.</li>
            <li><strong>Automatic WhatsApp reminders</strong> that chase overdue rent without you doing it by hand.</li>
            <li><strong>Deposits</strong> held against each record and settled at check-out.</li>
            <li><strong>Your own public page,</strong> with live room availability, so students enquire with you directly.</li>
            <li><strong>Every hostel in one view,</strong> with occupancy and collections per hostel, and warden access scoped to one hostel.</li>
          </UL>

          <div className="mt-8">
            <ProductScreenshot src={nepalScreenshots.payments.src} alt={nepalScreenshots.payments.alt} width={nepalScreenshots.payments.width} height={nepalScreenshots.payments.height} label="Payments · rent & receipts in rupees" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            <div className="mt-8">
              <ProductScreenshot src={nepalScreenshots.tenants.src} alt={nepalScreenshots.tenants.alt} width={nepalScreenshots.tenants.width} height={nepalScreenshots.tenants.height} label="Residents · deposits, waiting list & check-out" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
            <div className="mt-8">
              <ProductScreenshot src={nepalScreenshots.allProperties.src} alt={nepalScreenshots.allProperties.alt} width={nepalScreenshots.allProperties.width} height={nepalScreenshots.allProperties.height} label="Every hostel · occupancy, rent & collections" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
          </div>

          <H2 id="pulsehub">How PulseHub fits</H2>
          <P>
            <A href={routes.hostel}>PulseHub</A> is built for renting by the room and the bed, which is exactly the hostel
            model. It organises each hostel into floors, rooms and beds, keeps occupancy true, and every student is one
            record with their documents, deposit and history. Each resident gets one bill in rupees that gathers rent,
            meals and any extras, with part-payments recorded as instalments and a numbered receipt ready to share on
            WhatsApp, and every hostel rolls up into one view. Each hostel also gets a free public page with live availability, so you fill rooms
            from your own link.
          </P>
          <P>
            One honest point: PulseHub records payments and issues receipts, it is not a payment gateway, so it records
            what the student sent and keeps the ledger straight. It adapts to rupees and local wording, but any local tax
            or permit is yours to handle. For the product in general, see{' '}
            <A href={routes.hostel}>hostel management software</A> and{' '}
            <A href={routes.sharedHousing}>property management software for shared housing</A>; new to the category? Read{' '}
            <A href="/blog/what-is-a-property-management-system">what a property management system is</A>.
          </P>

          <Box title="In short">
            <P>
              If you run a hostel in Nepal, by the bed, with a shared mess, in rupees, and often more than one, you need
              software built for that model, not a whole-flat rental tool. Look for true bed-level occupancy, one rupee
              bill per student for rent and meals, payments with instant receipts, your own page to fill rooms, and a
              single view across every hostel.
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
        text="Beds and students, one rupee bill per resident for rent and meals, instant receipts, your own page to fill rooms, and every hostel in one view. Start a 14-day free trial with no card required."
        secondaryHref={routes.hostel}
        secondaryLabel="Hostel management software"
      />
    </SiteShell>
  )
}
