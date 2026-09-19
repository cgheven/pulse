import { BookDemoButton, StartTrialButton } from '@/components/tracked-cta'
import { routes } from '@/lib/navigation'

export function CtaBand({
  heading,
  text,
  secondaryHref = routes.bookDemo,
  secondaryLabel = 'Book a Demo',
  note = 'One platform for HMO, student, co-living & hostel operators.',
}: {
  heading: string
  text: string
  secondaryHref?: string
  secondaryLabel?: string
  note?: string
}) {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl bg-ink px-6 py-12 text-ink-foreground sm:px-12 sm:py-16">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-accent">Get started</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">{text}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <StartTrialButton
            location="final_cta"
            size="lg"
            className="min-h-12 whitespace-normal bg-primary px-6 text-base hover:bg-primary/90"
          />
          <BookDemoButton
            location="final_cta"
            href={secondaryHref}
            size="lg"
            className="min-h-12 whitespace-normal border-ink-border bg-transparent px-6 text-base text-ink-foreground hover:bg-white/10 hover:text-ink-foreground"
          >
            {secondaryLabel}
          </BookDemoButton>
        </div>
        {note ? <p className="mt-6 font-mono text-xs uppercase tracking-wide text-ink-muted">{note}</p> : null}
      </div>
    </section>
  )
}
