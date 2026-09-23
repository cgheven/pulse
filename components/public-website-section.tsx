import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { ProductScreenshot } from '@/components/feature-showcase'

type Shot = { src: string; alt: string; width: number; height: number }

/**
 * Showcase for the complimentary public website every property gets.
 * Copy is passed in so each market can frame it in its own terms; the layout
 * stays consistent across pages.
 */
export function PublicWebsiteSection({
  eyebrow = 'Free public website',
  heading = 'Every property gets its own website, free',
  lead,
  features,
  note = 'Included on every plan at no extra cost.',
  screenshot,
  imageLabel = 'Your public listing page',
  imageFirst = false,
}: {
  eyebrow?: string
  heading?: string
  lead: ReactNode
  features: string[]
  note?: string
  screenshot: Shot
  imageLabel?: string
  imageFirst?: boolean
}) {
  const text = (
    <div className={`min-w-0 ${imageFirst ? 'order-1 lg:order-2' : ''}`}>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-4 font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium leading-tight tracking-tight">
        {heading}
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{lead}</p>
      <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {features.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-base text-foreground/85">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      {note ? <p className="mt-6 text-base leading-relaxed text-muted-foreground">{note}</p> : null}
    </div>
  )

  const image = (
    <div className={`min-w-0 ${imageFirst ? 'order-2 lg:order-1' : ''}`}>
      <ProductScreenshot
        src={screenshot.src}
        alt={screenshot.alt}
        width={screenshot.width}
        height={screenshot.height}
        label={imageLabel}
        sizes="(max-width: 1023px) calc(100vw - 2rem), 40rem"
      />
    </div>
  )

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {text}
        {image}
      </div>
    </section>
  )
}
