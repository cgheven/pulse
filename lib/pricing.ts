export const ANNUAL_NOTE = 'Pay annually and get 2 months free.'

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

export const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Essential tools for managing one accommodation property.',
    monthly: 79,
    yearly: 790,
    properties: 1,
    highlight: false,
    features: [
      '1 property',
      'Room and occupancy management',
      'Resident records',
      'Rent and payment tracking',
      'Reports and financial insights',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'More capacity for operators managing a growing property portfolio.',
    monthly: 149,
    yearly: 1490,
    properties: 3,
    highlight: true,
    features: [
      '3 properties',
      'Room and occupancy management',
      'Resident records',
      'Rent and payment tracking',
      'Maintenance management',
      'Reports and financial insights',
      'Team access',
      'Multi-property management',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Centralised management for larger accommodation portfolios.',
    monthly: 249,
    yearly: 2490,
    properties: 10,
    highlight: false,
    features: [
      '10 properties',
      'Room and occupancy management',
      'Resident records',
      'Rent and payment tracking',
      'Maintenance management',
      'Utility and bill allocation',
      'Reports and financial insights',
      'Team access',
      'Multi-property management',
    ],
  },
]

export function formatGbp(amount: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(amount)
}
