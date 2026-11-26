export const MONTHS_PAID_ANNUALLY = 10
export const MONTHS_INCLUDED_ANNUALLY = 12
export const ANNUAL_MONTHS_SAVED = MONTHS_INCLUDED_ANNUALLY - MONTHS_PAID_ANNUALLY

/** Platform capabilities included on every plan. Plans differ by property allowance. */
export const corePlanFeatures = [
  'Property management',
  'Room and occupancy management',
  'Resident records',
  'Rent and payment tracking',
  'Maintenance management',
  'Utility and bill allocation',
  'Reports and financial insights',
  'Team access',
] as const

export type TierId = 'basic' | 'standard' | 'business'

/** Tier structure is the same in every tiered market; only the amounts change. */
export const tiers: {
  id: TierId
  name: string
  properties: number
  propertyLabel: string
  description: string
  highlight: boolean
}[] = [
  { id: 'basic', name: 'Basic', properties: 1, propertyLabel: '1 property', description: 'For one accommodation property.', highlight: false },
  { id: 'standard', name: 'Standard', properties: 3, propertyLabel: 'Up to 3 properties', description: 'For a growing portfolio of up to 3 properties.', highlight: true },
  { id: 'business', name: 'Business', properties: 10, propertyLabel: 'Up to 10 properties', description: 'For a larger portfolio of up to 10 properties.', highlight: false },
]

export type RegionCode =
  | 'gb' | 'ie' | 'au' | 'ca' | 'nz' | 'sg' | 'my' | 'ae' | 'sa' | 'in' | 'za' | 'bd' | 'np' | 'ph' | 'pk' | 'default'

/** One volume band of a branch-tiered market: rate per branch up to a branch count. */
export type BranchTier = {
  /** Inclusive upper bound of branches for this per-branch rate. */
  upTo: number
  /** Monthly price per branch at this volume, in the region's currency. */
  perBranchMonthly: number
}

/** A paid add-on offered in a specific market only. */
export type PricingAddon = {
  name: string
  perBranchMonthly: number
  description: string
}

export type Region = {
  code: RegionCode
  /** Label shown in the country selector. */
  label: string
  currency: string
  /** Display symbol/prefix used in front of the amount (matches the app's pricing). */
  symbol: string
  /**
   * 'tiered' markets carry monthly amounts per tier (property allowance).
   * 'branch-tiered' markets price per branch, with the rate dropping as branch count grows.
   */
  model: 'tiered' | 'branch-tiered'
  monthly?: Record<TierId, number>
  /** One-time founder lifetime-deal price per tier, in the region's currency. Present only on markets in the LTD. */
  lifetime?: Record<TierId, number>
  branchTiers?: BranchTier[]
  /** Branch count at or above which pricing becomes a custom Enterprise quote. */
  enterpriseFrom?: number
  /** Optional paid add-ons available in this market only. */
  addons?: PricingAddon[]
}

function tiered(
  code: RegionCode,
  label: string,
  currency: string,
  symbol: string,
  basic: number,
  standard: number,
  business: number,
  /** Optional one-time lifetime-deal prices [basic, standard, business] for this market. */
  lifetime?: [number, number, number],
): Region {
  return {
    code,
    label,
    currency,
    symbol,
    model: 'tiered',
    monthly: { basic, standard, business },
    ...(lifetime ? { lifetime: { basic: lifetime[0], standard: lifetime[1], business: lifetime[2] } } : {}),
  }
}

/**
 * Single source of truth for marketing display. Mirrors the app's tier-pricing.
 * Annual is always monthly x 10 (two months free), so only the monthly figure is stored.
 */
