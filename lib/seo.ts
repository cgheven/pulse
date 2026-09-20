import type { Metadata } from 'next'
import { routes } from '@/lib/navigation'
import { SITE_NAME, SITE_URL } from '@/lib/site'

/**
 * Regional hreflang cluster. The global homepage is x-default; /uk and /pakistan
 * are the region-targeted entry points. Applied to those three pages so search
 * engines understand the regional relationship (no auto-redirects).
 */
export const marketHreflang: Record<string, string> = {
  'en-GB': `${SITE_URL}${routes.uk}`,
  'en-PK': `${SITE_URL}${routes.pakistan}`,
  'x-default': `${SITE_URL}/`,
}

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  languages,
}: {
  title: string
  description: string
  path: string
  absoluteTitle?: boolean
  /** hreflang alternates (e.g. marketHreflang). Omit for pages outside a regional cluster. */
  languages?: Record<string, string>
}): Metadata {
  const url = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  }
}

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
