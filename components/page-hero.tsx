import { Button } from '@/components/ui/button'
import { SIGN_UP_URL } from '@/lib/site'
import { routes } from '@/lib/navigation'

export function PageHero({
  eyebrow,
  heading,
  text,
  supporting,
}: {
  eyebrow?: string
  heading: string
  text: string
  supporting?: string
}) {
  return (
    <section className="px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        {eyebrow ? <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p> : null}
        <h1 className="text-balance text-[clamp(1.75rem,5vw,3.25rem)] font-bold leading-tight">{heading}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/70">{text}</p>
        {supporting ? <p className="mx-auto mt-3 max-w-2xl text-base text-foreground/60">{supporting}</p> : null}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
            render={<a href={routes.contact} />}
          >
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  )
}
