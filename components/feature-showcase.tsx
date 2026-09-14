import Image from 'next/image'
import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function ProductScreenshot({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  sizes = '(max-width: 1023px) calc(100vw - 2rem), 50vw',
}: {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  sizes?: string
}) {
  return (
    <div className={cn('w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-2xl shadow-primary/10', className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full max-w-full object-contain"
        style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
        sizes={sizes}
        unoptimized
        priority={priority}
      />
    </div>
  )
}

export function FeatureShowcase({
  id,
  heading,
  text,
  points,
  src,
  alt,
  width,
  height,
  reverse = false,
  compact = false,
  muted = false,
  children,
}: {
  id?: string
  heading: string
  text: string
  points: string[]
  src: string
  alt: string
  width: number
  height: number
  reverse?: boolean
  compact?: boolean
  muted?: boolean
  children?: ReactNode
}) {
  return (
    <section id={id} className={cn('scroll-mt-20 px-4 sm:px-6 lg:px-8', compact ? 'py-10 sm:py-12' : 'py-14', muted && 'bg-muted/30')}>
      <div
        className={cn(
          'mx-auto flex max-w-7xl min-w-0 flex-col gap-8 lg:items-center lg:gap-12',
          reverse ? 'lg:flex-row-reverse' : 'lg:flex-row',
        )}
      >
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">{heading}</h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/70 sm:text-lg">{text}</p>
          <ul className="mt-6 space-y-2.5">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-base text-foreground/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          {children}
        </div>
        <div className="min-w-0 flex-1">
          <ProductScreenshot src={src} alt={alt} width={width} height={height} />
        </div>
      </div>
    </section>
  )
}
