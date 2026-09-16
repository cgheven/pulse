import type { ReactNode } from 'react'
import { BookDemoButton, StartTrialButton } from '@/components/tracked-cta'
import { cn } from '@/lib/utils'

function HeroCtas({ align = 'center' }: { align?: 'center' | 'start' }) {
  return (
    <div>
      <div
        className={cn(
          'mt-7 flex flex-col gap-3 sm:flex-row',
          align === 'start' ? 'justify-center lg:justify-start' : 'justify-center',
        )}
      >
        <StartTrialButton
          location="hero"
          size="lg"
          className="min-h-12 whitespace-normal bg-primary px-6 text-base hover:bg-primary/90"
        />
        <BookDemoButton
          location="hero"
          size="lg"
          className="min-h-12 whitespace-normal border-primary/40 px-6 text-base text-primary hover:bg-primary/10"
        />
      </div>
      <p
        className={cn(
          'mt-4 font-mono text-xs uppercase tracking-wide text-muted-foreground',
          align === 'start' ? 'text-center lg:text-left' : 'text-center',
        )}
      >
        14-day free trial · no card required
      </p>
    </div>
  )
}

export function PageHero({
  eyebrow,
  heading,
  text,
  supporting,
  visual,
  split = false,
}: {
  eyebrow?: string
  heading: string
  text: string
  supporting?: string
  visual?: ReactNode
  /** Two-column layout: copy on the left, `visual` on the right (stacked on mobile). */
  split?: boolean
}) {
  if (split && visual) {
    return (
      <section className="px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-8">
        <div className="mx-auto grid w-full min-w-0 max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="min-w-0 text-center lg:text-left">
            {eyebrow ? (
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
            ) : null}
            <h1 className="text-balance font-display text-[clamp(2rem,5.4vw,3.5rem)] font-medium leading-[1.06] tracking-tight text-foreground">
              {heading}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">{text}</p>
            {supporting ? <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground/80 lg:mx-0">{supporting}</p> : null}
            <HeroCtas align="start" />
          </div>
          <div className="min-w-0">{visual}</div>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 pb-10 pt-24 sm:px-6 sm:pb-12 sm:pt-28 lg:px-8">
      <div className={cn('mx-auto text-center', visual ? 'w-full min-w-0 max-w-7xl' : 'max-w-4xl')}>
        <div className="mx-auto max-w-4xl">
          {eyebrow ? (
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
          ) : null}
          <h1 className="text-balance font-display text-[clamp(2rem,5.4vw,3.75rem)] font-medium leading-[1.06] tracking-tight text-foreground">
            {heading}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{text}</p>
          {supporting ? <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground/80">{supporting}</p> : null}
          <HeroCtas />
        </div>
        {visual ? <div className="mx-auto mt-10 w-full min-w-0 max-w-6xl">{visual}</div> : null}
      </div>
    </section>
  )
}
