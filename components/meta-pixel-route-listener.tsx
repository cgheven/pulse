'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Fires a Meta Pixel PageView on App Router client-side navigation. The initial
 * page load is already tracked by the pixel init script (components/meta-pixel.tsx),
 * so the first pathname is skipped to avoid double-counting. It no-ops wherever the
 * pixel is not loaded (for example in development), so it never needs its own guard.
 */
export function MetaPixelRouteListener() {
  const pathname = usePathname()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'PageView')
    }
  }, [pathname])

  return null
}
