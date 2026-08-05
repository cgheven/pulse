import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const SITE_URL = 'https://www.yourpulse.io'
const SITE_TITLE = 'Pulse HMS — Hostel Management System'
const SITE_DESCRIPTION =
  'Pulse HMS is a hostel management system built for Pakistani hostel owners: rent and AC bill tracking, WhatsApp payment reminders, a branded mini website, and a multi-branch dashboard, live in 24 hours.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | Pulse HMS',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'hostel management system',
    'hostel management software Pakistan',
    'rent collection software',
    'WhatsApp rent reminders',
    'hostel billing software',
    'multi-branch hostel management',
    'PulseHub',
    'Pulse HMS',
  ],
  authors: [{ name: 'PulseHub' }],
  generator: 'v0.app',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Pulse HMS',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-icon.png' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFC107' },
    { media: '(prefers-color-scheme: dark)', color: '#FFC107' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
