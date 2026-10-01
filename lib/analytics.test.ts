import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import {
  analyticsEvents,
  GA_MEASUREMENT_ID,
  looksLikePersonalData,
  pageTypeFromPath,
  resetAnalyticsStateForTests,
  safePagePath,
  sanitizeEventParams,
  sendPageView,
  solutionFromPath,
  trackEvent,
  trackFaqOpened,
  trackOnce,
  trackPricingViewed,
  trackCheckoutStarted,
  trackCountrySelected,
  trackDemoRequested,
  trackDemoSubmitted,
  trackSignIn,
  trackSolutionPageViewed,
  trackStartTrial,
} from './analytics.ts'

type DataLayerEvent = Record<string, unknown>

function installDataLayerMock(pathname = '/') {
  const dataLayer: DataLayerEvent[] = []
  const windowMock = {
    dataLayer,
    location: {
      origin: 'https://www.yourpulse.io',
      pathname,
    },
  }

  Object.defineProperty(globalThis, 'window', {
    value: windowMock,
    configurable: true,
    writable: true,
  })

  return { dataLayer, windowMock }
}

afterEach(() => {
  resetAnalyticsStateForTests()
  Reflect.deleteProperty(globalThis, 'window')
  Reflect.deleteProperty(globalThis, 'document')
})

test('keeps the existing GA4 measurement ID (configured in GTM)', () => {
  assert.equal(GA_MEASUREMENT_ID, 'G-KTBY62T8PL')
})

test('pushes events onto the GTM dataLayer as {event, ...params}, not via gtag', () => {
  const { dataLayer } = installDataLayerMock('/')

  trackStartTrial('hero')

  assert.equal(dataLayer.length, 1)
  assert.deepEqual(dataLayer[0], {
    event: analyticsEvents.startTrialClicked,
    page_type: 'homepage',
    cta_location: 'hero',
    destination: 'signup',
  })
  // No gtag is used by the application any more; the container/config lives in GTM.
  assert.equal((globalThis.window as { gtag?: unknown }).gtag, undefined)
})

test('maps marketing routes to controlled page types and solutions', () => {
  assert.equal(pageTypeFromPath('/'), 'homepage')
  assert.equal(pageTypeFromPath('/pricing'), 'pricing')
  assert.equal(pageTypeFromPath('/about'), 'about')
  assert.equal(pageTypeFromPath('/contact'), 'contact')
  assert.equal(pageTypeFromPath('/features'), 'other')
  assert.equal(pageTypeFromPath('/uk-hmo-management-software'), 'solution')
  assert.equal(pageTypeFromPath('/student-accommodation-management-software'), 'solution')
  assert.equal(pageTypeFromPath('/co-living-management-software'), 'solution')
  assert.equal(solutionFromPath('/uk-hmo-management-software'), 'hmo')
  assert.equal(solutionFromPath('/student-accommodation-management-software'), 'student_accommodation')
  assert.equal(solutionFromPath('/co-living-management-software'), 'co_living')
  assert.equal(solutionFromPath('/pricing'), undefined)
})

test('strips query strings so checkout identifiers are not sent', () => {
  assert.equal(safePagePath('/checkout?_ptxn=abc&return=https://app.yourpulse.io'), '/checkout')
  assert.equal(pageTypeFromPath('/checkout?_ptxn=secret'), 'other')
})

test('drops unknown, invalid, and personal-looking parameters', () => {
  const sanitized = sanitizeEventParams({
    cta_location: 'hero',
    page_type: 'homepage',
    destination: 'signup',
    email: 'person@example.com',
    name: 'Ada Lovelace',
    cta_location_extra: 'hero',
    solution: 'not-a-real-solution',
    free_text: 'Need help with 12 Acacia Road',
  })

  assert.deepEqual(sanitized, {
    cta_location: 'hero',
    page_type: 'homepage',
    destination: 'signup',
  })
  assert.equal(looksLikePersonalData('hello@yourpulse.io'), true)
  assert.equal(looksLikePersonalData('07123456789'), true)
  assert.equal(looksLikePersonalData('hero'), false)
})

test('does not send events during SSR', () => {
  assert.doesNotThrow(() => {
    trackStartTrial('hero')
    trackSignIn('header')
    sendPageView('/')
  })
})

test('start_trial_clicked and sign_in_clicked fire only when called, with controlled params', () => {
  const { dataLayer } = installDataLayerMock('/')

  trackStartTrial('hero')
  trackSignIn('header')

  assert.equal(dataLayer.length, 2)
  assert.deepEqual(dataLayer[0], {
    event: analyticsEvents.startTrialClicked,
    page_type: 'homepage',
    cta_location: 'hero',
    destination: 'signup',
  })
  assert.deepEqual(dataLayer[1], {
    event: analyticsEvents.signInClicked,
    page_type: 'homepage',
    cta_location: 'header',
    destination: 'login',
  })
})

