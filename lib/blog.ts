export const BLOG_BASE = '/blog'

export type BlogPost = {
  slug: string
  /** Card + browser-tab title (brand appended by the template). */
  title: string
  /** The on-page H1. */
  heading: string
  /** Meta description (about 150 to 160 chars). */
  description: string
  /** Short listing excerpt. */
  excerpt: string
  category: string
  primaryKeyword: string
  /** ISO dates. */
  datePublished: string
  dateModified: string
  readingMinutes: number
  image: {
    src: string
    width: number
    height: number
    alt: string
    /** Optional caption shown in the screenshot's browser-frame bar. */
    label?: string
  }
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'bedspace-management-software-dubai',
    title: 'Bedspace Management Software for Dubai & the UAE',
    heading: 'Bedspace and Partition Room Management Software for Dubai and the UAE',
    description:
      'Software for bedspace and partition-room operators in Dubai and the UAE: track beds and occupancy, record rent and deposits in dirhams, send WhatsApp receipts and reminders, and fill rooms from your own listing page.',
    excerpt:
      'Run bedspace and partition rooms in Dubai and the UAE from one place: bed-level occupancy, rent and deposits in dirhams, WhatsApp receipts and reminders, split utility bills and a public listing page to fill empty beds.',
    category: 'Accommodation management',
    primaryKeyword: 'bedspace management software dubai',
    datePublished: '2026-11-08',
    dateModified: '2026-11-08',
    readingMinutes: 8,
    image: {
      src: '/screenshots/ae-dashboard.png',
      width: 3024,
      height: 1650,
      alt: 'A PulseHub UAE dashboard showing occupancy, rent collected and outstanding dues in dirhams for a bedspace operation',
      label: 'PulseHub · UAE dashboard in dirhams',
    },
  },
  {
    slug: 'hostel-mess-management-software-bangladesh',
    title: 'Hostel & Mess Management Software in Bangladesh',
    heading: 'Hostel and Mess Management Software for Bangladesh',
    description:
      'Manage hostels, messes and student accommodation in Bangladesh: track beds and occupancy, collect monthly rent and mess bills, split shared costs fairly, send WhatsApp reminders and keep one clear balance per resident.',
    excerpt:
      'Run hostels and messes in Bangladesh from one place: bed-level occupancy, monthly rent and mess billing, a fair split of shared costs, WhatsApp receipts and reminders, and one running balance per resident.',
    category: 'Hostel management',
    primaryKeyword: 'hostel management software bangladesh',
    datePublished: '2026-11-08',
    dateModified: '2026-11-08',
    readingMinutes: 8,
    image: {
      src: '/screenshots/dashboard.png',
      width: 3020,
      height: 1612,
      alt: 'A PulseHub hostel and mess dashboard showing occupancy, rent collected, outstanding dues and kitchen costs for the month',
      label: 'PulseHub · hostel and mess dashboard',
    },
  },
  {
    slug: 'spacebasic-alternative',
    title: 'SpaceBasic Alternative: PulseHub vs SpaceBasic',
    heading: 'SpaceBasic Alternative: PulseHub for PG, Hostel and Co-Living Operators',
    description:
      'Looking for a SpaceBasic alternative? An honest PulseHub vs SpaceBasic comparison for commercial PG, hostel and co-living operators: billing, occupancy, metered utilities, markets and pricing.',
    excerpt:
      'SpaceBasic is built for university and college hostels. PulseHub is built for commercial PG, hostel and co-living operators. An honest comparison of what each is for: billing, occupancy, utilities, markets and pricing.',
    category: 'Comparisons',
    primaryKeyword: 'SpaceBasic alternative',
    datePublished: '2026-11-08',
    dateModified: '2026-11-08',
    readingMinutes: 9,
    image: {
      src: '/screenshots/in-dashboard.png',
      width: 3024,
      height: 1650,
      alt: 'A PulseHub PG and hostel dashboard showing net profit, rent collected and outstanding dues in rupees',
      label: 'PulseHub · PG & hostel dashboard in rupees',
    },
  },
  {
    slug: 'august-hmo-software-alternative',
    title: 'August Alternative: PulseHub vs August for HMOs',
    heading: 'August Alternative: How PulseHub Compares for HMO and Shared Housing',
    description:
      'Looking for an August alternative for HMOs? An honest PulseHub vs August comparison: bed-level billing, shared utilities, England compliance, markets and where each one fits.',
    excerpt:
      'August is a UK HMO and landlord app built around bank-feed rent and Making Tax Digital. PulseHub is a multi-market operator platform built around one bill per resident. An honest look at where each one fits.',
    category: 'Comparisons',
    primaryKeyword: 'August alternative',
    datePublished: '2026-11-08',
    dateModified: '2026-11-08',
    readingMinutes: 9,
    image: {
      src: '/screenshots/payments.png',
      width: 3024,
      height: 1570,
      alt: 'A PulseHub per-resident bill showing room rent plus a metered share of electricity for the month',
      label: 'One bill per resident · rent + metered electricity',
    },
  },
  {
    slug: 'coho-alternative',
    title: 'COHO Alternative: PulseHub vs COHO',
    heading: 'COHO Alternative: How PulseHub Compares for HMO and Co-Living',
    description:
      'Looking for a COHO alternative for HMO and co-living? An honest PulseHub vs COHO comparison: markets, bed-level billing, utilities, compliance and pricing.',
    excerpt:
      'An honest look at COHO and how PulseHub compares as an alternative for HMO and co-living operators: markets covered, room and bed-level billing, utilities, compliance and pricing, plus who each one suits.',
    category: 'Comparisons',
    primaryKeyword: 'COHO alternative',
    datePublished: '2026-11-04',
    dateModified: '2026-11-04',
    readingMinutes: 9,
    image: {
      src: '/screenshots/payments.png',
      width: 3024,
      height: 1570,
      alt: 'A per-resident bill showing room rent plus a metered share of the electricity bill for the month',
      label: 'One bill per resident · rent + metered utilities',
    },
  },
  {
    slug: 'best-dormitory-bedspace-software-philippines',
    title: 'Best Dormitory & Bedspace Management Software in the Philippines',
    heading: 'Best Dormitory and Bedspace Management Software in the Philippines (2026)',
    description:
      'An honest comparison of dormitory and bedspace management software in the Philippines: PulseHub, Collo, Smapey, Cloudbeds, eZee, Mangobeds and BedBooking, grouped by monthly bed-level vs nightly OTA, with prices where public.',
    excerpt:
      'The market splits in two: monthly bed-level tools (PulseHub, Collo, Smapey) and nightly OTA hotel systems (Cloudbeds, eZee, Mangobeds, BedBooking). An honest, evidence-based comparison with prices, and where PulseHub fits.',
    category: 'Comparisons',
    primaryKeyword: 'dormitory management software philippines',
    datePublished: '2026-11-07',
    dateModified: '2026-11-07',
    readingMinutes: 9,
    image: {
      src: '/screenshots/ph-dashboard.png',
      width: 3024,
      height: 1600,
      alt: 'A Philippine dormitory and bedspace management dashboard showing occupancy, rent collected and outstanding dues in pesos',
      label: 'PulseHub · dormitory dashboard in pesos',
    },
  },
  {
    slug: 'student-accommodation-rent-collection',
    title: 'Student Accommodation Rent Collection Software',
    heading: 'Rent Collection and Arrears for Student Accommodation',
    description:
      'How rent collection works in student accommodation: one bill per resident, part-payments and receipts, arrears visible per bed, and reminders sent automatically. PulseHub records and chases rent, it is not a payment gateway.',
    excerpt:
      'Student rent is collected by the bed, not by the flat: a bill per resident, paid in parts and at different times. How by-the-bed collection, arrears chasing and guarantor records should work, and the honest line on what the software does with the money.',
    category: 'Student accommodation',
    primaryKeyword: 'student accommodation rent collection',
    datePublished: '2026-11-07',
    dateModified: '2026-11-07',
    readingMinutes: 8,
    image: {
      src: '/screenshots/dashboard.png',
      width: 3020,
      height: 1612,
      alt: 'A student accommodation dashboard showing rent collected, outstanding balances and arrears across the portfolio in pounds',
      label: 'Dashboard · rent collected & arrears',
    },
  },
  {
    slug: 'pbsa-management-software',
    title: 'PBSA Management Software for Independent Operators',
    heading: 'PBSA Management Software for Independent and Mid-Sized Operators',
    description:
      'PBSA management software for independent and mid-sized operators: room and bed occupancy, one bill per resident, deposits, guarantor records, maintenance and portfolio reporting, without the per-bed cost of enterprise platforms.',
    excerpt:
      'The enterprise PBSA platforms are built, and priced, for large towers with their own booking engines. A guide for the independent operator who wants that control without the weight, and an honest account of where PulseHub fits.',
    category: 'Student accommodation',
    primaryKeyword: 'PBSA management software',
    datePublished: '2026-11-07',
    dateModified: '2026-11-07',
    readingMinutes: 8,
    image: {
      src: '/screenshots/dashboard.png',
      width: 3020,
      height: 1612,
      alt: 'A purpose-built student accommodation dashboard showing occupancy, rent collected and net position across a scheme in pounds',
      label: 'Dashboard · occupancy, rent & performance',
    },
  },
  {
    slug: 'room-rental-management-software',
    title: 'Room Rental Management Software',
    heading: 'Room Rental Management Software for Letting by the Room',
    description:
      'Room rental management software lets a property by the room, not the whole unit: one bill per resident, room and bed occupancy, deposits, arrears and a public page to fill rooms. PulseHub records payments, it is not a payment gateway.',
    excerpt:
      'Letting by the room breaks ordinary landlord software, which assumes one tenant, one unit, one rent. What room rental software does, the features that matter, and the honest line on what it does with the money.',
    category: 'Shared housing',
    primaryKeyword: 'room rental management software',
    datePublished: '2026-11-07',
    dateModified: '2026-11-07',
    readingMinutes: 8,
    image: {
      src: '/screenshots/dashboard.png',
      width: 3020,
      height: 1612,
      alt: 'A room rental dashboard showing occupancy by room and bed, rent collected and outstanding balances across a portfolio',
      label: 'Dashboard · occupancy, rent & arrears',
    },
  },
  {
    slug: 'split-utility-bills-shared-house',
    title: 'How to Split Utility Bills in a Shared House',
    heading: 'How to Split Utility Bills in a Shared House',
    description:
      'How to split utility bills fairly in a shared house: metered electricity by reading and by each resident’s dates, fixed costs like broadband split evenly, and how software puts each share on one clear bill.',
    excerpt:
      'Split metered electricity by a reading and by each resident’s dates, split fixed costs evenly, and make every share traceable. How to handle mid-period move-ins and the honest line on what the software does with the money.',
    category: 'Shared housing',
    primaryKeyword: 'how to split utility bills shared house',
    datePublished: '2026-11-07',
    dateModified: '2026-11-07',
    readingMinutes: 7,
    image: {
      src: '/screenshots/dashboard.png',
      width: 3020,
      height: 1612,
      alt: 'A shared-house dashboard showing rent and split utility charges per resident across the property',
      label: 'Dashboard · rent & split utilities',
    },
  },
  {
    slug: 'how-to-run-a-hostel',
    title: 'How to Run a Hostel: An Operator’s Guide',
    heading: 'How to Run a Hostel: A Practical Operator’s Guide',
    description:
      'How to run a hostel: set up beds, fill them from your own page, bill each resident with part-payments and receipts, and keep every hostel’s money straight in one system.',
    excerpt:
      'A practical guide to running a hostel day to day: setting up beds, pricing, filling rooms, admissions, billing and collections, costs, and where management software earns its place (and how it differs from a booking site).',
    category: 'Hostel management',
    primaryKeyword: 'how to run a hostel',
    datePublished: '2026-11-07',
    dateModified: '2026-11-07',
    readingMinutes: 9,
    image: {
      src: '/screenshots/dashboard.png',
      width: 3020,
      height: 1612,
      alt: 'A hostel dashboard showing occupancy, rent collected, outstanding dues and profit for the month',
      label: 'Dashboard · occupancy, rent & profit',
    },
  },
  {
    slug: 'student-accommodation-management-software-australia',
    title: 'Student Accommodation Management Software in Australia',
    heading: 'Student Accommodation Management Software in Australia: A Practical Guide',
    description:
      'Student accommodation management software for Australia: run rooms, students and rent in dollars, with bonds recorded, your own page to fill rooms, and every property in one view.',
    excerpt:
      'A practical guide to student accommodation management software for Australia: what it does, why a generic rental tool does not fit, the features that matter for share houses and student digs, and how to choose.',
    category: 'Student accommodation',
    primaryKeyword: 'student accommodation management software Australia',
    datePublished: '2026-11-07',
    dateModified: '2026-11-07',
    readingMinutes: 8,
    image: {
      src: '/screenshots/us-dashboard.png',
      width: 3024,
      height: 1700,
      alt: 'An Australian student accommodation dashboard showing occupancy, rent collected in dollars, outstanding dues and profit for the month',
      label: 'Dashboard · rent in dollars, occupancy & profit',
    },
  },
  {
    slug: 'student-housing-management-software',
    title: 'Student Housing Management Software (US)',
    heading: 'Student Housing Management Software for Off-Campus Operators',
    description:
      'Student housing management software for US off-campus operators: by-the-bed leasing, one bill per resident in dollars, cosigner records, deposits, arrears and every property in one view.',
    excerpt:
      'A guide to student housing management software for off-campus operators in the US: by-the-bed leasing, one dollar bill per resident, cosigner records, and how it differs from generic landlord tools and enterprise leasing suites.',
    category: 'Student accommodation',
    primaryKeyword: 'student housing management software',
    datePublished: '2026-11-07',
    dateModified: '2026-11-07',
    readingMinutes: 8,
    image: {
      src: '/screenshots/us-dashboard.png',
      width: 3024,
      height: 1700,
      alt: 'A student housing dashboard showing occupancy, rent collected in dollars, outstanding dues and profit for the month',
      label: 'Dashboard · rent in dollars, occupancy & profit',
    },
  },
  {
    slug: 'labour-accommodation-software-saudi-arabia',
    title: 'Labour Accommodation Software in Saudi Arabia',
    heading: 'Labour Accommodation Software in Saudi Arabia',
    description:
      'Labour accommodation software for Saudi Arabia: run worker camps by the bed, bill the worker or employer in riyals, with deposits, maintenance and every site in one view.',
    excerpt:
      'A practical guide to labour and staff accommodation software for Saudi Arabia: what it does, why a hotel or rental tool does not fit worker camps, the features that matter, how billing the employer works, and how to choose.',
    category: 'Staff accommodation',
    primaryKeyword: 'labour accommodation software Saudi Arabia',
    datePublished: '2026-11-06',
    dateModified: '2026-11-06',
    readingMinutes: 9,
    image: {
      src: '/screenshots/sa-dashboard.png',
      width: 3024,
      height: 1650,
      alt: 'A Saudi labour accommodation dashboard showing occupancy, rent collected in riyal, outstanding dues and profit for the month',
      label: 'Dashboard · rent in riyal, occupancy & profit',
    },
  },
  {
    slug: 'kos-management-software-indonesia',
    title: 'Kos Management Software in Indonesia',
    heading: 'Kos Management Software in Indonesia',
    description:
      'Kos management software for Indonesia: run a boarding house room by room, one monthly bill in rupiah for rent and electricity, WhatsApp receipts, every kos in one view.',
    excerpt:
      'A practical guide to kos management software for Indonesia: what it does, why a generic rental tool does not fit a kos-kosan, the features that matter, from rupiah billing to WhatsApp receipts, and how to choose.',
    category: 'Hostel management',
    primaryKeyword: 'kos management software Indonesia',
    datePublished: '2026-11-06',
    dateModified: '2026-11-06',
    readingMinutes: 8,
    image: {
      src: '/screenshots/id-dashboard.png',
      width: 3024,
      height: 1650,
      alt: 'An Indonesian kos dashboard showing occupancy, rent collected in rupiah, outstanding dues and profit for the month',
      label: 'Dashboard · rent in rupiah, occupancy & profit',
    },
  },
  {
    slug: 'hostel-management-software-nepal',
    title: 'Hostel Management Software in Nepal',
    heading: 'Hostel Management Software in Nepal',
    description:
      'Hostel management software for Nepal: run beds and students, one bill per resident in rupees for rent and meals, mess costs tracked, with every hostel in one view.',
    excerpt:
      'A practical guide to hostel management software for Nepal: what it does, why a generic rental tool does not fit a bed-and-mess hostel, the features that matter, and how to choose.',
    category: 'Hostel management',
    primaryKeyword: 'hostel management software Nepal',
    datePublished: '2026-11-06',
    dateModified: '2026-11-06',
    readingMinutes: 8,
    image: {
      src: '/screenshots/np-dashboard.png',
      width: 3024,
      height: 1650,
      alt: 'A Nepali hostel dashboard showing occupancy, rent collected in rupees, outstanding dues and profit for the month',
      label: 'Dashboard · rent in rupees, occupancy & profit',
    },
  },
  {
    slug: 'hostel-management-software-ghana',
    title: 'Hostel Management Software in Ghana',
    heading: 'Hostel Management Software in Ghana: A Practical Guide',
    description:
      'Hostel management software for Ghana: run beds, students and rent in cedis, with instant receipts, mobile-money payments recorded, and every hostel in one view.',
    excerpt:
      'A practical guide to hostel management software for Ghana: what it does, why a generic rental tool does not fit, the features that matter for a Ghanaian student hostel, and how to choose one that fills rooms and keeps the money straight.',
    category: 'Hostel management',
    primaryKeyword: 'hostel management software Ghana',
    datePublished: '2026-11-06',
    dateModified: '2026-11-06',
    readingMinutes: 8,
    image: {
      src: '/screenshots/gh-dashboard.png',
      width: 3024,
      height: 1650,
      alt: 'A Ghanaian hostel dashboard showing occupancy, rent collected in cedis, outstanding dues and profit for the month',
      label: 'Dashboard · rent in cedis, occupancy & profit',
    },
  },
  {
    slug: 'rooming-house-management-software-australia',
    title: 'Rooming House Management Software in Australia',
    heading: 'Rooming House Management Software in Australia',
    description:
      'Rooming house software for Australia: run houses room by room, one bill per resident in Australian dollars, bonds, maintenance and every house in one view.',
    excerpt:
      'A practical guide to rooming house management software for Australia: what it does, why a standard rental tool does not fit room-by-room letting, the features that matter, and how to choose.',
    category: 'Shared housing',
    primaryKeyword: 'rooming house management software Australia',
    datePublished: '2026-11-06',
    dateModified: '2026-11-06',
    readingMinutes: 8,
    image: {
      src: '/screenshots/us-dashboard.png',
      width: 3024,
      height: 1700,
      alt: 'A rooming house dashboard showing occupancy, rent collected in dollars, outstanding dues and profit for the month',
      label: 'Dashboard · rent in dollars, occupancy & profit',
    },
  },
  {
    slug: 'student-accommodation-management-software-south-africa',
    title: 'Student Accommodation Management Software in South Africa',
    heading: 'Student Accommodation Management Software in South Africa',
    description:
      'Student accommodation software for South Africa: run rooms and beds, one bill per resident in rand, NSFAS and other payments recorded, deposits and every residence in one view.',
    excerpt:
      'A practical guide to student accommodation management software for South Africa: what it does, why a generic rental tool does not fit private residences, the features that matter (including how NSFAS payments are handled), and how to choose.',
    category: 'Student accommodation',
    primaryKeyword: 'student accommodation management software South Africa',
    datePublished: '2026-11-06',
    dateModified: '2026-11-06',
    readingMinutes: 9,
    image: {
      src: '/screenshots/za-dashboard.png',
      width: 3024,
      height: 1650,
      alt: 'A South African student accommodation dashboard showing occupancy, rent collected in rand, outstanding dues and profit for the month',
      label: 'Dashboard · rent in rand, occupancy & profit',
    },
  },
  {
    slug: 'student-accommodation-management-software-ireland',
    title: 'Student Accommodation Management Software in Ireland',
    heading: 'Student Accommodation Management Software in Ireland',
    description:
      'Student accommodation software for Ireland: run rooms and beds, one bill per resident in euro, deposits and arrears, your own page to fill rooms, with no per-bed fees.',
    excerpt:
      'A practical guide to student accommodation management software for Ireland: what it does, why a generic rental tool does not fit digs and shared houses, the features that matter for smaller operators, and how to choose.',
    category: 'Student accommodation',
    primaryKeyword: 'student accommodation management software Ireland',
    datePublished: '2026-11-06',
    dateModified: '2026-11-06',
    readingMinutes: 9,
    image: {
      src: '/screenshots/ie-dashboard.png',
      width: 3024,
      height: 1650,
      alt: 'An Irish student accommodation dashboard showing occupancy, rent collected in euro, outstanding dues and profit for the month',
      label: 'Dashboard · rent in euro, occupancy & profit',
    },
  },
  {
    slug: 'student-housing-management-software-canada',
    title: 'Student Housing Management Software in Canada',
    heading: 'Student Housing Management Software in Canada',
    description:
      'Student housing software for Canada: run off-campus rooms and beds, one bill per resident in Canadian dollars, deposits and arrears, your own page to fill rooms, every property in one view.',
    excerpt:
      'A practical guide to student housing management software for Canada: what it does, why a regular rental tool does not fit off-campus student houses, the features that matter, and how to choose.',
    category: 'Student accommodation',
    primaryKeyword: 'student housing management software Canada',
    datePublished: '2026-11-06',
    dateModified: '2026-11-06',
    readingMinutes: 8,
    image: {
      src: '/screenshots/us-dashboard.png',
      width: 3024,
      height: 1700,
      alt: 'A student housing dashboard showing occupancy, rent collected in dollars, outstanding dues and profit for the month',
      label: 'Dashboard · rent in dollars, occupancy & profit',
    },
  },
  {
    slug: 'hostel-management-software-nigeria',
    title: 'Hostel Management Software in Nigeria',
    heading: 'Hostel Management Software in Nigeria: A Practical Guide',
    description:
      'Hostel management software for Nigeria: run beds, students and rent in naira, with instant receipts, your own page to fill rooms, and every hostel in one view.',
    excerpt:
      'A practical guide to hostel management software for Nigeria: what it does, why a generic rental tool does not fit, the features that matter for a Nigerian student hostel, and how to choose one that fills rooms and keeps the money straight.',
    category: 'Hostel management',
    primaryKeyword: 'hostel management software Nigeria',
    datePublished: '2026-11-06',
    dateModified: '2026-11-06',
    readingMinutes: 8,
    image: {
      src: '/screenshots/ng-dashboard.png',
      width: 3024,
      height: 1650,
      alt: 'A Nigerian hostel dashboard showing occupancy, rent collected in naira, outstanding dues and profit for the month',
      label: 'Dashboard · rent in naira, occupancy & profit',
    },
  },
  {
    slug: 'hostel-management-software-kenya',
    title: 'Hostel Management Software in Kenya',
    heading: 'Hostel Management Software in Kenya: A Practical Guide',
    description:
      'Hostel management software for Kenya: run beds, students and rent in shillings, with instant receipts, mobile-money payments recorded, and every hostel in one view.',
    excerpt:
      'A practical guide to hostel management software for Kenya: what it does, why a generic rental tool does not fit, the features that matter for a Kenyan student hostel or bedsitter, and how to choose one that keeps the money straight.',
    category: 'Hostel management',
    primaryKeyword: 'hostel management software Kenya',
    datePublished: '2026-11-06',
    dateModified: '2026-11-06',
    readingMinutes: 8,
    image: {
      src: '/screenshots/ke-dashboard.png',
      width: 3024,
      height: 1650,
      alt: 'A Kenyan hostel dashboard showing occupancy, rent collected in shillings, outstanding dues and profit for the month',
      label: 'Dashboard · rent in shillings, occupancy & profit',
    },
  },
  {
    slug: 'hostel-management-software-pakistan',
    title: 'Hostel Management Software in Pakistan',
    heading: 'Hostel Management Software in Pakistan: A Practical Guide',
    description:
      'Hostel management software for Pakistan: run beds, residents, rent, mess and AC billing in rupees, with WhatsApp reminders and guest registration, across every hostel.',
    excerpt:
      'A practical guide to hostel management software for Pakistan: what it does, why a school ERP or hotel tool does not fit, the features that matter for a Pakistani hostel, from rupee billing to WhatsApp reminders and guest registration, and how to choose.',
    category: 'Hostel management',
    primaryKeyword: 'hostel management software Pakistan',
    datePublished: '2026-11-06',
    dateModified: '2026-11-06',
    readingMinutes: 9,
    image: {
      src: '/screenshots/pk-dashboard.png',
      width: 3024,
      height: 1650,
      alt: 'A Pakistan hostel dashboard showing net profit, rent collected, outstanding dues, AC units, kitchen costs and staff salaries in rupees',
      label: 'Dashboard · occupancy, rent, mess & AC, in rupees',
    },
  },
  {
    slug: 'rentok-alternative',
    title: 'RentOk Alternative: PulseHub vs RentOk',
    heading: 'RentOk Alternative: How PulseHub Compares for PG and Hostel Operators',
    description:
      'Looking for a RentOk alternative for your PG or hostel? An honest PulseHub vs RentOk comparison: payments, bed-level billing, food and electricity, markets and pricing.',
    excerpt:
      'An honest look at RentOk and how PulseHub compares as an alternative for PG and hostel operators: markets, the mobile-app vs web split, payments and KYC, food and metered electricity billing, and who each one suits.',
    category: 'Comparisons',
    primaryKeyword: 'RentOk alternative',
    datePublished: '2026-11-05',
    dateModified: '2026-11-05',
    readingMinutes: 8,
    image: {
      src: '/screenshots/in-payments.png',
      width: 3024,
      height: 1650,
      alt: 'A PG payments screen in rupees showing each resident’s rent and a metered share of electricity, with paid, pending and overdue status',
      label: 'One bill per resident · rent + metered electricity',
    },
  },
  {
    slug: 'how-to-choose-student-accommodation-management-software',
    title: 'How to Choose Student Accommodation Management Software',
    heading: 'How to Choose Student Accommodation Management Software: A Buyer’s Guide',
    description:
      'How to choose student accommodation management software: match it to your rent cycles, insist on room and bed-level occupancy, check UK compliance, and weigh pricing.',
    excerpt:
      'A practical buyer’s guide to choosing student accommodation management software: start from how you operate, the features that actually matter, the questions to ask on a demo, and how to match the tool to your size.',
    category: 'Student accommodation',
    primaryKeyword: 'how to choose student accommodation management software',
    datePublished: '2026-11-05',
    dateModified: '2026-11-05',
    readingMinutes: 10,
    image: {
      src: '/screenshots/dashboard.png',
      width: 3020,
      height: 1612,
      alt: 'A student accommodation dashboard showing occupancy, rent collected, outstanding dues and profit for the month',
      label: 'Dashboard · occupancy, rent & profit',
    },
  },
  {
    slug: 'how-to-start-a-co-living-business',
    title: 'How to Start a Co-Living Business',
    heading: 'How to Start a Co-Living Business: An Operator’s Guide',
    description:
      'How to start a co-living business: lease vs own, the occupancy and margins that decide it, how to fill rooms, and the day-to-day operations most guides skip.',
    excerpt:
      'A practical, operations-first guide to starting a co-living business: the two models (lease vs own), the numbers that actually decide profit, how to fill rooms, and the day-to-day running most guides gloss over.',
    category: 'Co-living',
    primaryKeyword: 'how to start a co-living business',
    datePublished: '2026-11-04',
    dateModified: '2026-11-04',
    readingMinutes: 11,
    image: {
      src: '/screenshots/dashboard.png',
      width: 3020,
      height: 1612,
      alt: 'A co-living dashboard showing occupancy, rent collected, outstanding dues and profit for the month',
      label: 'Dashboard · occupancy, rent & profit',
    },
  },
  {
    slug: 'worker-accommodation-management-software',
    title: 'Worker & Staff Accommodation Management Software',
    heading: 'Worker and Staff Accommodation Management Software',
    description:
      'Worker and staff accommodation software: run camps, hostels and worker housing by the bed, with rent, utilities, deposits and occupancy across every site.',
    excerpt:
      'A practical guide to worker and staff accommodation management software: what it does, why generic hotel or rental tools miss, the features that matter for bed-level housing, and how to choose one.',
    category: 'Staff accommodation',
    primaryKeyword: 'worker accommodation management software',
    datePublished: '2026-11-04',
    dateModified: '2026-11-04',
    readingMinutes: 10,
    image: {
      src: '/screenshots/all-properties.png',
      width: 3024,
      height: 1722,
      alt: 'A worker accommodation portfolio dashboard comparing occupancy, costs and net profit across several sites',
      label: 'Every site · occupancy, costs & profit',
    },
  },
  {
    slug: 'what-is-a-property-management-system',
    title: 'What Is a Property Management System (PMS)?',
    heading: 'What Is a Property Management System (PMS)?',
    description:
      'A property management system (PMS) is software that runs a property’s daily operations. What a PMS does, the three main kinds, and how to choose one.',
    excerpt:
      'A plain-English guide to property management systems: what a PMS is, what it does, the three kinds you will come across (hotel, real-estate and room-level), and how to pick one for your operation.',
    category: 'Property management',
    primaryKeyword: 'what is a property management system',
    datePublished: '2026-11-02',
    dateModified: '2026-11-07',
    readingMinutes: 11,
    image: {
      src: '/screenshots/dashboard.png',
      width: 3020,
      height: 1612,
      alt: 'A property management system dashboard showing occupancy, rent collected, outstanding dues and profit for the month',
      label: 'Dashboard · occupancy, rent & profit',
    },
  },
  {
    slug: 'bills-included-hmo-fair-usage',
    title: 'Bills-Included HMO: Set a Fair-Usage Cap',
    heading: 'Bills-Included HMO: How to Set a Fair-Usage Cap and Bill the Excess',
    description:
      'Run a bills-included HMO fairly: set a fair-usage cap, measure it, bill the excess at cost (not profit, per Ofgem), and handle a tenant who leaves mid-period.',
    excerpt:
      'A practical guide for UK HMO landlords on fair-usage caps: how to set the allowance, measure usage, bill the excess at cost within Ofgem rules, write the clause, and handle mid-period leavers.',
    category: 'HMO management',
    primaryKeyword: 'bills included HMO fair usage',
    datePublished: '2026-10-30',
    dateModified: '2026-10-30',
    readingMinutes: 12,
    image: {
      src: '/screenshots/payments.png',
      width: 3024,
      height: 1570,
      alt: 'PulseHub payments screen showing HMO rent and metered utility charges per resident with paid and overdue balances in pounds',
      label: 'Payments · rent, utilities & balances',
    },
  },
  {
    slug: 'how-to-run-a-boarding-house',
    title: 'How to Run a Boarding House in the Philippines',
    heading: 'How to Run a Boarding House in the Philippines: An Operator’s Guide',
    description:
      'How to run a boarding house in the Philippines: set room-and-board rates, fill rooms, collect rent, feed boarders profitably, keep the peace and scale.',
    excerpt:
      'A practical, step-by-step guide to running a boarding house in the Philippines: pricing room and board, filling rooms, collecting rent, feeding boarders profitably, and growing to a second house.',
    category: 'Boarding houses',
    primaryKeyword: 'how to run a boarding house',
    datePublished: '2026-10-28',
    dateModified: '2026-10-28',
    readingMinutes: 10,
    image: {
      src: '/screenshots/ph-residents.png',
      width: 3024,
      height: 1714,
      alt: 'PulseHub Residents screen for a Philippine boarding house showing active boarders, the waiting list, deposits, notices and check-out',
      label: 'Boarders · waiting list, deposits & check-out',
    },
  },
  {
    slug: 'boarding-house-management-software',
    title: 'Boarding House Management Software (Philippines)',
    heading: 'Boarding House Management Software: A Guide for Philippine Operators',
    description:
      'What boarding house management software does for Philippine operators: rooms, beds, rent billed with board and electricity, deposits and several houses.',
    excerpt:
      'A practical guide to boarding house management software for Philippine operators: what it does, why board and meals change the billing, and how to choose a tool for rooms, rent and several houses.',
    category: 'Boarding houses',
    primaryKeyword: 'boarding house management software',
    datePublished: '2026-10-27',
    dateModified: '2026-10-27',
    readingMinutes: 8,
    image: {
      src: '/screenshots/ph-dashboard.png',
      width: 3024,
      height: 1600,
      alt: 'PulseHub boarding house dashboard in pesos showing net profit, rent collected, outstanding dues, electricity and kitchen costs',
      label: 'Dashboard · profit, rent & kitchen costs in ₱',
    },
  },
  {
    slug: 'dormitory-bedspace-management-software',
    title: 'Dormitory & Bedspace Management: Operator Guide',
    heading: 'A Philippine Operator’s Guide to Dormitory and Bedspace Management Software',
    description:
      'What dormitory and bedspace management software does for Philippine operators: beds, residents, rent with meals and electricity, deposits and branches.',
    excerpt:
      'A practical guide for Philippine dormitory and bedspace operators: what the software does, why letting by the bed is different, and how to choose a tool for rent, meals, deposits and several branches in pesos.',
    category: 'Dormitory & bedspace',
    primaryKeyword: 'dormitory and bedspace management software',
    datePublished: '2026-10-26',
    dateModified: '2026-10-26',
    readingMinutes: 8,
    image: {
      src: '/screenshots/ph-branches.png',
      width: 3024,
      height: 1726,
      alt: 'PulseHub All Branches view comparing occupancy, collections, pending dues, deposits, costs and net profit across dormitory branches in Makati, Quezon City and Cebu',
      label: 'All branches · Makati, Quezon City & Cebu',
    },
  },
  {
    slug: 'co-living-management-software-guide',
    title: 'Co-Living Management Software Guide',
    heading: 'Co-Living Management Software: Features and How to Choose',
    description:
      'What co-living management software does for operators: rooms, residents, all-inclusive billing, occupancy and multiple buildings, and how to choose one.',
    excerpt:
      'A practical guide to co-living management software: what it does, why the operations side is different from a community app, and how to choose a tool for rooms, all-inclusive rent and multiple buildings.',
    category: 'Co-living',
    primaryKeyword: 'co-living management software',
    datePublished: '2026-10-24',
    dateModified: '2026-10-24',
    readingMinutes: 8,
    image: {
      src: '/screenshots/all-properties.png',
      width: 3024,
      height: 1722,
      alt: 'PulseHub co-living view comparing occupancy, revenue, costs and net profit across buildings',
      label: 'All properties · occupancy, revenue & profit',
    },
  },
  {
    slug: 'pg-management-software',
    title: 'PG Management Software in India: Features',
    heading: 'PG Management Software in India: Features and How to Choose',
    description:
      'What PG management software does for paying guest accommodation in India: beds, residents, rent, meals, electricity and payments, and how to choose one.',
    excerpt:
      'A practical guide to PG management software for Indian paying guest operators: what it does, how it bills rent with meals and electricity, records UPI, bank-transfer and cash payments, and how to choose one.',
    category: 'PG management',
    primaryKeyword: 'PG management software',
    datePublished: '2026-10-23',
    dateModified: '2026-10-23',
    readingMinutes: 7,
    image: {
      src: '/screenshots/in-dashboard.png',
      width: 3024,
      height: 1650,
      alt: 'PulseHub PG dashboard in rupees showing net profit, rent collected, outstanding dues, electricity and kitchen costs',
      label: 'Dashboard · rent, dues & costs in ₹',
    },
  },
  {
    slug: 'hostel-management-software',
    title: 'Hostel Management Software: Features & Guide',
    heading: 'Hostel Management Software: Features and How to Choose',
    description:
      'What hostel management software does for long-stay residential hostels: managing beds, residents, rent, meals and occupancy, and how to choose one.',
    excerpt:
      'A practical guide to hostel management software for long-stay and residential hostels: what it does, how it differs from hostel booking systems and spreadsheets, and how to choose one.',
    category: 'Hostel management',
    primaryKeyword: 'hostel management software',
    datePublished: '2026-10-22',
    dateModified: '2026-10-22',
    readingMinutes: 9,
    image: {
      src: '/screenshots/residents.png',
      width: 3024,
      height: 1582,
      alt: 'PulseHub hostel residents screen showing bed allocation, deposits, a waiting list and check-outs',
      label: 'Residents · beds, deposits & check-outs',
    },
  },
  {
    slug: 'accommodation-management-system',
    title: 'Accommodation Management System: Buyer’s Guide',
    heading: 'Accommodation Management System: Features, Benefits and How to Choose',
    description:
      'What an accommodation management system is, the features that matter for HMO, student, hostel and co-living operators, and how to choose the right one.',
    excerpt:
      'A practical guide to accommodation management systems for operators who let by the room: what the software does, the features that matter, how it differs from a hotel PMS and spreadsheets, and how to choose one.',
    category: 'Accommodation management',
    primaryKeyword: 'accommodation management system',
    datePublished: '2026-10-21',
    dateModified: '2026-10-21',
    readingMinutes: 12,
    image: {
      src: '/screenshots/dashboard.png',
      width: 3020,
      height: 1612,
      alt: 'PulseHub accommodation management dashboard showing occupancy, rent collected, outstanding balances and performance across properties',
      label: 'Dashboard · occupancy, rent & performance',
    },
  },
  {
    slug: 'hmo-compliance',
    title: 'HMO Compliance in England: Landlord Checklist',
    heading: 'HMO Compliance in England: The Complete Landlord Compliance Checklist',
    description:
      'Understand HMO compliance in England, the records landlords need to track, local authority requirements and how software can simplify compliance management.',
    excerpt:
      'A practical, England-focused guide to HMO compliance: whether you need a licence, the records and certificates to track, local authority requirements, and how to stay organised.',
    category: 'HMO management',
    primaryKeyword: 'HMO compliance England',
    datePublished: '2026-09-30',
    dateModified: '2026-09-30',
    readingMinutes: 13,
    image: {
      src: '/screenshots/complaints.png',
      width: 3018,
      height: 1716,
      alt: 'PulseHub maintenance and complaints screen showing reported issues, their status and resolution history',
      label: 'Maintenance & issues · status and history',
    },
  },
  {
    slug: 'hmo-tenant-management',
    title: 'HMO Tenant Management: Move-In to Move-Out',
    heading: 'HMO Tenant Management: From Move-In to Move-Out',
    description:
      'How to manage an HMO tenant from move-in to move-out: what to record at each stage, how to handle room changes and deposits, and how to close the record cleanly.',
    excerpt:
      'The HMO tenant lifecycle stage by stage: what to record at move-in, how to run an active tenancy and its changes, and how to handle move-out and final settlement.',
    category: 'HMO management',
    primaryKeyword: 'HMO tenant management',
    datePublished: '2026-09-28',
    dateModified: '2026-09-28',
    readingMinutes: 10,
    image: {
      src: '/screenshots/residents.png',
      width: 3024,
      height: 1582,
      alt: 'PulseHub Residents screen showing active tenants, deposits, notice periods and check-outs across an HMO',
      label: 'Residents · deposits, notice & check-out',
    },
  },
  {
    slug: 'hmo-rent-tracking',
    title: 'HMO Rent Tracking: Payments and Arrears',
    heading: 'How to Track HMO Rent, Payments and Arrears in the UK',
    description:
      'How to track HMO rent, payments and arrears across multiple properties and rooms: what to record, a simple system that scales, and how to keep balances accurate.',
    excerpt:
      'Why rent tracking gets hard across multiple HMOs, exactly what to record per room and tenant, a step-by-step system, and how to stay on top of arrears.',
    category: 'HMO management',
    primaryKeyword: 'HMO rent tracking',
    datePublished: '2026-09-25',
    dateModified: '2026-09-25',
    readingMinutes: 10,
    image: {
      src: '/screenshots/payments.png',
      width: 3024,
      height: 1570,
      alt: 'PulseHub payments screen showing HMO rent due, part-payments, deposits and overdue balances per room and tenant',
      label: 'Payments · rent, part-payments & arrears',
    },
  },
  {
    slug: 'student-accommodation-management',
    title: 'Student Accommodation Management: UK Guide',
    heading: 'Student Accommodation Management: A Complete Guide for UK Operators',
    description:
      'A practical guide to student accommodation management for UK operators: rooms, residents, rent, occupancy and the software that keeps it all in one place.',
    excerpt:
      'How UK student accommodation is run day to day, what operators need to track across rooms and residents, and how to manage it without spreadsheet sprawl.',
    category: 'Student accommodation',
    primaryKeyword: 'student accommodation management',
    datePublished: '2026-09-23',
    dateModified: '2026-09-23',
    readingMinutes: 10,
    image: {
      src: '/screenshots/residents.png',
      width: 3024,
      height: 1582,
      alt: 'PulseHub resident management screen showing student applications, deposits, notices and check-outs across the letting cycle',
      label: 'Residents · applications & check-outs',
    },
  },
  {
    slug: 'manage-multiple-hmo-properties-without-spreadsheets',
    title: 'Manage Multiple HMOs Without Spreadsheets',
    heading: 'How to Manage Multiple HMO Properties Without Spreadsheets',
    description:
      'Run several HMOs without spreadsheets: what to track per room and tenant, a weekly rhythm to stay on top, and how to move off Excel without losing data.',
    excerpt:
      'Why spreadsheets break once you run more than one HMO, what to track across a portfolio, a repeatable weekly system, and how to move off Excel without losing data.',
    category: 'HMO management',
    primaryKeyword: 'manage multiple HMO properties',
    datePublished: '2026-09-20',
    dateModified: '2026-09-20',
    readingMinutes: 8,
    image: {
      src: '/screenshots/all-properties.png',
      width: 3024,
      height: 1722,
      alt: 'PulseHub All Properties view comparing occupancy, revenue, costs and net profit across an HMO portfolio',
      label: 'All properties · portfolio',
    },
  },
  {
    slug: 'hmo-management-software',
    title: 'HMO Management Software for UK Landlords',
    heading: 'HMO Management Software: How to Manage Multiple Properties, Tenants and Rent',
    description:
      'A practical guide to HMO management software for UK landlords: how it handles rooms, tenants, rent, occupancy and multiple properties, and what to look for.',
    excerpt:
      'What HMO management software actually does, how it helps you run rooms, tenants, rent and occupancy across several properties, and how to choose the right system.',
    category: 'HMO management',
    primaryKeyword: 'HMO management software',
    datePublished: '2026-09-16',
    dateModified: '2026-09-17',
    readingMinutes: 9,
    image: {
      src: '/screenshots/all-properties.png',
      width: 3024,
      height: 1722,
      alt: 'PulseHub multi-property dashboard showing occupancy, revenue, costs and net profit across an HMO portfolio',
      label: 'All properties · portfolio',
    },
  },
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function postPath(slug: string) {
  return `${BLOG_BASE}/${slug}`
}

/** Newest first. */
export function sortedBlogPosts() {
  return [...blogPosts].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))
}

export function formatBlogDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
