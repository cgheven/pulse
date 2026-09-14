import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { SIGN_UP_URL } from '@/lib/site'
import { routes } from '@/lib/navigation'

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full min-w-0 max-w-7xl">
        <div className="grid items-center gap-12 min-w-0 lg:grid-cols-2">
          <div className="min-w-0 space-y-8">
            <div className="space-y-4">
              <h1 className="text-[clamp(1.65rem,6vw,3.5rem)] font-bold leading-[1.15] text-foreground">
                <span className="block">Accommodation Management Software,</span>
                <span className="block text-primary">Simplified</span>
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-foreground/70 sm:text-xl">
                Manage rooms, residents, rent, payments, maintenance and multiple properties from one powerful platform built for modern accommodation operators.
              </p>
              <p className="max-w-lg text-base text-foreground/60">
                Built for HMOs, co-living spaces, student accommodation and shared-property operators.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="min-h-11 bg-primary px-5 hover:bg-primary/90"
                nativeButton={false}
                render={<a href={SIGN_UP_URL} />}
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="min-h-11 border-primary px-5 text-primary hover:bg-primary/10"
                nativeButton={false}
                render={<a href={routes.features} />}
              >
                Explore the Platform
              </Button>
            </div>
          </div>
          <div className="relative min-w-0 w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl" aria-hidden="true" />
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-primary/20 shadow-2xl shadow-primary/10">
              <Image
                src="/dashboard-preview.png"
                alt="PulseHub accommodation management dashboard showing property, occupancy, rent and financial information."
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
