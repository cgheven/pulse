import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SectionHeading({
  heading,
  subtitle,
  id,
}: {
  heading: string
  subtitle?: string
  id?: string
}) {
  return (
    <div id={id} className="mx-auto mb-5 max-w-3xl scroll-mt-24 space-y-2 text-center sm:mb-8 sm:space-y-3">
      <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">{heading}</h2>
      {subtitle ? <p className="text-base leading-relaxed text-foreground/70 sm:text-lg">{subtitle}</p> : null}
    </div>
  )
}

export function CardGrid({
  items,
  columns = 'three',
  size = 'default',
  className,
}: {
  items: { icon?: LucideIcon; title: string; description: string; href?: string }[]
  columns?: 'two' | 'three' | 'four'
  size?: 'default' | 'comfortable'
  className?: string
}) {
  const cols =
    columns === 'four'
      ? 'md:grid-cols-2 lg:grid-cols-4'
      : columns === 'two'
        ? 'md:grid-cols-2'
        : 'md:grid-cols-2 lg:grid-cols-3'

  const comfortable = size === 'comfortable'

  return (
    <div className={cn('grid items-stretch gap-3 sm:gap-5', cols, className)}>
      {items.map((item) => {
        const Icon = item.icon
        const body = (
          <>
            {Icon ? (
              <div className={cn('mb-2.5 w-fit rounded-lg bg-primary/10 sm:mb-3', comfortable ? 'p-2.5 sm:p-3' : 'p-2 sm:p-2.5')}>
                <Icon className={cn('text-primary', comfortable ? 'h-5 w-5 sm:h-6 sm:w-6' : 'h-5 w-5')} aria-hidden="true" />
              </div>
            ) : null}
            <h3 className={cn('font-semibold', comfortable ? 'mb-1.5 text-lg leading-snug sm:mb-2.5 sm:text-xl' : 'mb-1.5 text-base sm:mb-2 sm:text-lg')}>
              {item.title}
            </h3>
            <p className="leading-relaxed text-foreground/75 text-base">
              {item.description}
            </p>
          </>
        )

        if (item.href) {
          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                'rounded-xl border border-border bg-card transition-colors hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5',
                comfortable ? 'p-5 sm:p-7' : 'p-4 sm:p-6',
              )}
            >
              {body}
            </Link>
          )
        }

        return (
          <div
            key={item.title}
            className={cn('rounded-xl border border-border bg-card', comfortable ? 'p-5 sm:p-7' : 'p-4 sm:p-6')}
          >
            {body}
          </div>
        )
      })}
    </div>
  )
}
