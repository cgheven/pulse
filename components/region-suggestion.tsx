'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { routes } from '@/lib/navigation'

type Region = { label: string; short: string; href: string }

// Only countries that have a dedicated regional page are suggested.
const REGIONS: Record<string, Region> = {
  GB: { label: 'the UK', short: 'UK', href: routes.uk },
  PK: { label: 'Pakistan', short: 'Pakistan', href: routes.pakistan },
}

const DISMISS_KEY = 'pulse_region_suggestion_dismissed'

export function RegionSuggestion() {
  const pathname = usePathname()
  const [region, setRegion] = useState<Region | null>(null)

  useEffect(() => {
    let cancelled = false

    try {
      if (localStorage.getItem(DISMISS_KEY) === '1') return
    } catch {
      // localStorage may be unavailable (private mode); just proceed without persistence.
    }

    fetch('/api/geo')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { country?: string | null } | null) => {
        if (cancelled || !data?.country) return
        const match = REGIONS[data.country]
        // Never suggest the page the visitor is already on.
        if (!match || pathname === match.href) return
        setRegion(match)
      })
      .catch(() => {
        // Soft feature: silently do nothing on any error (e.g. no geo header locally).
      })

    return () => {
      cancelled = true
    }
  }, [pathname])

  if (!region) return null

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // ignore
    }
    setRegion(null)
  }

  return (
    <div
      role="region"
      aria-label="Regional site suggestion"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-sm"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-3 px-4 py-3 sm:flex-row sm:items-center sm:px-6">
        <p className="flex-1 text-sm text-foreground/80">
          Looking for PulseHub pricing and features for <strong className="font-semibold text-foreground">{region.label}</strong>?
        </p>
        <div className="flex items-center gap-2">
          <Link
            href={region.href}
            onClick={dismiss}
            className="inline-flex min-h-9 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View {region.short} site
          </Link>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss regional suggestion"
            className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg text-foreground/60 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
