'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Check } from 'lucide-react'
import { StartTrialButton } from '@/components/tracked-cta'
import { trackCountrySelected, trackPricingViewed } from '@/lib/analytics'
import { routes } from '@/lib/navigation'
import {
  ANNUAL_MONTHS_SAVED,
  annualSaving,
  corePlanFeatures,
  DEFAULT_REGION_CODE,
  formatPrice,
  getRegion,
  MONTHS_INCLUDED_ANNUALLY,
  MONTHS_PAID_ANNUALLY,
  regionPlans,
  regions,
  type RegionCode,
} from '@/lib/pricing'

export default function PricingGrid({
  heading,
  subtitle,
  initialRegionCode = DEFAULT_REGION_CODE,
  showSelector = true,
}: {
  heading?: string
  subtitle: string
  initialRegionCode?: RegionCode
  showSelector?: boolean
}) {
  const [cycle, setCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [regionCode, setRegionCode] = useState<RegionCode>(initialRegionCode)
  const isAnnual = cycle === 'yearly'
  const pathname = usePathname()
  const sectionRef = useRef<HTMLElement>(null)

  const region = getRegion(regionCode)
  const plans = regionPlans(region)
  const branchTiers = region.branchTiers ?? []

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        trackPricingViewed(pathname)
        observer.disconnect()
      },
      { threshold: 0.25 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [pathname])

  function onRegionChange(code: RegionCode) {
    setRegionCode(code)
    trackCountrySelected(code)
  }

  return (
    <section id="pricing" ref={sectionRef} className="scroll-mt-20 bg-muted/30 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-6 max-w-3xl space-y-3 text-center sm:mb-8 sm:space-y-4">
          {heading ? (
            <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-medium leading-[1.1] tracking-tight">{heading}</h2>
          ) : null}
          <p className="text-base text-muted-foreground sm:text-lg">{subtitle}</p>
        </div>

        <div className="mb-6 flex w-full flex-col items-center gap-3 sm:mb-8">
          {showSelector ? (
            <label className="flex items-center gap-2 text-sm font-medium text-foreground/80">
              <span>Country / region</span>
              <select
                value={regionCode}
                onChange={(event) => onRegionChange(event.target.value as RegionCode)}
                className="min-h-9 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Choose your country or region for pricing"
              >
                {regions.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.label} ({item.currency})
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <div className="grid w-full max-w-md grid-cols-2 rounded-full border border-border bg-card p-1" role="group" aria-label="Billing cycle">
            <button
              type="button"
              aria-pressed={cycle === 'monthly'}
              onClick={() => setCycle('monthly')}
              className={`min-h-11 rounded-full px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${cycle === 'monthly' ? 'bg-primary text-primary-foreground' : 'text-foreground/65 hover:text-foreground'}`}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={isAnnual}
              onClick={() => setCycle('yearly')}
              className={`min-h-11 rounded-full px-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isAnnual ? 'bg-primary text-primary-foreground' : 'text-foreground/65 hover:text-foreground'}`}
            >
              Annual
            </button>
          </div>
          <p className="max-w-md text-center text-[15px] text-muted-foreground" aria-live="polite">
            {isAnnual
              ? `Pay for ${MONTHS_PAID_ANNUALLY} months, get ${MONTHS_INCLUDED_ANNUALLY}. Save ${ANNUAL_MONTHS_SAVED} months.`
              : `Annual billing: pay ${MONTHS_PAID_ANNUALLY} months, get ${MONTHS_INCLUDED_ANNUALLY}.`}
          </p>
        </div>

        {region.model === 'branch-tiered' ? (
          <div className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-2xl border-2 border-primary bg-card shadow-lg shadow-primary/15">
              <div className="border-b border-border bg-primary/5 px-5 py-4 sm:px-6">
                <p className="text-sm font-semibold text-primary">Per branch, lower as you grow</p>
                <p className="mt-1 text-base text-muted-foreground">
                  Pay for the branches you run. The more branches, the lower the rate per branch.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-left text-base">
                  <caption className="sr-only">Per-branch pricing tiers for Pakistan.</caption>
                  <thead>
                    <tr className="border-b border-border">
                      <th scope="col" className="px-5 py-3 font-semibold sm:px-6">Branches</th>
                      <th scope="col" className="px-5 py-3 font-semibold sm:px-6">
                        {isAnnual ? 'Per branch / year' : 'Per branch / month'}
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold sm:px-6">
                        {isAnnual ? 'Total / year' : 'Total / month'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {branchTiers.map((tier) => {
                      const per = isAnnual ? tier.perBranchMonthly * MONTHS_PAID_ANNUALLY : tier.perBranchMonthly
                      const total = per * tier.upTo
                      const branchesLabel = tier.upTo === 1 ? '1 branch' : `Up to ${tier.upTo} branches`
                      const totalLabel = tier.upTo === 1 ? formatPrice(total, region) : `Up to ${formatPrice(total, region)}`
                      return (
                        <tr key={tier.upTo} className="border-b border-border/70">
                          <th scope="row" className="px-5 py-3 font-medium sm:px-6">{branchesLabel}</th>
                          <td className="px-5 py-3 font-mono tabular-nums sm:px-6">{formatPrice(per, region)}</td>
                          <td className="px-5 py-3 font-mono tabular-nums text-foreground/85 sm:px-6">{totalLabel}</td>
                        </tr>
                      )
                    })}
                    {region.enterpriseFrom ? (
                      <tr className="align-top">
                        <th scope="row" className="px-5 py-3 font-medium sm:px-6">
                          {region.enterpriseFrom} plus branches
                        </th>
                        <td className="px-5 py-3 text-muted-foreground sm:px-6">Custom</td>
                        <td className="px-5 py-3 text-muted-foreground sm:px-6">Custom</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-border p-5 sm:p-6">
                {region.addons?.length ? (
                  <div className="mb-4 rounded-xl bg-primary/5 p-4">
                    <p className="text-sm font-semibold text-primary">Available add-ons</p>
                    <ul className="mt-2 space-y-1.5">
                      {region.addons.map((addon) => (
                        <li key={addon.name} className="text-[15px] text-foreground/85">
                          <span className="font-medium text-foreground">{addon.name}</span>
                          {': '}
                          {formatPrice(addon.perBranchMonthly, region)} / branch / month. {addon.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                <StartTrialButton location="pricing" size="lg" className="min-h-11 w-full whitespace-normal bg-primary hover:bg-primary/90" />
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto grid max-w-6xl items-stretch gap-4 sm:gap-5 lg:grid-cols-3">
            {plans.map((plan) => {
              const price = isAnnual ? plan.annual : plan.monthly
              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl bg-card ${plan.highlight ? 'border-2 border-primary shadow-lg shadow-primary/15' : 'border border-border'}`}
                >
                  <div className="flex flex-1 flex-col p-5 sm:p-8">
                    {plan.highlight ? <p className="mb-2 text-sm font-semibold text-primary">Most popular</p> : null}
                    <h3 className="text-xl font-bold sm:text-2xl">{plan.name}</h3>
                    <p className="mt-1 text-base text-muted-foreground sm:mt-2">{plan.description}</p>
                    <p className="mt-3 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                      {plan.propertyLabel}
                    </p>
                    <div className="my-5 sm:my-6">
                      <div className="font-mono text-3xl font-semibold tabular-nums sm:text-4xl">{formatPrice(price, region)}</div>
                      <p className="mt-1 text-[15px] text-muted-foreground">{isAnnual ? 'per year, billed annually' : 'per month'}</p>
                      {isAnnual ? (
                        <p className="mt-1 text-[15px] text-muted-foreground">
                          Save {formatPrice(annualSaving(plan.monthly), region)} ({ANNUAL_MONTHS_SAVED} months included free).
                        </p>
                      ) : null}
                    </div>
                    <StartTrialButton
                      location="pricing"
                      size="lg"
                      variant={plan.highlight ? 'default' : 'outline'}
                      className={`min-h-11 w-full whitespace-normal ${plan.highlight ? 'bg-primary hover:bg-primary/90' : 'border-primary text-primary hover:bg-primary/10'}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="mx-auto mt-8 max-w-3xl sm:mt-10">
          <h3 className="text-center text-base font-semibold sm:text-lg">Every plan includes</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {corePlanFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-base text-foreground/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center text-base text-muted-foreground">
            <p>
              {region.model === 'branch-tiered'
                ? `Running ${region.enterpriseFrom ?? 20} or more branches?`
                : 'Need more than 10 properties?'}{' '}
              <a href={routes.contact} className="font-medium text-primary hover:underline">
                Contact us
              </a>{' '}
              for an Enterprise quote.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
