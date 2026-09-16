import type { Metadata } from 'next'
import { CheckoutClient } from '@/components/checkout-client'

// Paddle payment bridge, reached only from the app. Keep it out of search
// (defense-in-depth alongside the Disallow in robots.ts).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return <CheckoutClient />
}