test('demo_requested fires with controlled params and no personal data', () => {
  const { dataLayer } = installDataLayerMock('/contact')

  trackDemoRequested('final_cta')

  assert.equal(dataLayer.length, 1)
  assert.deepEqual(dataLayer[0], {
    event: analyticsEvents.demoRequested,
    page_type: 'contact',
    cta_location: 'final_cta',
    destination: 'contact',
  })
})

test('checkout_started fires without a transaction id or query string', () => {
  const { dataLayer } = installDataLayerMock('/checkout?_ptxn=secret123&return=https://app.yourpulse.io')

  trackCheckoutStarted()

  assert.equal(dataLayer.length, 1)
  assert.equal(dataLayer[0]?.event, analyticsEvents.checkoutStarted)
  // page_type resolves from the query-stripped path; no _ptxn / return leaks through.
  assert.deepEqual(dataLayer[0], { event: analyticsEvents.checkoutStarted, page_type: 'other' })
})

test('demo_submitted fires on a successful demo booking', () => {
  const { dataLayer } = installDataLayerMock('/book-demo')

  trackDemoSubmitted()

  assert.equal(dataLayer.length, 1)
  assert.deepEqual(dataLayer[0], {
    event: analyticsEvents.demoSubmitted,
    page_type: 'other',
    destination: 'contact',
  })
})

test('country_selected fires with a valid region code and drops unknown regions', () => {
  const { dataLayer } = installDataLayerMock('/pricing')

  trackCountrySelected('pk')
  trackCountrySelected('not-a-country')

  assert.equal(dataLayer.length, 2)
  assert.deepEqual(dataLayer[0], { event: analyticsEvents.countrySelected, page_type: 'pricing', region: 'pk' })
  assert.deepEqual(dataLayer[1], { event: analyticsEvents.countrySelected, page_type: 'pricing' })
})

test('analytics failures do not throw to the caller', () => {
  const { dataLayer } = installDataLayerMock()
  dataLayer.push = () => {
    throw new Error('dataLayer push failed')
  }

  assert.doesNotThrow(() => {
    trackStartTrial('pricing')
    trackEvent(analyticsEvents.faqOpened, { email: 'person@example.com' })
  })
})

test('pageviews are not duplicated for the same path', () => {
  const { dataLayer } = installDataLayerMock('/')
  Object.defineProperty(globalThis, 'document', {
    value: { title: 'PulseHub' },
    configurable: true,
  })

  sendPageView('/')
  sendPageView('/')
  sendPageView('/pricing')
  sendPageView('/pricing?utm_source=test')

  const pageViews = dataLayer.filter((entry) => entry.event === analyticsEvents.pageView)
  assert.equal(pageViews.length, 2)
  assert.equal((pageViews[0] as { page_path: string }).page_path, '/')
  assert.equal((pageViews[1] as { page_path: string }).page_path, '/pricing')
  assert.equal((pageViews[1] as { page_location: string }).page_location, 'https://www.yourpulse.io/pricing')
  assert.equal((pageViews[1] as { page_title?: string }).page_title, 'PulseHub')
})

test('pricing_viewed and solution_page_viewed fire once per path', () => {
  const { dataLayer } = installDataLayerMock('/pricing')
  window.location.pathname = '/pricing'

  trackPricingViewed('/pricing')
  trackPricingViewed('/pricing')
  trackSolutionPageViewed('/uk-hmo-management-software')
  trackSolutionPageViewed('/uk-hmo-management-software')
  trackSolutionPageViewed('/features')

  assert.equal(dataLayer.length, 2)
  assert.equal(dataLayer[0]?.event, analyticsEvents.pricingViewed)
  assert.deepEqual(dataLayer[1], {
    event: analyticsEvents.solutionPageViewed,
    page_type: 'solution',
    solution: 'hmo',
  })
})

test('faq_opened does not include question text or other free-text', () => {
  const { dataLayer } = installDataLayerMock('/')
  trackFaqOpened()
  trackOnce('faq-test', analyticsEvents.faqOpened, {
    question: 'What is my email person@example.com?',
    email: 'person@example.com',
  })

  assert.equal(dataLayer.length, 2)
  assert.deepEqual(dataLayer[0], { event: analyticsEvents.faqOpened, page_type: 'homepage' })
  assert.deepEqual(dataLayer[1], { event: analyticsEvents.faqOpened })
})
