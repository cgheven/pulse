'use client'

import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackCheckoutStarted } from '@/lib/analytics'
import {
  corePlanFeatures,
  formatPrice,
  getRegion,
  lifetimeRegions,
  regionLifetimePlans,
  type RegionCode,
} from '@/lib/pricing'
import { LIFETIME_CHECKOUT_URL, MARKETPLACE_ADDONS } from '@/lib/site'

const LTD_REGIONS = lifetimeRegions()

const lifetimeExtras = [
  'All future core-platform updates',
  'Your plan locked in for the life of the product',
  'Optional done-for-you migration help',
]

export default function LifetimeGrid({ allClaimed = false }: { allClaimed?: boolean }) {
  const [regionCode, setRegionCode] = useState<RegionCode>('gb')
  const region = getRegion(regionCode)
  const plans = regionLifetimePlans(region)

  // Soft enhancement: default the currency to the visitor's market when it is in the deal.
  useEffect(() => {
    let cancelled = false
    fetch('/api/geo')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { country?: string | null } | null) => {
        if (cancelled || !data?.country) return
        const code = data.country.toLowerCase()
        if (LTD_REGIONS.some((item) => item.code === code)) setRegionCode(code as RegionCode)
      })
      .catch(() => {
        // If GEO-IP is unavailable the visitor just picks their country below.
      })
    return () => {
      cancelled = true
    }
  }, [])


  return (
    <section id="lifetime-pricing" className="scroll-mt-28 bg-muted/30 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-center text-[clamp(1.6rem,3.4vw,2.4rem)] font-medium tracking-tight">
          Choose your lifetime plan
        </h2>
        <div className="mx-auto mb-6 mt-3 flex max-w-2xl flex-col items-center gap-3 text-center sm:mb-8">
          <p className="text-base text-muted-foreground sm:text-lg">
            One payment, no monthly bill for the core platform ever again. A limited number of spots, with no time
            limit: when they are gone, the deal closes.
          </p>
          <label className="mt-1 flex items-center gap-2 text-sm font-medium text-foreground/80">
            <span>Country / region</span>
            <select
              value={regionCode}
              onChange={(event) => setRegionCode(event.target.value as RegionCode)}
              className="min-h-9 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Choose your country or region for lifetime pricing"
            >
              {LTD_REGIONS.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label} ({item.currency})
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mx-auto grid max-w-6xl items-stretch gap-4 sm:gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl bg-card ${
                plan.highlight ? 'border-2 border-primary shadow-lg shadow-primary/15' : 'border border-border'
              }`}
            >
              <div className="flex flex-1 flex-col p-5 sm:p-8">
                {plan.highlight ? <p className="mb-2 text-sm font-semibold text-primary">Most popular</p> : null}
                <h3 className="text-xl font-bold sm:text-2xl">{plan.name}</h3>
                <p className="mt-1 text-base text-muted-foreground sm:mt-2">{plan.description}</p>
                <p className="mt-3 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {plan.propertyLabel}
                </p>
                <div className="my-5 sm:my-6">
                  <div className="font-mono text-3xl font-semibold tabular-nums sm:text-4xl">
                    {formatPrice(plan.lifetime, region)}
                  </div>
                  <p className="mt-1 text-[15px] text-muted-foreground">one-time payment, yours for life</p>
                  <p className="mt-1 text-[15px] text-muted-foreground">
                    Instead of {formatPrice(plan.annual, region)} every year.
                  </p>
                </div>
                <Button
                  size="lg"
                  variant={plan.highlight ? 'default' : 'outline'}
                  nativeButton={false}
                  className={`min-h-11 w-full whitespace-normal ${
                    plan.highlight
                      ? 'bg-primary hover:bg-primary/90'
                      : 'border-primary text-primary hover:bg-primary/10'
                  }`}
                  render={<a href={LIFETIME_CHECKOUT_URL} onClick={() => trackCheckoutStarted()} />}
                >
                  {allClaimed ? 'Join the waitlist' : 'Claim this spot'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl sm:mt-10">
          <h3 className="text-center text-base font-semibold sm:text-lg">Every lifetime plan includes</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {[...corePlanFeatures, ...lifetimeExtras].map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-base text-foreground/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border border-border bg-card px-5 py-4 sm:px-6">
            <p className="text-[15px] text-foreground">
              <span className="font-semibold">Not included:</span> the Marketplace add-ons. Each is a separate paid
              subscription, so they are not part of the lifetime deal:
            </p>
            <ul className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
              {MARKETPLACE_ADDONS.map((addon) => (
                <li key={addon.name} className="text-[15px] text-muted-foreground">
                  <span className="font-medium text-foreground">{addon.name}</span> ({addon.description})
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[15px] text-muted-foreground">Everything in the list above is included for life.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
