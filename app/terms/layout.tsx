import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and Conditions for BackgroundText - Understanding your rights and responsibilities while using our text behind image editor.',
  openGraph: {
    title: 'Terms and Conditions - BackgroundText',
    description: 'Understanding your rights and responsibilities while using BackgroundText.',
  }
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
