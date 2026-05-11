import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Meridian Review — Research Editorial Platform',
  description:
    'A restrained, serious research website template for static publication on GitHub Pages.',
  icons: {
    icon: '/mark.svg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
