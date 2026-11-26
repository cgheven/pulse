import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { AskPulseReel } from '@/components/ask-pulse'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('whatsapp-property-management')!
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
    question: 'Can you manage a rental property on WhatsApp?',
    answer:
      'Yes, for the day-to-day of it. With PulseHub, payment reminders and receipts go out on WhatsApp, residents message you there, and with the Ask Pulse add-on you can ask your business questions, such as who has paid or how many beds are free, and get an answer in the chat. The property records still live in PulseHub; WhatsApp is the fast, familiar front door to them.',
  },
  {
    question: 'Does WhatsApp collect rent?',
    answer:
      'No. WhatsApp carries the reminder and a shareable link to the bill or receipt, and with Ask Pulse you can mark a payment as received. The money itself still moves through your own bank, cash or payment app. PulseHub records payments; it is not a payment gateway.',
  },
  {
    question: 'What is Ask Pulse?',
    answer:
      'Ask Pulse is an AI assistant that answers questions about your PulseHub business inside WhatsApp, in plain language, and can mark a payment as paid or send a reminder. It is an optional add-on to your PulseHub plan.',
  },
  {
    question: 'Which operators does this suit?',
    answer:
      'Operators who are rarely at a desk: HMO, hostel, co-living, PG, student and shared-housing operators running one property or many, who want answers and reminders handled from their phone.',
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
        { '@type': 'ListItem', position: 3, name: 'WhatsApp property management', item: url },
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

export default function WhatsappPropertyManagementPost() {
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
              Your residents already live in WhatsApp. It is where a rent reminder actually gets read, where a maintenance
              message lands, and where a quick question gets a quick answer. WhatsApp property management is simply using
              that channel to run the day-to-day of your rentals, instead of hoping people open an email or a portal.
            </strong>{' '}
            Here is what it covers, and where the line sits between a message and moving money.
          </P>

          <H2 id="what">What you can run from WhatsApp</H2>
          <P>For operators renting rooms and beds, the useful parts are the ones you repeat every week:</P>
          <UL>
            <li><strong>Payment reminders</strong> that go out automatically before and after the due date, each with a shareable link to the bill.</li>
            <li><strong>Receipts</strong> sent as a shareable, WhatsApp-safe link the moment a payment is recorded.</li>
            <li><strong>Resident messages</strong> and maintenance requests, kept with the resident&rsquo;s record rather than lost in a personal chat.</li>
            <li><strong>Business answers</strong>, with the Ask Pulse add-on: ask who has paid, who owes, or how many beds are free, and get a reply in the chat.</li>
          </UL>

          <H2 id="reminders">Reminders and receipts, where people read them</H2>
          <P>
            The slowest part of collecting rent is usually the chasing. PulseHub sends automated reminders on WhatsApp
            (where it is available, email otherwise) before and after the due date, with a link to the exact bill, and
            issues a numbered receipt as a shareable link when a payment is recorded. The resident gets a nudge they
            actually see, and you stop messaging people one by one.
          </P>

          <H2 id="ask-pulse">Ask your business, right in the chat</H2>
          <P>
            The newest part is <A href={routes.askPulse}>Ask Pulse</A>, an AI assistant that answers questions about your
            own PulseHub data inside WhatsApp. Ask in plain language, such as &ldquo;who hasn&rsquo;t paid this
            month?&rsquo;&rsquo; or &ldquo;how many beds are free?&rsquo;&rsquo;, and it replies in seconds. You can also
            ask it to mark a payment as received or send a reminder. Ask Pulse is an optional add-on to your PulseHub
            plan.
          </P>
          <div className="mx-auto mt-8 max-w-[18rem]">
            <AskPulseReel title="Ask Pulse demo: asking a rental business questions in WhatsApp" />
          </div>

          <H2 id="not">Where the line is: messages, not money</H2>
          <P>
            It is worth being clear about what WhatsApp does not do here. It carries the reminder, the receipt link and
            the answer; it does not move money. When Ask Pulse marks a payment as received, it is recording in PulseHub
            that the rent arrived, not processing a card or a transfer. PulseHub is not a payment gateway, so rent still
            lands in your own bank, cash or payment app exactly as it does now.
          </P>

          <H2 id="next">Where to go next</H2>
          <P>
            See how <A href={routes.askPulse}>Ask Pulse</A> works, explore the wider{' '}
            <A href={routes.features}>platform</A>, or read about running your operation on{' '}
            <A href={routes.hostel}>hostel</A>, <A href={routes.hmo}>HMO</A> or{' '}
            <A href={routes.coliving}>co-living</A> software.
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
        heading="Run the day-to-day from WhatsApp"
        text="Automated reminders and receipts on WhatsApp come with PulseHub; Ask Pulse adds answers on demand. Start a 14-day free trial with no card required."
        secondaryHref={routes.askPulse}
        secondaryLabel="See Ask Pulse"
      />
    </SiteShell>
  )
}
