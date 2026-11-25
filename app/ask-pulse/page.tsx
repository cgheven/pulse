import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { FaqList } from '@/components/faq-list'
import SiteShell from '@/components/site-shell'
import { StartTrialButton } from '@/components/tracked-cta'
import { AskPulseReel, askPulseAbilities } from '@/components/ask-pulse'
import { routes } from '@/lib/navigation'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const PATH = routes.askPulse
const REEL_URL = 'https://www.youtube.com/shorts/_uVKf7RpLhw'

export const metadata = pageMetadata({
  title: 'Ask Pulse: AI Assistant for Rentals on WhatsApp',
  description:
    "Ask Pulse is an AI assistant that runs your rentals from WhatsApp: ask who's paid, unpaid, deposits, available beds, profit and expenses, and send reminders.",
  path: PATH,
})

const faqs = [
  {
    question: 'What is Ask Pulse?',
    answer:
      'Ask Pulse is a way to run your accommodation business from WhatsApp. Instead of opening a dashboard, you message PulseHub in plain language and get a straight answer about your own data: who has paid, who still owes, deposits, how many beds are free, and this month’s profit and expenses. You can also ask it to mark a payment as received or send a reminder.',
  },
  {
    question: 'Is Ask Pulse AI?',
    answer:
      'Yes. Ask Pulse uses AI to understand your questions in plain language, so there are no commands or menus to learn, you just ask. It then reads the live data in your own PulseHub account to answer. The AI reads and reports on your numbers and can mark a payment as paid or send a reminder; it does not move money or take decisions on its own.',
  },
  {
    question: 'What can I ask it?',
    answer:
      'Day-to-day questions about your business: which residents have paid and which are overdue, a resident’s balance or deposit, available beds and occupancy, income and expenses for the month, and who to chase. You can ask it to mark a payment as received and to send a payment reminder, all from the WhatsApp chat.',
  },
  {
    question: 'Does Ask Pulse collect or process payments?',
    answer:
      'No. When you ask it to collect a payment, it marks the payment as received in PulseHub and can send the resident a reminder. It does not move money and it is not a payment gateway, so rent still arrives through your own bank, cash or payment app exactly as it does now.',
  },
  {
    question: 'Is my data private?',
    answer:
      'Ask Pulse only answers questions about your own PulseHub account, and replies go to you in your own WhatsApp chat. It does not expose resident data publicly or share it with anyone else.',
  },
  {
    question: 'Who is Ask Pulse for?',
    answer:
      'Owners and managers who want answers without sitting at a desk: HMO, hostel, co-living, PG, student and shared-housing operators running one property or many. Ask Pulse is available as an optional add-on to your PulseHub plan.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Ask Pulse: Run Your Rentals from WhatsApp',
      url: `${SITE_URL}${PATH}`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
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
        { '@type': 'ListItem', position: 2, name: 'Ask Pulse', item: `${SITE_URL}${PATH}` },
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

function Lead({ children }: { children: ReactNode }) {
  return <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</p>
}

export default function AskPulsePage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <section className="px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Ask Pulse · AI assistant</p>
            <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.08] tracking-tight">
              Run your accommodation business from WhatsApp
            </h1>
            <Lead>
              Ask Pulse is an AI assistant built into WhatsApp. No dashboard, no app to open: message PulseHub and get a
              straight answer about your business in seconds, who has paid, who still owes, deposits, available beds, and
              this month&rsquo;s profit and expenses. Ask it to mark a payment as received or send a reminder, right from
              the chat.
            </Lead>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <StartTrialButton location="hero" className="min-h-11 bg-primary px-5 hover:bg-primary/90" />
              <a href={routes.pricing} className="inline-flex min-h-11 items-center rounded-lg border border-border px-5 text-sm font-semibold hover:border-primary hover:text-primary">
                See pricing
              </a>
            </div>
          </div>
          <div className="min-w-0">
            <AskPulseReel title="Ask Pulse demo: asking an accommodation business questions in WhatsApp" />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Just ask</p>
          <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
            The questions you ask every day, answered in the chat
          </h2>
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {askPulseAbilities.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-base text-foreground/85">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-muted/30 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">How it works</p>
          <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
            Your own data, answered in plain language
          </h2>
          <Lead>
            Ask Pulse is an AI assistant: it understands your question in plain, everyday language, then reads the live
            numbers behind your own PulseHub dashboard and replies in your WhatsApp chat. No commands to learn, no
            reports to run.
          </Lead>
          <Lead>
            Being clear about what it does and does not do: when you ask it to collect a payment, it marks the payment as
            received in PulseHub and can send the resident a reminder. It does not move money and it is not a payment
            gateway, so rent still arrives through your own bank, cash or payment app. It only ever answers about your
            own account, and replies go to you.
          </Lead>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-[50rem]">
          <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-8">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <CtaBand
        heading="Run your rentals from your pocket"
        text="Ask Pulse is an optional add-on to your PulseHub plan. Start a 14-day free trial of PulseHub with no card required, then add Ask Pulse to run your business from WhatsApp."
        secondaryHref={routes.features}
        secondaryLabel="Explore the platform"
      />
    </SiteShell>
  )
}
