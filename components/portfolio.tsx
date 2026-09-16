import { ProductVideo } from '@/components/product-video'

export default function Portfolio() {
  return (
    <section id="portfolio" className="scroll-mt-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="reveal mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div className="order-2 min-w-0 lg:order-1">
          <ProductVideo
            src="/videos/property-switcher.mp4"
            width={3024}
            height={1576}
            label="All properties · portfolio"
            ariaLabel="PulseHub property switcher: changing the selected property in the dashboard header and reviewing the All Properties portfolio view"
          />
          <p className="sr-only">
            A short product recording of the PulseHub property switcher. It shows changing the selected
            property from the dashboard header, then opening All Properties to compare occupancy, collections,
            costs and profit.
          </p>
        </div>
        <div className="order-1 min-w-0 max-w-xl lg:order-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">03 · Multi-property</p>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1.06] tracking-tight">
            See every property from one account.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Switch the selected site from the dashboard header, or open All Properties to compare occupancy,
            collections, costs and profit across your portfolio, with no separate logins per building.
          </p>
          <p className="mt-6 font-mono text-sm text-foreground/80">
            <span className="text-primary">Plans:</span> 1, 3 or 10 properties.
          </p>
        </div>
      </div>
    </section>
  )
}
