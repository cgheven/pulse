import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { DEMO_URL, LIVE_WEBSITE_URL, SIGN_UP_URL } from '@/lib/site'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full min-w-0 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-w-0">
          <div className="space-y-8 min-w-0">
            <div className="space-y-4">
              <h1 className="text-[clamp(1.65rem,6.5vw,3.75rem)] font-bold leading-[1.15] text-foreground">
                <span className="block">Hostel Management</span>
                <span className="block">Software</span>
              </h1>
              <p className="text-[clamp(1.5rem,5vw,3rem)] font-bold leading-tight text-primary">
                Simplified.
              </p>

              <p className="max-w-lg text-lg leading-relaxed text-foreground/70 sm:text-xl">
                Accommodation management software for UK hostels, student accommodation, HMOs, co-living operators, and guest houses. Track residents, occupancy, rent, and billing across every property from one dashboard.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 group min-h-11 px-5"
                nativeButton={false}
                render={<a href={SIGN_UP_URL} />}
              >
                Start free trial
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform motion-reduce:transform-none" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 min-h-11 px-5"
                nativeButton={false}
                render={<a href={DEMO_URL} target="_blank" rel="noopener noreferrer" />}
              >
                Watch demo
              </Button>
            </div>

            <p className="text-sm text-foreground/60">
              14-day free trial, no card required.{' '}
              <a
                href={LIVE_WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline underline-offset-4"
              >
                See a live hostel website
              </a>
              {' '}or{' '}
              <a href="#features" className="font-medium text-primary hover:underline underline-offset-4">
                explore hostel management features
              </a>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-primary">14 days</p>
                <p className="text-sm text-foreground/60">Free trial, no card required</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">24 hrs</p>
                <p className="text-sm text-foreground/60">From sign-up to live</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">24/7</p>
                <p className="text-sm text-foreground/60">Expert support</p>
              </div>
            </div>
          </div>

          <div className="relative min-w-0 w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-3xl" aria-hidden="true" />
            <div className="relative w-full overflow-hidden rounded-2xl border border-primary/20 shadow-2xl shadow-primary/10 aspect-[16/9]">
              <Image
                src="/dashboard-preview.png"
                alt="PulseHub hostel management dashboard showing occupancy, rent collection, and revenue analytics"
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
