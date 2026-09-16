import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * A real PulseHub screenshot seated in a clean, device-less browser frame.
 * Neutral shadow (no amber glow) so it reads as premium product proof and
 * glows naturally on the dark "ink" surfaces.
 */
export function ProductScreenshot({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  frame = true,
  label,
  sizes = '(max-width: 1023px) calc(100vw - 2rem), 640px',
}: {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  frame?: boolean
  label?: string
  sizes?: string
}) {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="h-auto w-full max-w-full object-contain"
      sizes={sizes}
      priority={priority}
    />
  )

  if (!frame) {
    return (
      <div className={cn('w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-border bg-card', className)}>
        {image}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-border bg-card shadow-[0_28px_70px_-28px_rgb(0_0_0/0.30)]',
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" aria-hidden="true" />
        {label ? (
          <span className="ml-2 truncate font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
            {label}
          </span>
        ) : null}
      </div>
      {image}
    </div>
  )
}
