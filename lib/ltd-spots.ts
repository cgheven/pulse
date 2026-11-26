import { LIFETIME_SPOTS_REMAINING, LIFETIME_SPOTS_TOTAL } from '@/lib/pricing'
import { LTD_SEATS_API } from '@/lib/site'

export type LtdSpots = { total: number; remaining: number }

/**
 * Reads the live lifetime-spot count on the SERVER, so the number is baked into the
 * rendered HTML (no client fetch, no paint-in glitch). Cached for 60s via Next's fetch
 * revalidation, so a purchase that lowers `remaining` in the API shows up within a minute.
 * Any failure (API down, slow, bad payload) falls back to the hand-set constants, so the
 * page always renders a sensible number and never errors.
 */
export async function getLtdSpots(): Promise<LtdSpots> {
  const fallback: LtdSpots = { total: LIFETIME_SPOTS_TOTAL, remaining: LIFETIME_SPOTS_REMAINING }
  try {
    const res = await fetch(LTD_SEATS_API, { next: { revalidate: 60 } })
    if (!res.ok) return fallback
    const data: unknown = await res.json()
    const record = (data ?? {}) as Record<string, unknown>
    const total = Number(record.total)
    const remaining = Number(record.remaining)
    if (!Number.isFinite(total) || !Number.isFinite(remaining) || total <= 0) return fallback
    return { total, remaining: Math.max(0, Math.min(remaining, total)) }
  } catch {
    return fallback
  }
}
