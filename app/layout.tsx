import type { Metadata } from 'next';
import '@/styles/next-globals.css';

export const metadata: Metadata = {
  title: 'APTO.INK — Websites for Swiss SMEs',
  description: 'Premium websites for Swiss small and medium-sized businesses.',
  openGraph: {
    title: 'APTO.INK — Websites for Swiss SMEs',
    description: 'Websites that make small businesses look established, credible and ready to buy from.',
    images: ['/assets/svg/og-card.svg']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
