import { Button } from '@/components/ui/button'
import { SIGN_UP_URL } from '@/lib/site'
import { routes } from '@/lib/navigation'

export function CtaBand({
  heading,
  text,
  secondaryHref = routes.contact,
  secondaryLabel = 'Book a Demo',
}: {
  heading: string
  text: string
  secondaryHref?: string
  secondaryLabel?: string
}) {
  const secondaryIsExternal = secondaryHref.startsWith('http') || secondaryHref.startsWith('mailto:')

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-5 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 p-6 text-center sm:p-10">
        <h2 className="text-3xl font-bold sm:text-4xl">{heading}</h2>
        <p className="text-lg text-foreground/70">{text}</p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
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
            render={<a href={secondaryHref} {...(secondaryIsExternal ? { rel: secondaryHref.startsWith('https') ? 'noopener noreferrer' : undefined } : {})} />}
          >
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
