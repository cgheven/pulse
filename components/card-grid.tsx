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
    <div id={id} className="mx-auto mb-8 max-w-3xl scroll-mt-24 space-y-3 text-center sm:mb-10">
      <h2 className="text-3xl font-bold sm:text-4xl">{heading}</h2>
      {subtitle ? <p className="text-base text-foreground/70 sm:text-lg">{subtitle}</p> : null}
    </div>
  )
}

export function CardGrid({
  items,
  columns = 'three',
  className,
}: {
  items: { icon?: LucideIcon; title: string; description: string; href?: string }[]
  columns?: 'two' | 'three' | 'four'
  className?: string
}) {
  const cols =
    columns === 'four'
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : columns === 'two'
        ? 'sm:grid-cols-2'
        : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className={cn('grid gap-4 sm:gap-5', cols, className)}>
      {items.map((item) => {
        const Icon = item.icon
        const body = (
          <>
            {Icon ? (
              <div className="mb-3 w-fit rounded-lg bg-primary/10 p-2.5">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
            ) : null}
            <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
            <p className="text-base leading-relaxed text-foreground/70">{item.description}</p>
          </>
        )

        if (item.href) {
          return (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 sm:p-6"
            >
              {body}
            </Link>
          )
        }

        return (
          <div key={item.title} className="rounded-xl border border-border bg-card p-5 sm:p-6">
            {body}
          </div>
        )
      })}
    </div>
  )
}
