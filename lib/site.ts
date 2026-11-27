export const SITE_URL = 'https://www.yourpulse.io'
export const SITE_NAME = 'PulseHub'
export const SITE_TITLE = 'Accommodation Management Software | PulseHub'
export const SITE_DESCRIPTION =
  'Manage rooms, residents, rent, payments, occupancy and multiple properties with PulseHub accommodation management software.'

export const APP_ORIGIN = 'https://app.yourpulse.io'
export const SIGN_IN_URL = `${APP_ORIGIN}/login`
export const SIGN_UP_URL = `${APP_ORIGIN}/signup`

export const PRIVACY_URL = `${APP_ORIGIN}/privacy`
export const TERMS_URL = `${APP_ORIGIN}/terms`

/**
 * Book-a-demo lead capture. Lives in the Pulse app; called client-side from the
 * marketing site (CORS is pre-allowed for the yourpulse.io origins). No API key.
 */
export const BOOK_DEMO_ENDPOINT = `${APP_ORIGIN}/api/book-demo`

/** Optional done-for-you data migration / setup service, offered via Upwork. */
export const UPWORK_SETUP_URL =
  'https://www.upwork.com/services/product/admin-customer-support-i-will-set-up-your-hmo-or-accommodation-management-system-2105597103667895891'

export const CONTACT_EMAIL = 'musab.khan@yourpulse.io'

/** Official WhatsApp business line for direct enquiries (click-to-chat). */
export const WHATSAPP_NUMBER = '923327857333'
export const WHATSAPP_DISPLAY = '+92 332 7857333'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hi PulseHub, I would like to know more about PulseHub.',
)}`

/** Official brand profiles. Used for Organization sameAs (entity disambiguation) and the footer. */
export const LINKEDIN_URL = 'https://www.linkedin.com/company/yourpulse-io'
export const YOUTUBE_URL = 'https://www.youtube.com/@PulsehubSoftwares'
export const FACEBOOK_URL = 'https://www.facebook.com/getpulsehub'
export const SOCIAL_LINKS = [LINKEDIN_URL, YOUTUBE_URL, FACEBOOK_URL]

/**
 * Paid Marketplace add-ons. Each is a separate subscription and is NOT part of the
 * lifetime deal, which covers the core platform only. Keep this in step with the
 * in-app Marketplace so the lifetime page stays honest about what is excluded.
 */
export const MARKETPLACE_ADDONS: { name: string; description: string }[] = [
  { name: 'Ask Pulse', description: 'WhatsApp AI assistant for your business' },
  { name: 'WhatsApp Reminders', description: 'automatic rent reminders to residents' },
  { name: 'Custom Email Domain', description: 'resident emails from your own verified domain' },
  { name: 'Late Return Alerts', description: 'auto-alert an emergency contact on a late return' },
  { name: 'Attendance Terminals', description: 'fingerprint and face check-ins, logged automatically' },
]

/** Sibling products in the Pulse suite (separate subdomains). Surfaced in the footer. */
export const OTHER_PRODUCTS: { name: string; url: string }[] = [
  { name: 'Building Management System', url: 'https://building.yourpulse.io/' },
  { name: 'Gym Management System', url: 'https://gym.yourpulse.io/' },
  { name: 'Poultry Management System', url: 'https://poultry.yourpulse.io/' },
  { name: 'Inventory Management System', url: 'https://inventory.yourpulse.io/' },
  { name: 'Clinic Management System', url: 'https://clinic.yourpulse.io/' },
]

export const DEMO_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Book a PulseHub demonstration')}&body=${encodeURIComponent(
  'Hello PulseHub team,\n\nI would like to book a demonstration of PulseHub for my accommodation operations.\n\nProperty type:\nNumber of properties:\nNumber of rooms or beds:\n\nThank you.',
)}`

/** Public live lifetime-spot count: { total, sold, remaining }. Open CORS, cached ~60s. */
export const LTD_SEATS_API = `${APP_ORIGIN}/api/public/ltd-seats`

/**
 * Where a "Claim this seat" click goes: the billing section in the Pulse app, which
 * shows the lifetime plans ("Pay once, own it forever") with their own Get Lifetime
 * buttons, so no plan or currency needs to be passed from here.
 */
export const LIFETIME_CHECKOUT_URL = `${APP_ORIGIN}/billing`

export const SALES_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('PulseHub sales enquiry')}`
export const SUPPORT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('PulseHub support enquiry')}`
export const GENERAL_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('PulseHub general enquiry')}`
