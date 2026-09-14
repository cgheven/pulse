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
        <h1 className="text-4xl font-bold">Cookie Policy</h1>
        <p className="mt-6 text-foreground/70">
          This page describes cookies used on the PulseHub marketing website at yourpulse.io. It is not a certification or a legal advice document.
        </p>
        <h2 className="mt-10 text-2xl font-semibold">Cookies we use</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/70">
          <li>Google Analytics, to understand how visitors use the marketing site.</li>
          <li>Vercel Analytics, to measure site performance in production.</li>
        </ul>
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
