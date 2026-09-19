import SiteShell from '@/components/site-shell'
import { BookDemoButton, StartTrialButton } from '@/components/tracked-cta'
import {
  CONTACT_EMAIL,
  GENERAL_MAILTO,
  SUPPORT_MAILTO,
  SALES_MAILTO,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/navigation'

export const metadata = pageMetadata({
  title: 'Contact PulseHub | Accommodation Management Software',
  description: 'Contact PulseHub to discuss your accommodation operations, book a demonstration or start a free trial.',
  path: routes.contact,
  absoluteTitle: true,
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact PulseHub',
  url: `${SITE_URL}${routes.contact}`,
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
}

const enquiries = [
  { href: GENERAL_MAILTO, title: 'General enquiry', text: 'Ask a question about PulseHub and how it fits your properties.' },
  { href: routes.bookDemo, title: 'Book a demonstration', text: 'Pick a time and we will walk you through rooms, residents, rent and daily operations.' },
  { href: SALES_MAILTO, title: 'Sales enquiry', text: 'Talk through plans, property allowances and onboarding.' },
  { href: SUPPORT_MAILTO, title: 'Support', text: 'Get help with an existing PulseHub account.' },
]

export default function ContactPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <section className="mx-auto max-w-4xl px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">Contact</p>
        <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.06] tracking-tight">
          Let’s talk about your accommodation operations
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Book a demo, start a free trial, or choose an enquiry type below to email the team.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <StartTrialButton location="other" className="min-h-11 bg-primary hover:bg-primary/90" />
          <BookDemoButton location="other" className="min-h-11 border-primary text-primary hover:bg-primary/10" />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {enquiries.map((item) => (
            <a key={item.title} href={item.href} className="rounded-xl border border-border bg-card p-6 hover:border-primary/50">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-foreground/60">{item.text}</p>
            </a>
          ))}
        </div>
        <div className="mt-12 space-y-2 text-sm text-foreground/70">
          <p>
            Email:{' '}
            <a className="text-primary hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </section>
    </SiteShell>
  )
}
