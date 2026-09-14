export const MONTHS_PAID_ANNUALLY = 10
export const MONTHS_INCLUDED_ANNUALLY = 12
export const ANNUAL_MONTHS_SAVED = MONTHS_INCLUDED_ANNUALLY - MONTHS_PAID_ANNUALLY

export const ANNUAL_NOTE = `Annual billing: pay for ${MONTHS_PAID_ANNUALLY} months, get ${MONTHS_INCLUDED_ANNUALLY}. Save the equivalent of ${ANNUAL_MONTHS_SAVED} months.`

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

export type PricingPlan = {
  id: 'basic' | 'standard' | 'business'
  name: string
  description: string
  monthly: number
  yearly: number
  properties: number
  highlight: boolean
  features: string[]
}

function planFromMonthly(
  plan: Omit<PricingPlan, 'yearly' | 'features'> & { propertyLabel: string },
): PricingPlan {
  const { propertyLabel, ...rest } = plan
  return {
    ...rest,
    yearly: rest.monthly * MONTHS_PAID_ANNUALLY,
    features: [propertyLabel, ...corePlanFeatures],
  }
}

export const pricingPlans: PricingPlan[] = [
  planFromMonthly({
    id: 'basic',
    name: 'Basic',
    description: 'For one accommodation property.',
    monthly: 79,
    properties: 1,
    highlight: false,
    propertyLabel: '1 property',
  }),
  planFromMonthly({
    id: 'standard',
    name: 'Standard',
    description: 'For a growing portfolio of up to 3 properties.',
    monthly: 149,
    properties: 3,
    highlight: true,
    propertyLabel: '3 properties',
  }),
  planFromMonthly({
    id: 'business',
    name: 'Business',
    description: 'For a larger portfolio of up to 10 properties.',
    monthly: 249,
    properties: 10,
    highlight: false,
    propertyLabel: '10 properties',
  }),
]

export function formatGbp(amount: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function annualSaving(monthly: number) {
  return monthly * ANNUAL_MONTHS_SAVED
}

export function propertyLabel(properties: number) {
  return properties === 1 ? '1 property' : `${properties} properties`
}
