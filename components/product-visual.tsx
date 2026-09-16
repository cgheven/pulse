import { ProductScreenshot } from '@/components/feature-showcase'
import { screenshots } from '@/lib/screenshots'

export function DashboardImage({
  priority = false,
  className,
  label = 'Portfolio overview',
  sizes = '(max-width: 1152px) calc(100vw - 2rem), 1152px',
}: {
  priority?: boolean
  className?: string
  label?: string
  sizes?: string
}) {
  return (
    <ProductScreenshot
      src={screenshots.dashboard.src}
      alt={screenshots.dashboard.alt}
      width={screenshots.dashboard.width}
      height={screenshots.dashboard.height}
      priority={priority}
      className={className}
      label={label}
      sizes={sizes}
    />
  )
}
