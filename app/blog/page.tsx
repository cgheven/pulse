import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CtaBand } from '@/components/cta-band'
import { ProductScreenshot } from '@/components/feature-showcase'
import SiteShell from '@/components/site-shell'
import { BLOG_BASE, formatBlogDate, postPath, sortedBlogPosts } from '@/lib/blog'
import { routes } from '@/lib/navigation'
import { jsonLdScript, pageMetadata } from '@/lib/seo'
import { SITE_NAME, SITE_URL } from '@/lib/site'

// Hostel management has no dedicated solution page yet, so it links to the
// platform overview (features). The other three link to their solution pages.
const useCaseLinks = [
  { href: routes.hmo, label: 'HMO Management' },
  { href: routes.student, label: 'Student Accommodation' },
  { href: routes.coliving, label: 'Co-Living Management' },
  { href: routes.features, label: 'Hostel Management' },
]

export const metadata = pageMetadata({
  title: 'PulseHub Blog: Accommodation & HMO Management',
  description:
    'Practical guides on managing HMOs, student accommodation, co-living and hostels: rooms, tenants, rent, occupancy and multi-property operations.',
  path: BLOG_BASE,
  absoluteTitle: true,
})

const posts = sortedBlogPosts()
const [featured, ...rest] = posts

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Blog',
      '@id': `${SITE_URL}${BLOG_BASE}#blog`,
      name: `${SITE_NAME} Blog`,
      url: `${SITE_URL}${BLOG_BASE}`,
      publisher: { '@id': `${SITE_URL}/#organization` },
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.heading,
        url: `${SITE_URL}${postPath(post.slug)}`,
        datePublished: post.datePublished,
        dateModified: post.dateModified,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}${BLOG_BASE}` },
      ],
    },
  ],
}

export default function BlogIndexPage() {
  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <section className="px-4 pb-4 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Blog</p>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.06] tracking-tight">
            Guides for accommodation operators
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Practical, no-nonsense guidance for operators who run accommodation by the room: HMOs, student
            accommodation, co-living and shared accommodation. Clear advice on rooms and beds, tenants, rent,
            occupancy and managing more than one property.
          </p>
        </div>
      </section>

      {/* Featured (latest) post as a full-width, two-column card. */}
      {featured ? (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <article className="mx-auto grid max-w-6xl items-center gap-8 rounded-2xl border border-border bg-card p-5 sm:p-7 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:p-9">
            <Link href={postPath(featured.slug)} className="group block">
              <ProductScreenshot
                src={featured.image.src}
                alt={featured.image.alt}
                width={featured.image.width}
                height={featured.image.height}
                priority
                label={featured.image.label}
                sizes="(max-width: 1023px) calc(100vw - 3rem), 40rem"
                className="transition-shadow group-hover:shadow-[0_28px_70px_-28px_rgb(0_0_0/0.30)]"
              />
            </Link>
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Latest · {featured.category} ·{' '}
                <time dateTime={featured.datePublished}>{formatBlogDate(featured.datePublished)}</time> ·{' '}
                {featured.readingMinutes} min read
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-tight tracking-tight">
                <Link href={postPath(featured.slug)} className="hover:text-primary">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{featured.excerpt}</p>
              <Link
                href={postPath(featured.slug)}
                className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-primary"
              >
                Read the guide
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
        </section>
      ) : null}

      {/* Older posts, once there is more than one. */}
      {rest.length > 0 ? (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <article key={post.slug} className="group flex flex-col">
                <Link href={postPath(post.slug)} className="block">
                  <ProductScreenshot
                    src={post.image.src}
                    alt={post.image.alt}
                    width={post.image.width}
                    height={post.image.height}
                    frame={false}
                    sizes="(max-width: 639px) calc(100vw - 2rem), 24rem"
                  />
                </Link>
                <div className="mt-4 flex flex-1 flex-col">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {post.category} · {formatBlogDate(post.datePublished)}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-medium leading-snug tracking-tight">
                    <Link href={postPath(post.slug)} className="hover:text-primary">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* Browse by use case: useful internal links while the blog is small. */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl border-t border-border pt-10">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Browse by use case</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {useCaseLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary/40"
              >
                <span className="font-medium">{item.label}</span>
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Run your HMO portfolio from one platform."
        text="Start a 14-day free trial with no card required, or book a demo to see PulseHub with your properties in mind."
      />
    </SiteShell>
  )
}
