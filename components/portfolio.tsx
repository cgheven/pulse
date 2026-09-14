import { Check } from 'lucide-react'
import { ProductVideo } from '@/components/product-video'
import { routes } from '@/lib/navigation'

const points = [
  'Use the property switcher in the dashboard header to change site',
  'The main dashboard then shows the property you selected',
  'Open All Properties to compare occupancy, collections, costs and net profit',
  'Plans scale by how many properties you manage',
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="scroll-mt-20 bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-6 max-w-3xl space-y-3 text-center sm:mb-8">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">Manage Every Property From One Platform</h2>
          <p className="text-base leading-relaxed text-foreground/70 sm:text-lg">
            The main dashboard shows the property you have selected. Use the property switcher to move to another site, or open All Properties to compare occupancy, collections, costs and profit across the portfolio.
          </p>
        </div>

        <ProductVideo
          src="/videos/property-switcher.mp4"
          width={3024}
          height={1576}
          ariaLabel="PulseHub property switcher: changing the selected property in the dashboard header and reviewing the All Properties portfolio view"
        />

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground/80">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:gap-6">
          <a href="#pricing" className="inline-flex min-h-11 items-center justify-center font-medium text-primary hover:underline">
            View pricing
          </a>
          <a href={routes.features} className="inline-flex min-h-11 items-center justify-center font-medium text-primary hover:underline">
            Explore the Platform
          </a>
        </div>
      </div>
    </section>
  )
}
