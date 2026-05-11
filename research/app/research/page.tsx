import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ResearchClient } from './ResearchClient';

export const metadata: Metadata = {
  title: 'Research — APTO.INK',
  description: 'A professional research index for papers, writings, theorems, discoveries, inventions, and news.',
  openGraph: {
    title: 'Research — APTO.INK',
    description: 'A professional research index for papers, writings, theorems, discoveries, inventions, and news.',
    images: ['/assets/svg/og-card.svg']
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function ResearchPage() {
  return (
    <>
      <Nav />
      <ResearchClient />
      <Footer />
    </>
  );
}
