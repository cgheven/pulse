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

const post = getBlogPost('ai-for-landlords')!
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
    question: 'What does AI do in property management?',
    answer:
      'Today, the realistic wins are the repetitive parts: answering questions about your own data in plain language, chasing payments with reminders, and surfacing numbers without you building a report. In PulseHub, the Ask Pulse add-on does this inside WhatsApp: you ask who has paid or how many beds are free, and it answers from your records.',
  },
  {
    question: 'Can AI replace a property manager?',
    answer:
      'No, and anyone claiming otherwise is overselling. AI is good at reading, summarising and reminding. It is not the one deciding whether to accept a tenant, settle a dispute or set a rent. Think of it as removing the busywork so the person can spend time on the judgment calls, not as replacing the person.',
  },
  {
    question: 'Does AI handle rent payments?',
    answer:
      'In PulseHub, the AI can mark a payment as received and send a reminder, but it does not move money. PulseHub records payments; it is not a payment gateway, so rent still arrives through your own bank, cash or payment app. The AI reads and reports on your numbers rather than processing transactions.',
  },
  {
    question: 'Is my data safe with an AI assistant?',
    answer:
      'With Ask Pulse, the assistant only answers questions about your own PulseHub account, and replies go to you in your own WhatsApp chat. It does not expose resident data publicly. As with any tool, check the provider’s privacy terms for how data is handled.',
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
        { '@type': 'ListItem', position: 3, name: 'AI for landlords', item: url },
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

export default function AiForLandlordsPost() {
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
              Every tool now claims to be &ldquo;AI-powered,&rsquo;&rsquo; which makes it hard to tell what AI actually
              does for a landlord today. The honest version is narrower than the hype and more useful than the
              skeptics think: AI is good at the reading, remembering and reminding, so you spend your time on the
              decisions that matter.
            </strong>{' '}
            Here is what it does well, and where a person still has to be in the loop.
          </P>

          <H2 id="does">What AI actually does for landlords today</H2>
          <P>Strip away the marketing and the real wins are the repetitive jobs you do every week:</P>
          <UL>
            <li><strong>Answer questions about your own data</strong> in plain language, so you do not build a report to find out who owes rent.</li>
            <li><strong>Chase payments</strong> with reminders timed around the due date, instead of messaging residents one by one.</li>
            <li><strong>Surface the numbers</strong>, such as occupancy, collections or available beds, the moment you ask.</li>
            <li><strong>Handle the small admin</strong>, like marking a payment as received or recording a note.</li>
          </UL>
          <P>
            In PulseHub, this is the <A href={routes.askPulse}>Ask Pulse</A> add-on: an AI assistant that answers
            questions about your business inside WhatsApp, in plain language, and can mark a payment as paid or send a
            reminder.
          </P>

          <H2 id="limits">Where a human still decides</H2>
          <P>
            It is just as important to be clear about what AI should not do. It does not decide whether to accept a
            tenant, how to handle a dispute, what to charge, or whether a property meets its legal obligations. Those are
            judgment calls with real consequences, and they stay with you. Good AI removes the busywork around those
            decisions; it does not make them for you.
          </P>

          <H2 id="money">AI reads your numbers, it does not move money</H2>
          <P>
            A specific caution worth repeating: in PulseHub the AI reads and reports on your data and can mark a payment
            as received, but it does not process payments. PulseHub records payments; it is not a payment gateway, so
            rent still moves through your own bank, cash or payment app. An assistant that answers questions is a very
            different thing from one that touches money, and it is the first kind.
          </P>

          <H2 id="choose">How to judge AI in a property tool</H2>
          <P>
            When a tool says &ldquo;AI,&rsquo;&rsquo; ask what it concretely does for you today, not what it might do.
            Can you ask it a real question and get a useful answer from your own data? Does it save you a repetitive task
            you actually do? And is it honest about its limits, especially around money and legal duties? If the answers
            are yes, the AI is earning its place. If it is a badge on a feature list, it is not.
          </P>

          <H2 id="next">Where to go next</H2>
          <P>
            See <A href={routes.askPulse}>Ask Pulse</A>, the AI assistant built into WhatsApp, read how operators use{' '}
            <A href="/blog/whatsapp-property-management">WhatsApp to run rentals</A>, or explore the wider{' '}
            <A href={routes.features}>platform</A>.
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
        heading="Let the AI handle the busywork"
        text="Ask Pulse answers questions about your business in WhatsApp, an optional add-on to PulseHub. Start a 14-day free trial with no card required."
        secondaryHref={routes.askPulse}
        secondaryLabel="See Ask Pulse"
      />
    </SiteShell>
  )
}
