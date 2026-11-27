'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { routes } from '@/lib/navigation'

/**
 * Site-wide lifetime-deal strip. Visibility is driven by the `promo-open` class on
 * <html> (set by SSR, removed before paint by the layout's no-flash script when the
 * visitor has dismissed it) via the `.promo-bar` rules in globals.css. Dismissing
 * removes the class and remembers the choice in localStorage. The matching `--promo-h`
 * variable keeps the header and page content aligned, so hiding the bar leaves no gap.
 */
export default function AnnouncementBar({ remaining, total }: { remaining: number; total: number }) {
  const seatsLine =
    remaining <= 0
      ? 'All spots taken.'
      : remaining < total
        ? `Only ${remaining} of ${total} spots left.`
        : `Only ${total} spots left.`

  function dismiss() {
    try {
      localStorage.setItem('ph-promo-dismissed', '1')
    } catch {
      // Private mode or blocked storage: dismissal just will not persist across visits.
    }
    document.documentElement.classList.remove('promo-open')
  }

  return (
    <div
      className="promo-bar fixed inset-x-0 top-0 z-[60] h-10 items-center justify-center bg-secondary px-11 text-secondary-foreground"
      role="region"
      aria-label="Site announcement"
    >
      <Link
        href={routes.lifetime}
        className="group flex items-center gap-2 rounded-sm text-center text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:text-sm"
      >
        <span className="inline-flex shrink-0 items-center rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary-foreground">
          Lifetime deal
        </span>
        <span className="group-hover:underline">
          {/* Full message on desktop; on mobile just the scarcity line so the pill fits on one line. */}
          <span className="hidden sm:inline">Pay once, keep PulseHub for life. </span>
          {seatsLine}
        </span>
      </Link>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-1.5 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-secondary-foreground/70 transition-colors hover:bg-white/10 hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}
