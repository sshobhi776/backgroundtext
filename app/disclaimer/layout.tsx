import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for BackgroundText - Important information about using our text behind image editor service.',
  openGraph: {
    title: 'Disclaimer - BackgroundText',
    description: 'Important information about using BackgroundText service.',
  }
}

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
