import Image from 'next/image'
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
