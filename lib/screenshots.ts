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
  residentsWaiting: {
    src: '/screenshots/residents-waiting.png',
    width: 3010,
    height: 1562,
    alt: 'PulseHub Residents screen on the waiting list, showing incoming tenants with move-in dates, deposits received and an activate action',
  },
  complaints: {
    src: '/screenshots/complaints.png',
    width: 3018,
    height: 1716,
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

/** Real product screenshots from the Philippines market (peso pricing, meal and AC billing, multi-branch). */
export const philippinesScreenshots = {
  dashboard: {
    src: '/screenshots/ph-dashboard.png',
    width: 3024,
    height: 1600,
    alt: 'PulseHub Philippines dormitory dashboard showing net profit, rent collected, outstanding dues, electricity units, kitchen costs and staff salaries in pesos',
  },
  spaces: {
    src: '/screenshots/ph-spaces.png',
    width: 3024,
    height: 1700,
    alt: 'PulseHub Spaces screen showing dormitory rooms with room type, capacity, monthly rent in pesos and AC status',
  },
  residents: {
    src: '/screenshots/ph-residents.png',
    width: 3024,
    height: 1714,
    alt: 'PulseHub Residents screen showing active residents, waiting list, deposits, notice periods and check-out, with phone and ID search',
  },
  payments: {
    src: '/screenshots/ph-payments.png',
    width: 3024,
    height: 1716,
    alt: 'PulseHub Payments screen showing monthly rent collection in pesos, meal and AC billing, paid, pending and partial status and WhatsApp receipts',
  },
  branches: {
    src: '/screenshots/ph-branches.png',
    width: 3024,
    height: 1726,
    alt: 'PulseHub All Branches view comparing occupancy, collections, pending dues, deposits, costs and net profit across dormitory branches in Makati, Quezon City and Cebu',
  },
  website: {
    src: '/screenshots/ph-website.png',
    width: 1628,
    height: 1710,
    alt: 'A public PulseHub dormitory website showing rooms with photos, monthly rent in pesos, available seats, amenities, a WhatsApp button and a join waitlist button',
  },
  invoice: {
    src: '/screenshots/ph-invoice.png',
    width: 1330,
    height: 1516,
    alt: 'A PulseHub dormitory invoice in pesos showing monthly rent and food charges with the total amount due',
  },
  receipt: {
    src: '/screenshots/ph-payment-receipt.png',
    width: 1178,
    height: 1460,
    alt: 'A PulseHub payment receipt in pesos showing the receipt number, payment method, a rent and food charges breakdown, and the total paid',
  },
  checkout: {
    src: '/screenshots/ph-checkout.png',
    width: 1340,
    height: 1396,
    alt: 'The PulseHub check-out screen settling a resident deposit against any dues and showing the refund due in pesos',
  },
} as const

/** Real product screenshots from the India market (rupee pricing, metered electricity billing, multi-city branches). */
export const indiaScreenshots = {
  dashboard: {
    src: '/screenshots/in-dashboard.png',
    width: 3024,
    height: 1650,
    alt: 'PulseHub India PG and hostel dashboard showing net profit, rent collected, outstanding dues, electricity units, kitchen costs and staff salaries in rupees',
  },
  spaces: {
    src: '/screenshots/in-spaces.png',
    width: 3024,
    height: 1650,
    alt: 'PulseHub Spaces screen showing PG rooms with room type, capacity, monthly rent in rupees, AC and attached-washroom status',
  },
  residents: {
    src: '/screenshots/in-residents.png',
    width: 3024,
    height: 1650,
    alt: 'PulseHub Residents screen showing active residents, waiting list, deposits, notice periods and check-out, with phone and ID search',
  },
  payments: {
    src: '/screenshots/in-payments.png',
    width: 3024,
    height: 1650,
    alt: 'PulseHub Payments screen showing monthly rent collection in rupees, metered electricity billing, paid, pending and overdue status and WhatsApp receipts',
  },
  branches: {
    src: '/screenshots/in-branches.png',
    width: 3024,
    height: 1650,
    alt: 'PulseHub all-branches overview comparing occupancy, collections, pending dues, deposits, costs and net profit across PGs in Bengaluru, Pune and Hyderabad',
  },
  reports: {
    src: '/screenshots/in-reports.png',
    width: 3024,
    height: 1650,
    alt: 'PulseHub Reports screen showing income, expenses, profit, payments collected and expense breakdown with PDF and Excel export, in rupees',
  },
  website: {
    src: '/screenshots/in-website.png',
    width: 2014,
    height: 1340,
    alt: 'A public PulseHub PG website showing rooms with photos, monthly rent in rupees, available seats, amenities like meals, WiFi and power backup, a WhatsApp button and a join waitlist button',
  },
  memberLedger: {
    src: '/screenshots/in-member-ledger.png',
    width: 1024,
    height: 1396,
    alt: 'A resident payment timeline in PulseHub showing rent, food and metered electricity charges, part-payments, a security deposit held, notices and check-out, in rupees',
  },
  invoice: {
    src: '/screenshots/in-invoice.png',
    width: 1104,
    height: 1331,
    alt: 'A PulseHub PG invoice in rupees showing monthly rent and metered electricity charges with the total amount due',
  },
  receipt: {
    src: '/screenshots/in-payment-receipt.png',
    width: 996,
    height: 1336,
    alt: 'A PulseHub payment receipt in rupees showing the receipt number, payment method, bank account, a rent and electricity breakdown, and the total paid',
  },
  checkout: {
    src: '/screenshots/in-checkout.png',
    width: 515,
    height: 1331,
    alt: 'The PulseHub check-out screen pro-rating a resident final month by nights stayed, settling outstanding dues against the deposit, and showing the refund due in rupees',
  },
} as const

/** Real product screenshots of Hotel Eye guest registration (Pakistan: files hostel check-ins to provincial police portals). */
export const hotelEyeScreenshots = {
  status: {
    src: '/screenshots/hoteleye-status.png',
    width: 752,
    height: 1330,
    alt: 'PulseHub Hotel Eye screen for a Pakistan hostel showing guests filed and pending, each with CNIC and room, filed dates, a Pending and Synced tab and a Sync to Hotel Eye button',
  },
  portal: {
    src: '/screenshots/hoteleye-portal.png',
    width: 752,
    height: 1330,
    alt: 'PulseHub Hotel Eye portal login storing a hostel official provincial portal address and username, with the password encrypted at rest and used only to log in on the operator behalf',
  },
  sync: {
    src: '/screenshots/hoteleye-sync.png',
    width: 752,
    height: 1330,
    alt: 'PulseHub Sync to Hotel Eye step where the operator reads and types the portal CAPTCHA so PulseHub files the selected guest in the background on that session',
  },
} as const
