import AnnouncementBar from '@/components/announcement-bar'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { getLtdSpots } from '@/lib/ltd-spots'

export default async function SiteShell({ children }: { children: React.ReactNode }) {
  const spots = await getLtdSpots()
  return (
    <>
      <AnnouncementBar remaining={spots.remaining} total={spots.total} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Header />
      {/* padding-top: var(--promo-h) drops the content by the announcement-bar height so
          the bar never overlaps the first section; it is 0 when the bar is dismissed. */}
      <main
        id="main"
        className="min-h-screen w-full max-w-full overflow-x-clip"
        style={{ paddingTop: 'var(--promo-h)' }}
      >
        {children}
      </main>
      <Footer />
    </>
  )
}
