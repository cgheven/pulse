'use client'

import { openCookieSettings } from '@/components/cookie-consent'

/** Reopens the cookie-consent banner so a visitor can change their choice. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="font-medium text-primary underline underline-offset-4 hover:decoration-primary"
    >
      Manage cookie preferences
    </button>
  )
}
