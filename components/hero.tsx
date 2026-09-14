import { Button } from '@/components/ui/button'
import { DashboardImage } from '@/components/product-visual'
import { SIGN_UP_URL } from '@/lib/site'
import { routes } from '@/lib/navigation'

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full min-w-0 max-w-7xl">
        <div className="mx-auto min-w-0 max-w-4xl space-y-6 text-center lg:max-w-5xl">
          <h1 className="min-w-0 text-[clamp(1.45rem,6.4vw,3.25rem)] font-bold leading-[1.18] text-foreground">
            <span className="block">Accommodation Management Software</span>
            <span className="block text-primary">Simplified for Growing Operators</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-foreground/70 sm:text-xl">
            Manage rooms, residents, rent, payments, maintenance and multiple properties from one connected platform. Built for HMO, co-living, student and shared-property operators.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              size="lg"
              className="min-h-11 whitespace-normal bg-primary px-5 hover:bg-primary/90"
              nativeButton={false}
              render={<a href={SIGN_UP_URL} />}
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-h-11 whitespace-normal border-primary px-5 text-primary hover:bg-primary/10"
              nativeButton={false}
              render={<a href={routes.features} />}
            >
              Explore the Platform
            </Button>
          </div>
        </div>
        <div className="relative mx-auto mt-10 w-full min-w-0 max-w-6xl sm:mt-12">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl" aria-hidden="true" />
          <DashboardImage priority className="relative" />
        </div>
      </div>
    </section>
  )
}
