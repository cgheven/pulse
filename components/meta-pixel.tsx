import Script from 'next/script'

/**
 * Meta (Facebook) Pixel for the marketing site. Loads in production only,
 * mirroring the Google Tag Manager loading convention in
 * components/google-tag-manager.tsx. The init script fires the first PageView;
 * client-side (App Router) navigations are tracked by MetaPixelRouteListener.
 */
export const META_PIXEL_ID = '2327537684317579'

function metaPixelEnabled() {
  return process.env.NODE_ENV === 'production'
}

/** The Meta Pixel loader + init. Injected as high as Next.js allows via next/script. */
export function MetaPixel() {
  if (!metaPixelEnabled()) return null

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
    </Script>
  )
}

/** The Meta Pixel <noscript> fallback. Rendered immediately after the opening <body>. */
export function MetaPixelNoScript() {
  if (!metaPixelEnabled()) return null

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  )
}
