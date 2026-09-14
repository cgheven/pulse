import { Button } from '@/components/ui/button'
import { SIGN_UP_URL } from '@/lib/site'

export default function Cta() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center space-y-6 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 border border-primary/20 rounded-2xl p-8 sm:p-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Ready to Simplify Your Accommodation Operations?
        </h2>
        <p className="text-lg text-foreground/70">
          Start a 14-day free trial of PulseHub and run rent, occupancy, residents, and billing from one platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 min-h-11 px-5"
            nativeButton={false}
            render={<a href={SIGN_UP_URL} />}
          >
            Start free trial
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 min-h-11 px-5"
            nativeButton={false}
            render={<a href="#pricing" />}
          >
            View PulseHub pricing
          </Button>
        </div>
      </div>
    </section>
  )
}