export const regions: Region[] = [
  tiered('gb', 'United Kingdom', 'GBP', '£', 25, 49, 79, [499, 899, 1499]),
  tiered('ie', 'Ireland', 'EUR', '€', 29, 55, 89, [549, 999, 1699]),
  tiered('au', 'Australia', 'AUD', 'A$', 49, 95, 159, [899, 1799, 2999]),
  tiered('ca', 'Canada', 'CAD', 'C$', 45, 85, 139, [899, 1699, 2799]),
  tiered('nz', 'New Zealand', 'NZD', 'NZ$', 55, 99, 169, [999, 1899, 3299]),
  tiered('sg', 'Singapore', 'SGD', 'S$', 45, 85, 139, [899, 1699, 2799]),
  tiered('my', 'Malaysia', 'MYR', 'RM', 129, 249, 419, [2499, 4799, 7999]),
  tiered('ae', 'United Arab Emirates', 'AED', 'AED ', 119, 229, 379, [2299, 4499, 7499]),
  tiered('sa', 'Saudi Arabia', 'SAR', 'SAR ', 119, 229, 379, [2299, 4499, 7499]),
  tiered('in', 'India', 'INR', '₹', 3999, 7999, 14999, [79999, 149999, 279999]),
  tiered('za', 'South Africa', 'ZAR', 'R', 549, 999, 1699, [9999, 18999, 32999]),
  tiered('bd', 'Bangladesh', 'USD', '$', 29, 49, 79, [549, 899, 1499]),
  tiered('np', 'Nepal', 'USD', '$', 29, 49, 79, [549, 899, 1499]),
  tiered('ph', 'Philippines', 'USD', '$', 29, 49, 79, [549, 899, 1499]),
  {
    code: 'pk',
    label: 'Pakistan',
    currency: 'PKR',
    symbol: 'PKR ',
    model: 'branch-tiered',
    branchTiers: [
      { upTo: 1, perBranchMonthly: 6000 },
      { upTo: 4, perBranchMonthly: 5500 },
      { upTo: 8, perBranchMonthly: 5000 },
      { upTo: 15, perBranchMonthly: 4500 },
      { upTo: 20, perBranchMonthly: 4000 },
    ],
    enterpriseFrom: 20,
    addons: [
      {
        name: 'WhatsApp Automation',
        perBranchMonthly: 2000,
        description: 'Automated WhatsApp receipts, reminders and resident updates.',
      },
    ],
  },
  tiered('default', 'Other countries', 'USD', '$', 35, 65, 109, [649, 1199, 1999]),
]

export const DEFAULT_REGION_CODE: RegionCode = 'gb'
export const regionCodes = regions.map((region) => region.code)

export function getRegion(code: string): Region {
  return regions.find((region) => region.code === code) ?? regions.find((region) => region.code === DEFAULT_REGION_CODE)!
}

export function annualFor(monthly: number) {
  return monthly * MONTHS_PAID_ANNUALLY
}

export function annualSaving(monthly: number) {
  return monthly * ANNUAL_MONTHS_SAVED
}

/** Format an amount using the region's own symbol, e.g. "£149", "₹1,49,990", "AED 599".
 *  INR uses the Indian (lakh/crore) digit grouping to match how the app shows rupees. */
export function formatPrice(amount: number, region: Region) {
  const locale = region.currency === 'INR' ? 'en-IN' : 'en-US'
  return `${region.symbol}${amount.toLocaleString(locale)}`
}

export type RegionPlan = {
  id: TierId
  name: string
  description: string
  propertyLabel: string
  properties: number
  highlight: boolean
  monthly: number
  annual: number
}

/** The three tier plans priced for a given (tiered) region. */
export function regionPlans(region: Region): RegionPlan[] {
  if (region.model !== 'tiered' || !region.monthly) return []
  return tiers.map((tier) => ({
    id: tier.id,
    name: tier.name,
    description: tier.description,
    propertyLabel: tier.propertyLabel,
    properties: tier.properties,
    highlight: tier.highlight,
    monthly: region.monthly![tier.id],
    annual: annualFor(region.monthly![tier.id]),
  }))
}

/**
 * Founder lifetime deal: a fixed cap of spots with no time limit. The displayed count is
 * rendered straight from these constants (server-side), so the number is present on first
 * paint with no loading state or flicker. Update LIFETIME_SPOTS_REMAINING by hand as spots
 * sell (there is no live fetch, to keep the count glitch-free).
 */
export const LIFETIME_SPOTS_TOTAL = 20
export const LIFETIME_SPOTS_REMAINING = 20

export type LifetimePlan = {
  id: TierId
  name: string
  description: string
  propertyLabel: string
  properties: number
  highlight: boolean
  /** One-time lifetime price in the region's currency. */
  lifetime: number
  /** Equivalent annual price, kept so the page can show an honest "vs paying yearly" anchor. */
  annual: number
}

/** The three lifetime tiers priced for a region in the LTD. Empty for markets with no lifetime deal. */
export function regionLifetimePlans(region: Region): LifetimePlan[] {
  if (region.model !== 'tiered' || !region.lifetime || !region.monthly) return []
  return tiers.map((tier) => ({
    id: tier.id,
    name: tier.name,
    description: tier.description,
    propertyLabel: tier.propertyLabel,
    properties: tier.properties,
    highlight: tier.highlight,
    lifetime: region.lifetime![tier.id],
    annual: annualFor(region.monthly![tier.id]),
  }))
}

/** Markets that are part of the lifetime deal (every tiered market; excludes branch-tiered Pakistan). */
export function lifetimeRegions(): Region[] {
  return regions.filter((region) => region.lifetime)
}
