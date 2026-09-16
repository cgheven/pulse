import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { routes } from '@/lib/navigation'

const useCases = [
  {
    name: 'HMO operators',
    angle: 'Licensed HMOs and shared houses — rooms, rent and residents in one portfolio view.',
    href: routes.hmo,
  },
  {
    name: 'Student accommodation',
    angle: 'Halls and student houses — allocate rooms and beds and track occupancy through every move-in and move-out.',
    href: routes.student,
  },
  {
    name: 'Co-living',
    angle: 'Shared-living sites — manage shared spaces, split utilities and keep every resident’s payments visible.',
    href: routes.coliving,
  },
  {
    name: 'Hostels',
    angle: 'High-turnover sites — track bed-level occupancy and payments across the whole site.',
    href: undefined,
  },
  {
    name: 'Shared accommodation',
    angle: 'Any room-based site outgrowing spreadsheets — occupancy, residents, rent and maintenance in one place.',
    href: undefined,
  },
]

export default function UseCases() {
  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="reveal mx-auto max-w-7xl overflow-hidden rounded-2xl bg-ink px-6 py-12 text-ink-foreground sm:px-10 sm:py-16">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-accent">01 — One platform</p>
          <h2 className="mt-4 font-display text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.08] tracking-tight">
            One platform, whatever you operate.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            HMO, student, co-living or hostel — the same rooms, residents, rent and reporting, shaped around
            your accommodation.
          </p>
        </div>

        <ul className="mt-10 border-t border-ink-border">
          {useCases.map((useCase, index) => {
            const number = String(index + 1).padStart(2, '0')
            const body = (
              <>
                <span className="font-mono text-sm text-ink-accent sm:pt-1">{number}</span>
                <span className="min-w-0">
                  <span className="block text-lg font-semibold sm:text-xl">{useCase.name}</span>
                  <span className="mt-1 block max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                    {useCase.angle}
                  </span>
                </span>
                {useCase.href ? (
                  <span className="hidden shrink-0 items-center gap-1.5 self-center font-mono text-xs uppercase tracking-wide text-ink-accent transition-transform group-hover:translate-x-0.5 sm:flex">
                    Explore <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                ) : (
                  <span className="hidden shrink-0 self-center font-mono text-xs uppercase tracking-wide text-ink-muted sm:block">
                    Included
                  </span>
                )}
              </>
            )

            return (
              <li key={useCase.name} className="border-b border-ink-border">
                {useCase.href ? (
                  <Link
                    href={useCase.href}
                    className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 py-4 transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-accent sm:gap-6 sm:py-5"
                  >
                    {body}
                  </Link>
                ) : (
                  <div className="grid grid-cols-[auto_1fr_auto] items-start gap-4 py-4 sm:gap-6 sm:py-5">{body}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
