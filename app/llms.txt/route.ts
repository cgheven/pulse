import { postPath, sortedBlogPosts } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { SIGN_UP_URL, SITE_NAME, SITE_URL } from '@/lib/site'

// Serves /llms.txt: a curated, machine-readable overview of the site for LLMs
// and AI crawlers, following the llmstxt.org convention. No request-time data is
// read, so force-static makes this a prerendered asset built once, like sitemap.xml.
export const dynamic = 'force-static'

// Absolute URLs keep the file portable when fetched or copied elsewhere. The home
// page keeps its trailing slash to match the canonical URL in lib/seo.ts.
const abs = (path: string) => (path === routes.home ? `${SITE_URL}/` : `${SITE_URL}${path}`)
const link = (label: string, path: string, description: string) =>
  `- [${label}](${abs(path)}): ${description}`
// For links that point outside the marketing site (e.g. the app sign-up page).
const externalLink = (label: string, url: string, description: string) =>
  `- [${label}](${url}): ${description}`

// Curated descriptions for the fixed pages. The blog section below is generated
// from the post registry so new articles appear automatically.
const primaryPages = [
  link('Platform', routes.features, 'The full product: rooms, residents, rent, payments, occupancy, maintenance, utilities and multi-property management.'),
  link('Pricing', routes.pricing, 'GBP plans with a 14-day free trial and no card required. Annual billing saves two months.'),
  link('Book a demo', routes.bookDemo, 'Request a guided walkthrough of rooms, residents, rent and daily operations.'),
  link('About', routes.about, 'What PulseHub is and the team behind it.'),
  link('Contact', routes.contact, 'Ways to reach the PulseHub team.'),
]

const solutionPages = [
  link('HMO management software', routes.hmo, 'For UK HMO landlords and operators managing rooms, tenants, rent and compliance across properties.'),
  link('Student accommodation software', routes.student, 'For UK student accommodation operators managing rooms, residents, rent and occupancy.'),
  link('Co-living management software', routes.coliving, 'For co-living operators managing members, rooms, rent and shared spaces.'),
]

const marketPages = [
  link('United Kingdom', routes.uk, 'PulseHub for UK accommodation operators, with GBP pricing.'),
  link('Pakistan', routes.pakistan, 'PulseHub for operators in Pakistan, with local pricing.'),
]

const guides = sortedBlogPosts().map((post) =>
  link(post.title, postPath(post.slug), post.description),
)

const optionalPages = [
  link('Blog', routes.blog, 'Guides on HMO, student and co-living management, rent tracking and compliance.'),
  externalLink('Start a free trial', SIGN_UP_URL, 'Create a PulseHub account and start the 14-day free trial.'),
  link('Cookie policy', routes.cookies, 'How the site uses cookies.'),
]

function buildLlmsTxt(): string {
  return `# ${SITE_NAME}

> ${SITE_NAME} is accommodation management software for running rooms, residents, rent, payments, occupancy and multiple properties in one place. It is built for HMO, student accommodation, co-living and hostel operators.

${SITE_NAME} replaces spreadsheets and disconnected tools with a single platform: a public listing page per property, resident records from application to check-out, rent and part-payments with arrears tracking, deposits, maintenance and complaints, utilities, and a portfolio view that compares occupancy, revenue, costs and profit across properties. Pricing is in GBP with a 14-day free trial and no card required.

## Solutions

${solutionPages.join('\n')}

## Product

${primaryPages.join('\n')}

## Markets

${marketPages.join('\n')}

## Guides

${guides.join('\n')}

## Optional

${optionalPages.join('\n')}
`
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
