import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'BackgroundText - Text Behind Image Editor',
    template: '%s | BackgroundText'
  },
  description: 'Create stunning visuals by adding text behind your images. BackgroundText offers advanced text styling, positioning, and effects for perfect image compositions.',
  keywords: ['text behind image', 'image text editor', 'background text', 'image editing', 'text effects'],
  authors: [{ name: 'BackgroundText' }],
  icons: {
    icon: '/bgicon.png',
    shortcut: '/bgicon.png',
    apple: '/bgicon.png',
  },
  openGraph: {
    title: 'BackgroundText - Text Behind Image Editor',
    description: 'Create stunning visuals by adding text behind your images. Advanced text styling and effects for perfect compositions.',
    url: 'https://backgroundtext.com',
    siteName: 'BackgroundText',
    images: [
      {
        url: '/BGBanner.webp',
        width: 1200,
        height: 630,
        alt: 'BackgroundText - Text Behind Image Editor'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BackgroundText - Text Behind Image Editor',
    description: 'Create stunning visuals by adding text behind your images. Advanced text styling and effects for perfect compositions.',
    images: ['/BGBanner.webp'],
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>{children}</body>
    </html>
  )
}
