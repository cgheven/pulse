import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { SIGN_UP_URL } from '@/lib/site'
import { routes } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export function PageHero({
  eyebrow,
  heading,
  text,
  supporting,
  visual,
}: {
  eyebrow?: string
  heading: string
  text: string
  supporting?: string
  visual?: ReactNode
}) {
  return (
    <section className="px-4 pb-8 pt-20 sm:px-6 sm:pb-10 sm:pt-28 lg:px-8">
      <div className={cn('mx-auto text-center', visual ? 'w-full min-w-0 max-w-7xl' : 'max-w-4xl')}>
        <div className="mx-auto max-w-4xl">
          {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary sm:mb-4">{eyebrow}</p> : null}
          <h1 className="text-balance text-[clamp(1.5rem,6vw,3.25rem)] font-bold leading-[1.18]">{heading}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 sm:mt-6 sm:text-lg">{text}</p>
          {supporting ? <p className="mx-auto mt-3 max-w-2xl text-base text-foreground/60">{supporting}</p> : null}
          <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row">
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
              render={<a href={routes.contact} />}
            >
              Book a Demo
            </Button>
          </div>
        </div>
        {visual ? <div className="mx-auto mt-6 w-full min-w-0 max-w-6xl sm:mt-10">{visual}</div> : null}
      </div>
    </section>
  )
}
