import { ProductVideo } from '@/components/product-video'

export default function Portfolio() {
  return (
    <section id="portfolio" className="scroll-mt-20 bg-muted/30 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-5 max-w-3xl space-y-2 text-center sm:mb-8 sm:space-y-3">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">Manage Every Property From One Platform</h2>
          <p className="text-base leading-relaxed text-foreground/70 sm:text-lg">
            The dashboard shows the selected property. Switch site from the header, or open All Properties to compare occupancy, collections, costs and profit.
          </p>
        </div>
        <ProductVideo
          src="/videos/property-switcher.mp4"
          width={3024}
          height={1576}
          ariaLabel="PulseHub property switcher: changing the selected property in the dashboard header and reviewing the All Properties portfolio view"
        />
      </div>
    </section>
  )
}
