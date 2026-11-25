import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import SiteShell from '@/components/site-shell'
import { AskPulseReel, askPulseAbilities } from '@/components/ask-pulse'
import { BLOG_BASE, formatBlogDate, getBlogPost, postPath } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const post = getBlogPost('ask-pulse-whatsapp-ai-assistant')!
const url = `${SITE_URL}${postPath(post.slug)}`
const imageUrl = `${SITE_URL}${post.image.src}`
const REEL_URL = 'https://www.youtube.com/shorts/_uVKf7RpLhw'

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
    question: 'Is Ask Pulse AI?',
    answer:
      'Yes. Ask Pulse uses AI to understand your questions in plain language, so there are no commands or menus to learn. It reads the live data in your own PulseHub account to answer, and can mark a payment as paid or send a reminder. It does not move money or take decisions on its own.',
  },
  {
    question: 'Does Ask Pulse collect or process payments?',
    answer:
      'No. When you ask it to collect a payment, it marks the payment as received in PulseHub and can send the resident a reminder. It is not a payment gateway, so rent still arrives through your own bank, cash or payment app exactly as it does now.',
  },
  {
    question: 'How do I get Ask Pulse?',
    answer:
      'Ask Pulse is an optional add-on to your PulseHub plan. You can start a 14-day free trial of PulseHub with no card required, then add Ask Pulse to start asking in WhatsApp. Talk to the team for add-on details.',
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
      '@type': 'VideoObject',
      name: 'Ask Pulse: run your accommodation business from WhatsApp',
      description:
        'A demo of Ask Pulse: an accommodation owner asks PulseHub questions in WhatsApp, such as who has paid, who is unpaid, deposits, available beds and profit and expenses.',
      thumbnailUrl: ['https://i.ytimg.com/vi/_uVKf7RpLhw/hqdefault.jpg'],
      uploadDate: '2026-11-26',
      contentUrl: REEL_URL,
      embedUrl: 'https://www.youtube.com/embed/_uVKf7RpLhw',
      publisher: { '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}${BLOG_BASE}` },
        { '@type': 'ListItem', position: 3, name: 'Meet Ask Pulse', item: url },
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

export default function AskPulseAnnouncementPost() {
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

        <div className="mx-auto mt-10 grid max-w-[50rem] items-center gap-8 sm:grid-cols-[1fr_300px]">
          <div>
            <P>
              <strong>
                Running an accommodation business usually means stopping what you are doing, finding a laptop, and
                digging through a dashboard to answer one simple question. Ask Pulse removes that step. It is an AI
                assistant built into WhatsApp: you ask in plain language, and it answers from your own{' '}
                <A href="/">PulseHub</A> data in seconds.
              </strong>
            </P>
          </div>
          <AskPulseReel />
        </div>

        <div className="mx-auto mt-2 max-w-[50rem]">
          <H2 id="what">What Ask Pulse does</H2>
          <P>
            Ask Pulse turns the questions you ask yourself every day into a quick WhatsApp message. No menus, no reports
            to run, no app to open. Just ask:
          </P>
          <UL>
            {askPulseAbilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </UL>

          <H2 id="how">How it works</H2>
          <P>
            Ask Pulse uses AI to understand your question in everyday language, then reads the live numbers behind your
            own PulseHub dashboard to reply, right in your WhatsApp chat. Being clear about what it does: when you ask it
            to collect a payment, it marks the payment as received and can send the resident a reminder. It does not move
            money and it is not a payment gateway, so rent still arrives through your own bank, cash or payment app. It
            only answers about your own account, and replies go to you.
          </P>

          <H2 id="why">Why it matters</H2>
          <P>
            Most property software keeps you at a desk. The whole point of Ask Pulse is the opposite: your business in
            your pocket, answered the moment you think of the question, whether you are between viewings, at another
            property, or out for the evening. It is the difference between opening software and simply asking.
          </P>

          <H2 id="get">How to get it</H2>
          <P>
            Ask Pulse is an optional add-on to your PulseHub plan. See the{' '}
            <A href={routes.askPulse}>full Ask Pulse page</A>, or start a 14-day free trial of PulseHub and add Ask
            Pulse to begin asking in WhatsApp.
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
        heading="Ask your business anything, in WhatsApp"
        text="Ask Pulse is an optional add-on to your PulseHub plan. Start a 14-day free trial of PulseHub with no card required, then add Ask Pulse."
        secondaryHref={routes.askPulse}
        secondaryLabel="See Ask Pulse"
      />
    </SiteShell>
  )
}
