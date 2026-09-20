// Returns the visitor's country from the edge/CDN headers (Vercel or Cloudflare).
// Used only by the soft, dismissible region-suggestion banner. No external calls,
// no redirects, and the country code is not stored or sent to analytics.
export const dynamic = 'force-dynamic'

export function GET(request: Request) {
  const raw =
    request.headers.get('x-vercel-ip-country') ??
    request.headers.get('cf-ipcountry') ??
    null
  const country = raw && /^[A-Za-z]{2}$/.test(raw) ? raw.toUpperCase() : null

  return Response.json({ country }, { headers: { 'cache-control': 'no-store' } })
}
