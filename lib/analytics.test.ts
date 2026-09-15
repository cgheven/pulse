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
  trackDemoRequested,
  trackSignIn,
  trackSolutionPageViewed,
  trackStartTrial,
  googleAnalyticsInlineScript,
  crossDomainHosts,
} from './analytics.ts'

type GtagCall = unknown[]

function installGtagMock(pathname = '/') {
  const calls: GtagCall[] = []
  const windowMock = {
    dataLayer: [] as unknown[],
    location: {
      origin: 'https://www.yourpulse.io',
      pathname,
    },
    gtag: (...args: unknown[]) => {
      calls.push(args)
    },
  }

  Object.defineProperty(globalThis, 'window', {
    value: windowMock,
    configurable: true,
    writable: true,
  })

  return { calls, windowMock }
}

afterEach(() => {
  resetAnalyticsStateForTests()
  Reflect.deleteProperty(globalThis, 'window')
  Reflect.deleteProperty(globalThis, 'document')
})

test('keeps the existing GA4 measurement ID', () => {
  assert.equal(GA_MEASUREMENT_ID, 'G-KTBY62T8PL')
})

test('configures gtag once with linker domains and no automatic pageview', () => {
  const snippet = googleAnalyticsInlineScript()
  assert.match(snippet, /G-KTBY62T8PL/)
  assert.match(snippet, /send_page_view:\s*false/)
  assert.match(snippet, /allow_google_signals:\s*false/)
  for (const host of crossDomainHosts()) {
    assert.match(snippet, new RegExp(host.replaceAll('.', '\\.')))
  }
  assert.doesNotMatch(snippet, /GTM-[A-Z0-9]+/)
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
  const { calls } = installGtagMock('/')

  trackStartTrial('hero')
  trackSignIn('header')

  assert.equal(calls.length, 2)
  assert.deepEqual(calls[0], [
    'event',
    analyticsEvents.startTrialClicked,
    {
      page_type: 'homepage',
      cta_location: 'hero',
      destination: 'signup',
    },
  ])
  assert.deepEqual(calls[1], [
    'event',
    analyticsEvents.signInClicked,
    {
      page_type: 'homepage',
      cta_location: 'header',
      destination: 'login',
    },
  ])
})

test('demo_requested fires with controlled params and no personal data', () => {
  const { calls } = installGtagMock('/contact')

  trackDemoRequested('final_cta')

  assert.equal(calls.length, 1)
  assert.deepEqual(calls[0], [
    'event',
    analyticsEvents.demoRequested,
    {
      page_type: 'contact',
      cta_location: 'final_cta',
      destination: 'contact',
    },
  ])
})

test('analytics failures do not throw to the caller', () => {
  installGtagMock()
  window.gtag = () => {
    throw new Error('gtag failed')
  }

  assert.doesNotThrow(() => {
    trackStartTrial('pricing')
    trackEvent(analyticsEvents.faqOpened, { email: 'person@example.com' })
  })
})

test('pageviews are not duplicated for the same path', () => {
  const { calls } = installGtagMock('/')
  Object.defineProperty(globalThis, 'document', {
    value: { title: 'PulseHub' },
    configurable: true,
  })

  sendPageView('/')
  sendPageView('/')
  sendPageView('/pricing')
  sendPageView('/pricing?utm_source=test')

  const pageViews = calls.filter((call) => call[1] === analyticsEvents.pageView)
  assert.equal(pageViews.length, 2)
  assert.equal((pageViews[0]?.[2] as { page_path: string }).page_path, '/')
  assert.equal((pageViews[1]?.[2] as { page_path: string }).page_path, '/pricing')
  assert.equal((pageViews[1]?.[2] as { page_location: string }).page_location, 'https://www.yourpulse.io/pricing')
})

test('pricing_viewed and solution_page_viewed fire once per path', () => {
  const { calls } = installGtagMock('/pricing')
  window.location.pathname = '/pricing'

  trackPricingViewed('/pricing')
  trackPricingViewed('/pricing')
  trackSolutionPageViewed('/uk-hmo-management-software')
  trackSolutionPageViewed('/uk-hmo-management-software')
  trackSolutionPageViewed('/features')

  assert.equal(calls.length, 2)
  assert.equal(calls[0]?.[1], analyticsEvents.pricingViewed)
  assert.equal(calls[1]?.[1], analyticsEvents.solutionPageViewed)
  assert.deepEqual(calls[1]?.[2], {
    page_type: 'solution',
    solution: 'hmo',
  })
})

test('faq_opened does not include question text or other free-text', () => {
  const { calls } = installGtagMock('/')
  trackFaqOpened()
  trackOnce('faq-test', analyticsEvents.faqOpened, {
    question: 'What is my email person@example.com?',
    email: 'person@example.com',
  })

  assert.equal(calls.length, 2)
  assert.deepEqual(calls[0]?.[2], { page_type: 'homepage' })
  assert.deepEqual(calls[1]?.[2], {})
})
