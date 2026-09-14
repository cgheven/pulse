import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

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
    <div id={id} className="mx-auto mb-12 max-w-3xl scroll-mt-20 space-y-4 text-center">
      <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{heading}</h2>
      {subtitle ? <p className="text-lg text-foreground/70 sm:text-xl">{subtitle}</p> : null}
    </div>
  )
}

export function CardGrid({
  items,
  columns = 'three',
}: {
  items: { icon?: LucideIcon; title: string; description: string; href?: string }[]
  columns?: 'two' | 'three' | 'four'
}) {
  const cols =
    columns === 'four'
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : columns === 'two'
        ? 'sm:grid-cols-2'
        : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className={`grid gap-6 ${cols}`}>
      {items.map((item) => {
        const Icon = item.icon
        const body = (
          <>
            {Icon ? (
              <div className="mb-4 w-fit rounded-lg bg-primary/10 p-3">
                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
            ) : null}
            <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
            <p className="text-sm leading-relaxed text-foreground/60">{item.description}</p>
          </>
        )

        if (item.href) {
          return (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              {body}
            </Link>
          )
        }

        return (
          <div key={item.title} className="rounded-xl border border-border bg-card p-6">
            {body}
          </div>
        )
      })}
    </div>
  )
}
