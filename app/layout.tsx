import type { Metadata } from 'next';
import './globals.css';
import { ProgressBar } from '@/components/AnimatedShell';

export const metadata: Metadata = {
  title: 'APTO.INK — Premium websites for Swiss SMEs',
  description: 'APTO.INK builds premium static websites for small and medium-sized Swiss businesses: fast, elegant, affordable and ready for GitHub Pages.',
  metadataBase: new URL('https://apto.ink'),
  openGraph: {
    title: 'APTO.INK — Premium websites for Swiss SMEs',
    description: 'Static, premium, conversion-focused websites for local Swiss businesses.',
    url: 'https://apto.ink',
    siteName: 'APTO.INK',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
