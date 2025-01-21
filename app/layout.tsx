import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'BackgroundText - Text Behind Image Editor',
    template: '%s | BackgroundText'
  },
  description: 'Create beautiful text overlays on images with AI background removal',
  openGraph: {
    title: 'Background Text Generator',
    description: 'Create beautiful text overlays on images with AI background removal',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Background Text Generator',
    description: 'Create beautiful text overlays on images with AI background removal'
  }
};

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
