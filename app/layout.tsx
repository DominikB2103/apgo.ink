import type { Metadata } from 'next';
import './globals.css';
import { studio } from '@/lib/site-data';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${studio.domain}`),
  title: 'APTO.INK — Premium websites for Swiss local businesses',
  description: 'APTO.INK designs premium websites for Swiss small and medium-sized businesses: bakeries, garages, clinics, municipalities, trades, restaurants, and local services.',
  openGraph: {
    title: 'APTO.INK — Premium websites for Swiss local businesses',
    description: 'High-end web design for businesses that need to look trusted, modern, and worth calling.',
    type: 'website',
    url: `https://${studio.domain}`,
    images: ['/brand/og.svg']
  },
  icons: [{ rel: 'icon', url: '/brand/favicon.svg', type: 'image/svg+xml' }]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
