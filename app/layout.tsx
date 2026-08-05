import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pulse HMS',
  description: 'Pulse of Your Business. Advanced hostel management system designed to streamline operations, increase efficiency, and boost your bottom line with real-time monitoring and intelligent automation.',
  keywords: ['hostel management', 'property management', 'booking system', 'guest management', 'PulseHub'],
  generator: 'v0.app',
  openGraph: {
    title: 'Pulse HMS',
    description: 'The heartbeat of your hostel business. Manage bookings, guests, and operations effortlessly.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/logo.png',
      },
    ],
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
