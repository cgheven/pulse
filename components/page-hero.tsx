import type { ReactNode } from 'react'
import { BookDemoButton, StartTrialButton } from '@/components/tracked-cta'
import { cn } from '@/lib/utils'

function HeroCtas({ align = 'center' }: { align?: 'center' | 'start' }) {
  return (
    <div
      className={cn(
        'mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row',
        align === 'start' ? 'justify-center lg:justify-start' : 'justify-center',
      )}
    >
      <StartTrialButton
        location="hero"
        size="lg"
        className="min-h-11 whitespace-normal bg-primary px-5 hover:bg-primary/90"
      />
      <BookDemoButton
        location="hero"
        size="lg"
        className="min-h-11 whitespace-normal border-primary px-5 text-primary hover:bg-primary/10"
      />
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
      <section className="px-4 pb-10 pt-20 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8">
        <div className="mx-auto grid w-full min-w-0 max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0 text-center lg:text-left">
            {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary sm:mb-4">{eyebrow}</p> : null}
            <h1 className="text-balance text-[clamp(1.5rem,6vw,3.25rem)] font-bold leading-[1.15]">{heading}</h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-foreground/70 sm:mt-5 sm:text-lg lg:mx-0">{text}</p>
            {supporting ? <p className="mx-auto mt-3 max-w-xl text-base text-foreground/60 lg:mx-0">{supporting}</p> : null}
            <HeroCtas align="start" />
          </div>
          <div className="relative mx-auto w-full min-w-0 max-w-xl lg:max-w-none">
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl" aria-hidden="true" />
            <div className="relative">{visual}</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 pb-8 pt-20 sm:px-6 sm:pb-10 sm:pt-28 lg:px-8">
      <div className={cn('mx-auto text-center', visual ? 'w-full min-w-0 max-w-7xl' : 'max-w-4xl')}>
        <div className="mx-auto max-w-4xl">
          {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary sm:mb-4">{eyebrow}</p> : null}
          <h1 className="text-balance text-[clamp(1.5rem,6vw,3.25rem)] font-bold leading-[1.18]">{heading}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 sm:mt-6 sm:text-lg">{text}</p>
          {supporting ? <p className="mx-auto mt-3 max-w-2xl text-base text-foreground/60">{supporting}</p> : null}
          <HeroCtas />
        </div>
        {visual ? <div className="mx-auto mt-6 w-full min-w-0 max-w-6xl sm:mt-10">{visual}</div> : null}
      </div>
    </section>
  )
}
