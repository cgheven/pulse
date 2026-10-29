import { CookieSettingsButton } from '@/components/cookie-settings-button'
import SiteShell from '@/components/site-shell'
import { pageMetadata } from '@/lib/seo'
import { routes } from '@/lib/navigation'

export const metadata = pageMetadata({
  title: 'Cookie Policy',
  description: 'How PulseHub uses cookies on the marketing website.',
  path: routes.cookies,
})

export default function CookiePolicyPage() {
  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-medium tracking-tight">Cookie Policy</h1>
        <p className="mt-6 text-muted-foreground">
          This page describes cookies used on the PulseHub marketing website at yourpulse.io. It is not a certification or a legal advice document.
        </p>
        <h2 className="mt-10 text-2xl font-semibold">Cookies we use</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/70">
          <li>Google Analytics 4 (measurement ID G-KTBY62T8PL), via Google Tag Manager, to understand how visitors use the marketing site. Events do not include names, email addresses, phone numbers, form contents or other personal information.</li>
          <li>Meta Pixel, to measure marketing performance and reach relevant audiences on Meta platforms.</li>
          <li>Vercel Analytics, to measure site performance in production. This is cookieless.</li>
        </ul>
        <h2 className="mt-10 text-2xl font-semibold">Consent</h2>
        <p className="mt-4 text-foreground/70">
          On your first visit, a banner asks whether to allow non-essential cookies. Google Analytics (through Google Tag Manager) and the Meta Pixel load only if you choose Accept; if you choose Reject, they are not loaded. Your choice is stored in your browser so the banner does not reappear, and you can change it at any time:
        </p>
        <p className="mt-4">
          <CookieSettingsButton />
        </p>
        <p className="mt-4 text-foreground/70">
          Cookieless Vercel Analytics measures performance and is not gated by this banner. Browser controls can also be used to block or delete cookies. This page describes current behaviour; it is not a GDPR compliance statement.
        </p>
        <h2 className="mt-10 text-2xl font-semibold">Get in touch</h2>
        <p className="mt-4 text-foreground/70">
          For questions about cookies on this website, use the{' '}
          <a href={routes.contact} className="text-primary hover:underline">
            contact page
          </a>
          .
        </p>
      </article>
    </SiteShell>
  )
}
