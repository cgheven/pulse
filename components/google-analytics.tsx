import Script from 'next/script'
import { AnalyticsRouteListener } from '@/components/analytics-route-listener'
import {
  GA_MEASUREMENT_ID,
  googleAnalyticsInlineScript,
  shouldLoadGoogleAnalytics,
} from '@/lib/analytics'

export function GoogleAnalytics() {
  if (!shouldLoadGoogleAnalytics()) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {googleAnalyticsInlineScript()}
      </Script>
      <AnalyticsRouteListener />
    </>
  )
}
