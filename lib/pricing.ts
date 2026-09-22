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
  branchTiers?: BranchTier[]
  /** Branch count at or above which pricing becomes a custom Enterprise quote. */
  enterpriseFrom?: number
  /** Optional paid add-ons available in this market only. */
  addons?: PricingAddon[]
}

function tiered(code: RegionCode, label: string, currency: string, symbol: string, basic: number, standard: number, business: number): Region {
  return { code, label, currency, symbol, model: 'tiered', monthly: { basic, standard, business } }
}

/**
 * Single source of truth for marketing display. Mirrors the app's tier-pricing.
 * Annual is always monthly x 10 (two months free), so only the monthly figure is stored.
 */
export const regions: Region[] = [
  tiered('gb', 'United Kingdom', 'GBP', '£', 79, 149, 249),
  tiered('ie', 'Ireland', 'EUR', '€', 79, 149, 249),
  tiered('au', 'Australia', 'AUD', 'A$', 99, 179, 299),
  tiered('ca', 'Canada', 'CAD', 'C$', 79, 149, 249),
  tiered('nz', 'New Zealand', 'NZD', 'NZ$', 99, 189, 299),
  tiered('sg', 'Singapore', 'SGD', 'S$', 99, 199, 329),
  tiered('my', 'Malaysia', 'MYR', 'RM', 149, 299, 499),
  tiered('ae', 'United Arab Emirates', 'AED', 'AED ', 299, 599, 999),
  tiered('sa', 'Saudi Arabia', 'SAR', 'SAR ', 399, 799, 1499),
  tiered('in', 'India', 'INR', '₹', 3999, 7999, 14999),
  tiered('za', 'South Africa', 'ZAR', 'R', 799, 1499, 2499),
  tiered('bd', 'Bangladesh', 'USD', '$', 29, 49, 79),
  tiered('np', 'Nepal', 'USD', '$', 29, 49, 79),
  tiered('ph', 'Philippines', 'USD', '$', 29, 49, 79),
  {
    code: 'pk',
    label: 'Pakistan',
    currency: 'PKR',
    symbol: 'PKR ',
    model: 'branch-tiered',
    branchTiers: [
      { upTo: 1, perBranchMonthly: 4500 },
      { upTo: 4, perBranchMonthly: 4000 },
      { upTo: 8, perBranchMonthly: 3500 },
      { upTo: 15, perBranchMonthly: 3000 },
      { upTo: 20, perBranchMonthly: 2500 },
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
  tiered('default', 'Other countries', 'USD', '$', 79, 149, 249),
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

/** Format an amount using the region's own symbol, e.g. "£149", "₹7,999", "AED 599". */
export function formatPrice(amount: number, region: Region) {
  return `${region.symbol}${amount.toLocaleString('en-US')}`
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
