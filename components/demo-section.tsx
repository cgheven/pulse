import { StartTrialButton } from '@/components/tracked-cta'

/**
 * Homepage product demo. The hero's "Watch Demo" button smooth-scrolls to this
 * section (id below). Uses the privacy-enhanced YouTube embed, lazy-loaded, with
 * no autoplay, in a responsive 16:9 container.
 */
export function DemoSection() {
  return (
    <section
      id="see-pulsehub-in-action"
      aria-labelledby="see-pulsehub-in-action-heading"
      className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2
          id="see-pulsehub-in-action-heading"
          className="scroll-mt-28 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.1] tracking-tight"
        >
          See PulseHub in Action
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          See how PulseHub brings properties, residents, rent, payments and operations together in one platform.
        </p>

        <div className="mx-auto mt-8 w-full max-w-5xl overflow-hidden rounded-2xl border border-border shadow-lg shadow-primary/10 sm:mt-10">
          <div className="relative aspect-video">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube-nocookie.com/embed/5BuYd5Sw4yg"
              title="PulseHub product demo video"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mt-8 sm:mt-10">
          <p className="font-display text-xl font-medium tracking-tight sm:text-2xl">
            Ready to simplify your accommodation operations?
          </p>
          <div className="mt-5 flex justify-center">
            <StartTrialButton
              location="other"
              size="lg"
              className="min-h-12 whitespace-normal bg-primary px-6 text-base hover:bg-primary/90"
            >
              Start Your Free Trial
            </StartTrialButton>
          </div>
        </div>
      </div>
    </section>
  )
}
