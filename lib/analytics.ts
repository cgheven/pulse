import { routes } from './navigation.ts'
import { regionCodes } from './pricing.ts'
import { APP_ORIGIN, SITE_URL } from './site.ts'

export const GA_MEASUREMENT_ID = 'G-KTBY62T8PL'

export const analyticsEvents = {
  startTrialClicked: 'start_trial_clicked',
  signInClicked: 'sign_in_clicked',
  demoRequested: 'demo_requested',
  demoSubmitted: 'demo_submitted',
  checkoutStarted: 'checkout_started',
  countrySelected: 'country_selected',
  pricingViewed: 'pricing_viewed',
  solutionPageViewed: 'solution_page_viewed',
  faqOpened: 'faq_opened',
  pageView: 'page_view',
} as const

export type AnalyticsEvent = (typeof analyticsEvents)[keyof typeof analyticsEvents]

export const ctaLocations = ['header', 'hero', 'pricing', 'final_cta', 'footer', 'other'] as const
export type CtaLocation = (typeof ctaLocations)[number]

export const pageTypes = ['homepage', 'pricing', 'solution', 'about', 'contact', 'other'] as const
export type PageType = (typeof pageTypes)[number]

export const solutions = ['hmo', 'student_accommodation', 'co_living', 'hostel', 'other'] as const
export type Solution = (typeof solutions)[number]

export const destinations = ['signup', 'login', 'contact'] as const
export type Destination = (typeof destinations)[number]

export type AnalyticsParams = {
  cta_location?: CtaLocation
  page_type?: PageType
  solution?: Solution
  destination?: Destination
  region?: string
}

const allowedParamValues = {
  cta_location: new Set<string>(ctaLocations),
  page_type: new Set<string>(pageTypes),
  solution: new Set<string>(solutions),
  destination: new Set<string>(destinations),
  region: new Set<string>(regionCodes),
} as const

const personalDataPattern = /@|\d{8,}/

let lastPageViewPath: string | null = null
const onceKeys = new Set<string>()

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function shouldLoadGoogleAnalytics() {
  if (process.env.NEXT_PUBLIC_GA_DISABLED === 'true') return false
  return process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_GA_DEBUG === 'true'
}

export function crossDomainHosts() {
  const hosts = new Set<string>(['yourpulse.io', 'www.yourpulse.io'])

  for (const origin of [SITE_URL, APP_ORIGIN]) {
    try {
      hosts.add(new URL(origin).hostname)
    } catch {
      // Ignore malformed public origins; the static hosts above still apply.
    }
  }

  return [...hosts]
}

export function safePagePath(input: string) {
  const path = input.split('?')[0]?.split('#')[0] || '/'
  return path.startsWith('/') ? path : `/${path}`
}

export function pageTypeFromPath(path: string): PageType {
  const pathname = safePagePath(path)
  if (pathname === routes.home) return 'homepage'
  if (pathname === routes.pricing) return 'pricing'
  if (pathname === routes.about) return 'about'
  if (pathname === routes.contact) return 'contact'
  if (solutionFromPath(pathname)) return 'solution'
  return 'other'
}

export function solutionFromPath(path: string): Solution | undefined {
  const pathname = safePagePath(path)
  if (pathname === routes.hmo) return 'hmo'
  if (pathname === routes.student) return 'student_accommodation'
  if (pathname === routes.coliving) return 'co_living'
  return undefined
}

export function looksLikePersonalData(value: string) {
  return personalDataPattern.test(value)
}

export function sanitizeEventParams(params: Record<string, unknown> = {}): AnalyticsParams {
  const sanitized: AnalyticsParams = {}

  for (const [key, rawValue] of Object.entries(params)) {
    if (!(key in allowedParamValues)) continue
    if (typeof rawValue !== 'string') continue
    if (looksLikePersonalData(rawValue)) continue

    const allowed = allowedParamValues[key as keyof typeof allowedParamValues]
    if (!allowed.has(rawValue)) continue

    sanitized[key as keyof AnalyticsParams] = rawValue as never
  }

  return sanitized
}

