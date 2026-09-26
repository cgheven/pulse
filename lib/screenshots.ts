export const screenshots = {
  dashboard: {
    src: '/screenshots/dashboard.png',
    width: 3020,
    height: 1612,
    alt: 'PulseHub accommodation management dashboard showing rent collection and business performance',
  },
  payments: {
    src: '/screenshots/payments.png',
    width: 3024,
    height: 1570,
    alt: 'PulseHub payments screen showing rent, utility charges, and payment statuses',
  },
  properties: {
    src: '/screenshots/all-properties.png',
    width: 3024,
    height: 1722,
    alt: 'PulseHub multi-property dashboard showing occupancy, revenue, costs, and net profit',
  },
  residents: {
    src: '/screenshots/residents.png',
    width: 3024,
    height: 1582,
    alt: 'PulseHub resident management screen showing applications, deposits, notices, and check-outs',
  },
  complaints: {
    src: '/screenshots/complaints.png',
    width: 3022,
    height: 1712,
    alt: 'PulseHub complaints screen showing maintenance requests and resolution statuses',
  },
  website: {
    src: '/screenshots/uk-website.png',
    width: 1814,
    height: 1692,
    alt: 'A public PulseHub property website showing rooms with photos, monthly rent in pounds, available seats, amenities, a WhatsApp button and a join waitlist button',
  },
  invoice: {
    src: '/screenshots/invoice.png',
    width: 1232,
    height: 1504,
    alt: 'A PulseHub resident invoice showing monthly rent and metered electricity charges with the total amount due in pounds',
  },
  receipt: {
    src: '/screenshots/payment-receipt.png',
    width: 1118,
    height: 1512,
    alt: 'A PulseHub payment receipt showing the receipt number, payment method, a rent and electricity breakdown, and the total paid in pounds',
  },
  checkout: {
    src: '/screenshots/checkout.png',
    width: 990,
    height: 1560,
    alt: 'The PulseHub check-out screen calculating a resident final electricity charge from meter readings and settling it against the deposit to show the refund due',
  },
} as const

/** Real product screenshots from the Pakistan market (rupee pricing, AC and kitchen billing). */
export const pakistanScreenshots = {
  dashboard: {
    src: '/screenshots/pk-dashboard.png',
    width: 3024,
    height: 1650,
    alt: 'PulseHub Pakistan hostel dashboard showing net profit, rent collected, outstanding dues, AC units, kitchen costs and staff salaries in rupees',
  },
  spaces: {
    src: '/screenshots/pk-spaces.png',
    width: 2990,
    height: 1720,
    alt: 'PulseHub Spaces screen showing hostel rooms with room type, capacity, monthly rent in rupees and AC status',
  },
  tenants: {
    src: '/screenshots/pk-tenants.png',
    width: 3016,
    height: 1712,
    alt: 'PulseHub Tenants screen showing active residents, waiting list, deposits, notice periods and check-out, with CNIC and phone search',
  },
  payments: {
    src: '/screenshots/pk-payments.png',
    width: 3024,
    height: 1722,
    alt: 'PulseHub Payments screen showing monthly rent collection in rupees, AC billing, paid and pending status and WhatsApp receipts',
  },
  branches: {
    src: '/screenshots/pk-branches.png',
    width: 3024,
    height: 1652,
    alt: 'PulseHub All Branches view comparing occupancy, collections, pending dues, deposits, costs and net profit across hostels',
  },
  website: {
    src: '/screenshots/pk-website.png',
    width: 1818,
    height: 1616,
    alt: 'A public PulseHub hostel website showing rooms with photos, monthly rent in rupees, available seats, amenities, a WhatsApp button and a join waitlist button',
  },
  invoice: {
    src: '/screenshots/pk-invoice.png',
    width: 1104,
    height: 1526,
    alt: 'A PulseHub hostel invoice in rupees showing monthly rent and metered AC charges with the total amount due',
  },
  receipt: {
    src: '/screenshots/pk-payment-receipt.png',
    width: 996,
    height: 1506,
    alt: 'A PulseHub payment receipt in rupees showing the receipt number, payment method, a rent and AC charges breakdown, and the total paid',
  },
  checkout: {
    src: '/screenshots/pk-checkout.png',
    width: 670,
    height: 1578,
    alt: 'The PulseHub check-out screen pro-rating a resident final month, settling outstanding dues against the deposit, and showing the amount to collect or refund in rupees',
  },
} as const
