import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Research — APTO.INK',
  robots: {
    index: false,
    follow: true
  }
};

export default function ResearchPage() {
  return (
    <>
      <Nav />
      <main id="research" />
      <Footer />
    </>
  );
}
