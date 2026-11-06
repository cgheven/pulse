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
import { indonesiaScreenshots } from '@/lib/screenshots'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('kos-management-software-indonesia')!
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
    question: 'What is kos management software?',
    answer:
      'It is software that runs a kos or kost (a boarding house) from one place: a record for every tenant, true occupancy down to the room, one monthly bill for rent and any extras, the payments against it, and a view of how each kos is doing. It replaces the notebook and the scattered chats with one system.',
  },
  {
    question: 'Does it work for a kos in Indonesia, in rupiah?',
    answer:
      'Yes. PulseHub sets the currency, date format and wording to your market, so your rooms, rent and receipts are in rupiah. It suits kos-kosan owners near campuses and workplaces in Jakarta, Bandung, Yogyakarta, Surabaya and elsewhere, whether putra, putri or campur.',
  },
  {
    question: 'How are payments handled, and does it use WhatsApp?',
    answer:
      'PulseHub records payments and issues receipts; it is not a payment gateway, so it does not auto-debit. You record what the tenant sent, whether a bank transfer, e-wallet or cash, and a numbered receipt goes out, ready to share on WhatsApp. Automatic reminders chase rent that is due.',
  },
  {
    question: 'Can it bill electricity and other extras, not just rent?',
    answer:
      'Yes. Alongside rent you can add a share of electricity and other recurring charges, and meals where you provide them, so each tenant gets one monthly bill covering their whole share, with part-payments recorded against a running balance.',
  },
  {
    question: 'Can I run more than one kos?',
    answer:
      'Yes. Switch between properties on one login, move a tenant or a room between them, and see every kos together with occupancy, collections and dues side by side. A caretaker can be given access to just one property.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes. You can start a 14-day free trial with no card required, then book a demo if you would like a walkthrough for your kos.',
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
        { '@type': 'ListItem', position: 3, name: 'Kos management software in Indonesia', item: url },
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

export default function KosIndonesiaPost() {
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
              Kos management software for Indonesia runs a boarding house from one place: a record for every tenant, true
              occupancy down to the room, one monthly bill in rupiah for rent, electricity and extras, payments with
              WhatsApp receipts, and every kos in one view.
            </strong>{' '}
            It is built for how a kos-kosan actually runs, room by room, each tenant on their own, not the whole-house
            model a generic rental tool assumes.
          </P>
          <P>
            If you own a kos near a campus or an office, in Jakarta, Bandung, Yogyakarta, Depok or Surabaya, a notebook
            stops coping once you pass a handful of rooms. Rent is due on different dates, electricity has to be split,
            and chasing late payers by hand eats your evenings. This guide covers what the software does, why a generic
            tool does not fit, the features that matter here, and how to choose.
          </P>

          <aside className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
            <h2 id="key-takeaways" className="scroll-mt-28 font-display text-xl font-medium tracking-tight sm:text-2xl">Key takeaways</h2>
            <ul className="mt-4 space-y-3 text-[1.0625rem] leading-[1.7] text-foreground/85 marker:text-primary [&>li]:ml-5 [&>li]:list-disc sm:text-lg">
              <li>A kos is let room by room, so it needs room-level software, not a whole-house rental tool.</li>
              <li>One monthly bill per tenant in rupiah for rent, electricity and extras, with part-payments and a running balance.</li>
              <li>Payments are recorded with WhatsApp receipts; the software logs a transfer or e-wallet, it is not a gateway.</li>
              <li>Automatic WhatsApp reminders chase overdue rent so you do not have to.</li>
              <li>A single view across every kos keeps a growing portfolio manageable.</li>
            </ul>
          </aside>

          <H2 id="what-it-is">What kos management software is</H2>
          <P>
            It is software that runs a kos&rsquo;s daily operations from one place: a record for every tenant with their
            deposit and history, true occupancy room by room, one bill that gathers rent, electricity and any extras, the
            payments against it, and a clear view of how each kos is doing. Instead of a room list in one book and a rent
            note in another, it keeps them together, for one kos or several.
          </P>

          <H2 id="why-generic">Why a generic rental tool does not fit</H2>
          <P>
            Most property tools assume one tenant signs for one whole house and pays one rent. A kos does not work like
            that: each room is let on its own, to its own tenant, with its own rent and a share of the electricity, and
            tenants come and go through the year. Run that on a whole-house tool and you cannot bill a room, cannot split
            a shared meter, and every move-in becomes a manual edit.
          </P>

          <H2 id="features">The features that matter for a kos</H2>
          <P>Use this as a checklist when you compare tools:</P>
          <UL>
            <li><strong>Room-level occupancy</strong> that cannot be over-filled, so a kos with eight of ten rooms taken reads as eighty per cent full.</li>
            <li><strong>One monthly bill per tenant in rupiah,</strong> gathering rent, a share of electricity and any extras, with part-payments tracked.</li>
            <li><strong>Payments recorded with receipts,</strong> whether paid by transfer, e-wallet or cash, ready to share on WhatsApp.</li>
            <li><strong>Automatic WhatsApp reminders,</strong> so overdue rent is chased without you doing it by hand.</li>
            <li><strong>Deposits</strong> held against each record and settled at move-out.</li>
            <li><strong>KTP and documents</strong> held against each tenant, with their full payment history.</li>
            <li><strong>Your own public page,</strong> with live room availability, so tenants enquire with you directly.</li>
            <li><strong>Every kos in one view,</strong> with occupancy and collections per property, and caretaker access scoped to one.</li>
          </UL>

          <div className="mt-8">
            <ProductScreenshot src={indonesiaScreenshots.payments.src} alt={indonesiaScreenshots.payments.alt} width={indonesiaScreenshots.payments.width} height={indonesiaScreenshots.payments.height} label="Payments · rent & receipts in rupiah" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            <div className="mt-8">
              <ProductScreenshot src={indonesiaScreenshots.tenants.src} alt={indonesiaScreenshots.tenants.alt} width={indonesiaScreenshots.tenants.width} height={indonesiaScreenshots.tenants.height} label="Residents · deposits, waiting list & check-out" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
            <div className="mt-8">
              <ProductScreenshot src={indonesiaScreenshots.allProperties.src} alt={indonesiaScreenshots.allProperties.alt} width={indonesiaScreenshots.allProperties.width} height={indonesiaScreenshots.allProperties.height} label="Every kos · occupancy, rent & collections" sizes="(max-width: 820px) calc(100vw - 2rem), 50rem" />
            </div>
          </div>

          <H2 id="pulsehub">How PulseHub fits</H2>
          <P>
            <A href={routes.hostel}>PulseHub</A> is built for renting by the room and the bed, which is exactly the kos
            model. It organises each kos into rooms, keeps occupancy true, and every tenant is one record with their KTP,
            documents, deposit and history. Each tenant gets one monthly bill in rupiah that gathers rent, a share of
            electricity and any extras, with part-payments recorded and a numbered receipt ready to share on WhatsApp, and
            every kos rolls up into one view. Each kos also gets a free public page with live availability, so you fill
            rooms from your own link.
          </P>
          <P>
            One honest point: PulseHub records payments and issues receipts, it is not a payment gateway, so it does not
            auto-debit, and it keeps each tenant&rsquo;s KTP and documents rather than running automated identity checks.
            It adapts to rupiah and local wording, but any local tax or permit is yours to handle. For the product in
            general, see <A href={routes.hostel}>hostel management software</A> and{' '}
            <A href={routes.sharedHousing}>property management software for shared housing</A>; new to the category? Read{' '}
            <A href="/blog/what-is-a-property-management-system">what a property management system is</A>.
          </P>

          <Box title="In short">
            <P>
              If you run a kos in Indonesia, room by room, in rupiah, and perhaps more than one, you need software built
              for that model, not a whole-house rental tool. Look for true room-level occupancy, one rupiah bill per
              tenant for rent and electricity, payments with WhatsApp receipts, your own page to fill rooms, and a single
              view across every kos.
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
        heading="Run your kos on one system."
        text="Rooms and tenants, one rupiah bill per tenant for rent and electricity, WhatsApp receipts, and every kos in one view. Start a 14-day free trial with no card required."
        secondaryHref={routes.hostel}
        secondaryLabel="Hostel management software"
      />
    </SiteShell>
  )
}
