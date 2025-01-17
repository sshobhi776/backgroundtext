import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text Behind Image Editor',
  description: 'Create stunning visuals by adding text behind your images. Use our advanced editor for perfect text positioning and styling.',
  openGraph: {
    title: 'Text Behind Image Editor - BackgroundText',
    description: 'Create stunning visuals with our advanced text behind image editor. Perfect for creating unique designs and compositions.',
  }
}

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
