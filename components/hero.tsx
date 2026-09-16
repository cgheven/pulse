import { BookDemoButton, StartTrialButton } from '@/components/tracked-cta'
import { DashboardImage } from '@/components/product-visual'

const tracks = ['Occupancy', 'Collections', 'Overdue', 'Deposits', 'Expenses']

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-8">
      <div className="mx-auto grid w-full min-w-0 max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-14">
        <div className="min-w-0 max-w-xl text-center lg:text-left">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            Accommodation management software
          </p>
          <h1 className="mt-5 text-balance font-display text-[clamp(2.4rem,6.2vw,4.25rem)] font-medium leading-[1.03] tracking-tight text-foreground">
            Every room, resident and <span className="text-primary">rent payment</span> — in one place.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            PulseHub brings occupancy, resident records, rent, utilities, maintenance and multi-property
            reporting into one platform — built for HMO, student, co-living and hostel operators.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
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
          <p className="mt-4 text-center font-mono text-xs uppercase tracking-wide text-muted-foreground lg:text-left">
            14-day free trial · no card required
          </p>
        </div>

        <div className="relative min-w-0 lg:-mr-8 xl:-mr-16">
          <DashboardImage
            priority
            label="Portfolio overview"
            sizes="(max-width: 1023px) calc(100vw - 2rem), 50rem"
          />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-start lg:pl-4">
            {tracks.map((track) => (
              <span key={track} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary/60" aria-hidden="true" />
                {track}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
