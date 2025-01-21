import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for BackgroundText - Learn how we protect your data and maintain your privacy while using our text behind image editor.',
  openGraph: {
    title: 'Privacy Policy - BackgroundText',
    description: 'Learn how we protect your data and maintain your privacy while using BackgroundText.',
  }
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
