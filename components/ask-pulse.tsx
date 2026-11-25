import type { ReactNode } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { routes } from '@/lib/navigation'

const REEL_ID = '_uVKf7RpLhw'

/** The vertical demo reel in a phone-style frame. */
export function AskPulseReel({ title }: { title?: string }) {
  return (
    <div className="mx-auto w-full max-w-[300px]">
      <div
        className="relative overflow-hidden rounded-[2.25rem] border-[6px] border-foreground/10 bg-black shadow-xl"
        style={{ aspectRatio: '9 / 16' }}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${REEL_ID}?rel=0`}
          title={title ?? 'Ask Pulse demo: ask your accommodation business questions in WhatsApp'}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  )
}

/** Things an owner can ask Ask Pulse, in plain language. */
export const askPulseAbilities: string[] = [
  'Who has paid, and who still owes',
  'Deposits held and refundable balances',
  'How many beds are available right now',
  'This month’s profit and expenses',
  'Mark a payment as received',
  'Send a payment reminder',
]

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-base text-foreground/85">
      <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
      {children}
    </li>
  )
}

/** Compact homepage showcase of Ask Pulse, linking to the full page. */
export function AskPulseSection() {
  return (
    <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Ask Pulse · AI assistant</p>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,3.6vw,2.6rem)] font-medium leading-[1.1] tracking-tight">
            Ask your business anything, right in WhatsApp
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            No dashboard, no app to open. Message PulseHub on WhatsApp and get a straight answer about your
            accommodation business in seconds, from wherever you are.
          </p>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {askPulseAbilities.map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Ask Pulse is an AI assistant that reads your own PulseHub data and answers in plain language. It records
            payments and sends reminders; it is not a payment gateway, so it never moves money.
          </p>
          <Link
            href={routes.askPulse}
            className="mt-7 inline-flex min-h-11 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            See how Ask Pulse works
          </Link>
        </div>
        <div className="min-w-0">
          <AskPulseReel />
        </div>
      </div>
    </section>
  )
}
