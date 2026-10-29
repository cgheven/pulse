'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { AnalyticsRouteListener } from '@/components/analytics-route-listener'
import { GoogleTagManager } from '@/components/google-tag-manager'
import { MetaPixel } from '@/components/meta-pixel'
import { MetaPixelRouteListener } from '@/components/meta-pixel-route-listener'
import { routes } from '@/lib/navigation'

const STORAGE_KEY = 'ph-cookie-consent'
/** Dispatched to reopen the banner, e.g. from a "Manage cookies" control. */
export const COOKIE_SETTINGS_EVENT = 'ph:open-cookie-settings'

type Consent = 'granted' | 'denied'

function readStoredConsent(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

/** Reopen the consent banner from anywhere (e.g. the Cookie Policy page). */
export function openCookieSettings() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))
  }
}

/**
 * Consent gate for non-essential tracking. Google Tag Manager (GA4) and the Meta
 * Pixel only load once the visitor accepts; until then nothing non-essential runs.
 * The choice persists in localStorage. Vercel Analytics is cookieless and stays
 * mounted in the layout, so it is not gated here.
 */
export function CookieConsent() {
  const [mounted, setMounted] = useState(false)
  const [consent, setConsent] = useState<Consent | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = readStoredConsent()
    setConsent(stored)
    setOpen(stored === null)

    const reopen = () => setOpen(true)
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen)
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen)
  }, [])

  const choose = useCallback(
    (value: Consent) => {
      const wasGranted = consent === 'granted'
      try {
        localStorage.setItem(STORAGE_KEY, value)
      } catch {
        // Ignore storage failures; the choice still applies for this session.
      }
      setConsent(value)
      setOpen(false)
      // Withdrawing consent needs a reload: already-injected tags cannot be unloaded.
      if (wasGranted && value === 'denied') {
        window.location.reload()
      }
    },
    [consent],
  )

  if (!mounted) return null

  return (
    <>
      {consent === 'granted' ? (
        <>
          <GoogleTagManager />
          <MetaPixel />
          <AnalyticsRouteListener />
          <MetaPixelRouteListener />
        </>
      ) : null}

      {open ? (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <p className="text-sm leading-relaxed text-foreground/80">
              We use cookies to measure traffic and marketing performance, through Google Analytics and the Meta
              Pixel. These load only if you accept. See our{' '}
              <Link href={routes.cookies} className="font-medium text-primary underline underline-offset-4 hover:decoration-primary">
                Cookie Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => choose('denied')}
                className="min-h-10 flex-1 rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted lg:flex-none"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => choose('granted')}
                className="min-h-10 flex-1 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 lg:flex-none"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
