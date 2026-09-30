import Script from 'next/script'

/**
 * Google Tag Manager container for the marketing site. This is separate from and
 * does not touch the existing GA4 setup in components/google-analytics.tsx.
 * Loads in production only, mirroring the GA4 loading convention.
 */
export const GTM_CONTAINER_ID = 'GTM-T5N7T49H'

function gtmEnabled() {
  return process.env.NODE_ENV === 'production'
}

/** The GTM loader script. Injected as high as Next.js allows via next/script. */
export function GoogleTagManager() {
  if (!gtmEnabled()) return null

  return (
    <Script id="google-tag-manager" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`}
    </Script>
  )
}

/** The GTM <noscript> fallback. Rendered immediately after the opening <body>. */
export function GoogleTagManagerNoScript() {
  if (!gtmEnabled()) return null

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}