export function googleAnalyticsInlineScript() {
  const debugMode = process.env.NEXT_PUBLIC_GA_DEBUG === 'true'
  const hosts = JSON.stringify(crossDomainHosts())

  return `
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(){ dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      linker: { domains: ${hosts} }${debugMode ? ',\n      debug_mode: true' : ''}
    });
  `
}

function currentPathname() {
  if (typeof window === 'undefined') return routes.home
  return safePagePath(window.location.pathname)
}

function contextParams(extra: AnalyticsParams = {}): AnalyticsParams {
  const path = currentPathname()
  return sanitizeEventParams({
    page_type: pageTypeFromPath(path),
    solution: solutionFromPath(path),
    ...extra,
  })
}

function getGtag() {
  if (typeof window === 'undefined') return null

  if (typeof window.gtag === 'function') return window.gtag

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer!.push(arguments as unknown as never)
  }

  return window.gtag
}

export function trackEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  try {
    const gtag = getGtag()
    if (!gtag) return
    gtag('event', event, sanitizeEventParams(params))
  } catch {
    // Analytics must never break navigation or rendering.
  }
}

export function sendPageView(path: string) {
  if (typeof window === 'undefined') return

  const pathname = safePagePath(path)
  if (lastPageViewPath === pathname) return
  lastPageViewPath = pathname

  try {
    const gtag = getGtag()
    if (!gtag) return

    const payload: Record<string, unknown> = {
      page_path: pathname,
      page_location: `${window.location.origin}${pathname}`,
      ...sanitizeEventParams({
        page_type: pageTypeFromPath(pathname),
        solution: solutionFromPath(pathname),
      }),
    }

    if (typeof document !== 'undefined' && document.title) {
      payload.page_title = document.title
    }

    gtag('event', analyticsEvents.pageView, payload)
  } catch {
    lastPageViewPath = null
  }
}

export function trackOnce(key: string, event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (onceKeys.has(key)) return
  onceKeys.add(key)
  trackEvent(event, params)
}

export function trackStartTrial(ctaLocation: CtaLocation) {
  trackEvent(analyticsEvents.startTrialClicked, contextParams({
    cta_location: ctaLocation,
    destination: 'signup',
  }))
}

export function trackSignIn(ctaLocation: CtaLocation) {
  trackEvent(analyticsEvents.signInClicked, contextParams({
    cta_location: ctaLocation,
    destination: 'login',
  }))
}

export function trackDemoRequested(ctaLocation: CtaLocation) {
  trackEvent(analyticsEvents.demoRequested, contextParams({
    cta_location: ctaLocation,
    destination: 'contact',
  }))
}

export function trackCountrySelected(region: string) {
  trackEvent(analyticsEvents.countrySelected, contextParams({ region }))
}

/** Fires when a Book a Demo form submission is accepted by the API. */
export function trackDemoSubmitted() {
  trackEvent(analyticsEvents.demoSubmitted, contextParams({ destination: 'contact' }))
}

/** Fires when the Paddle checkout overlay opens on /checkout. No transaction id is sent. */
export function trackCheckoutStarted() {
  trackEvent(analyticsEvents.checkoutStarted, contextParams())
}

export function trackPricingViewed(path = currentPathname()) {
  const pathname = safePagePath(path)
  trackOnce(`pricing_viewed:${pathname}`, analyticsEvents.pricingViewed, contextParams())
}

export function trackSolutionPageViewed(path: string) {
  const pathname = safePagePath(path)
  const solution = solutionFromPath(pathname)
  if (!solution) return
  trackOnce(`solution_page_viewed:${pathname}`, analyticsEvents.solutionPageViewed, {
    page_type: 'solution',
    solution,
  })
}

export function trackFaqOpened() {
  trackEvent(analyticsEvents.faqOpened, contextParams())
}

export function resetAnalyticsStateForTests() {
  lastPageViewPath = null
  onceKeys.clear()
}
