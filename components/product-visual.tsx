import { ProductScreenshot } from '@/components/feature-showcase'
import { screenshots } from '@/lib/screenshots'
import { cn } from '@/lib/utils'

export const DASHBOARD_IMAGE_ALT = screenshots.dashboard.alt

export const DASHBOARD_EXPLANATION =
  'Get a clear view of your accommodation business at a glance — collections, outstanding balances, occupancy, deposits, pending payments and expenses.'

export function DashboardImage({
  priority = false,
  className,
}: {
  priority?: boolean
  className?: string
}) {
  return (
    <ProductScreenshot
      src={screenshots.dashboard.src}
      alt={screenshots.dashboard.alt}
      width={screenshots.dashboard.width}
      height={screenshots.dashboard.height}
      priority={priority}
      className={className}
      sizes="(max-width: 1152px) calc(100vw - 2rem), 1152px"
    />
  )
}

export function ProductVisual({
  heading = 'A clearer view of your accommodation operations',
  text = DASHBOARD_EXPLANATION,
  className,
}: {
  heading?: string
  text?: string
  className?: string
}) {
  return (
    <section className={cn('px-4 py-8 sm:px-6 sm:py-14 lg:px-8', className)}>
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-8 max-w-3xl space-y-3 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">{heading}</h2>
          <p className="text-base leading-relaxed text-foreground/70 sm:text-lg">{text}</p>
        </div>
        <DashboardImage />
      </div>
    </section>
  )
}
